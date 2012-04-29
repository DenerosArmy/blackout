from django.core.management.base import BaseCommand, CommandError
from main.models import Data

from time import sleep
from scraper import scraper
from sets import Set
from main.dataproc import DataProcessor
from tendril import Tendril
from sms.texting import TextMessage
import requests

def main(phone_number, *blacklist):
    checkArgs(blacklist)
    blacklist = Set(blacklist)

    while True:
        # r = requests.get('http://192.168.1.1/DHCPTable.asp', auth=('admin', 'admin'))
        # print(r)
        # addresses = Set(scraper.genAddrList(r.text))
        with open("scraper/sample.html") as f:
            addresses = Set(scraper.genAddrList(f.read()))

        print(addresses)
        union = blacklist.union(addresses)
        #print(union)
        if len(union) == len(blacklist):
            print("YOU HAVE LEFT THE HOUSE")
            left_the_house(phone_number)
            break
        sleep(1)

def checkArgs(blacklist):
    """Ensure the arguments are valid MAC addresses

    :param list blacklist: A list of MAC addresses
    """
    for i in range(len(blacklist)):
        addr = blacklist[i]
        if len(addr) != 17 or addr[2] != ':' or addr[5] != ':' or \
          addr[8] != ':' or addr[11] != ':' or addr[14] != ':':
            raise CommandError("Argument is not a valid MAC address")

def left_the_house(phone_number):
    d = Data.objects.all()
    assert len(d) == 1
    t = Tendril(oauth_token=d[0].access_token)
    data_processor = DataProcessor(t, phone_number=phone_number)
    tm = TextMessage("vaishaal@berkeley.edu", "warnmedc")
    power = data_processor.power_use()
    if True or power[0] > 0.00005:
        print "Has power usage"
        print "Sending text message"
        tm.sendSMS(phone_number, "You have appliances still on! Turn off? Y/N")
        tm.clearMessages()
        while len(tm.receiveSMS()) < 1:
            pass
        print "SMS detected!"
        answer = tm.receiveSMS()[0][u'text']
        print(answer)
        if answer[0].lower() == 'y':
            print "Attempting to turn off..."
            power = data_processor.turn_off('804f58aaaaaa0358')
            print "Powered off."
            resp = tm.receiveSMS()
        else:
            print "Not powering off"
    else:
        print "Does not have power usage"

class Command(BaseCommand):
    args = 'phone_number mac_address'
    help = 'Monitor'

    def handle(self, *args, **options):
        if len(args) == 0:
            raise CommandError('Expected at least one argument')

        main(args[0], *args[1:])
