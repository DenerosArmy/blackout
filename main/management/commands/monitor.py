from django.core.management.base import BaseCommand, CommandError
from tendril_oauth.models import Data

from time import sleep
from scraper import scraper
from sets import Set
from main.dataproc import DataProcessor
from tendril import Tendril

def main(phone_number, *blacklist):
    checkArgs(blacklist)
    blacklist = Set(blacklist)

    while True:
        addresses = Set(scraper.genAddrList('scraper/sample.html'))
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
    p = DataProcessor(t, phone_number=phone_number)
    power = p.power_use()
    print p.device_id_list
    print p.device_name_list
    print power
    if power[0] > 0:
        print "Has power usage"
        print "Attempting to turn off..."
        power = p.turn_off('804f58aaaaaa0358')
    else:
        print "Does not have power usage"

class Command(BaseCommand):
    args = 'phone_number mac_address'
    help = 'Monitor'

    def handle(self, *args, **options):
        if len(args) == 0:
            raise CommandError('Expected at least one argument')

        main(args[0], *args[1:])