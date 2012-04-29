""" monitor.py """

import sys
from time import sleep
from scraper.scraper import *
from sets import Set


def main():
    blacklist = sys.argv[1:]
    checkArgs(blacklist)
    blacklist = Set(blacklist)

    while True:
        addresses = Set(genAddrList('scraper/sample.html'))
        print(addresses)
        union = blacklist.union(addresses
        #print(union)
        if len(union) == len(blacklist):
            print("YOU HAVE LEFT THE HOUSE")
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
            print("Argument is not a valid MAC address")
            quit()

main()
