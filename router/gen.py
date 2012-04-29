#!/usr/bin/env python
"""Fake router page generator"""
import sys

def generate_linksys(mac_addresses, input="DHCPTable.gen.html", output="DHCPTable.html"):
    """Generate a HTML page for a Linksys router

    :param list mac_addresses: list of MAC addresses
    :param str input: Input file (template)
    :param str input: Output file
    """
    with open(input) as f:
        text = f.read()
    begin = text.split("// BEGIN USER TABLE")[0]
    end = text.split("// END USER TABLE")[1]

    template = "table[{i}] = new AAA('LocalName', '192.168.1.{i}', '{mac}', '23:42:28','LAN');\n"

    ret = begin
    for i, mac in enumerate(mac_addresses):
        ret += template.format(i=i, mac=mac)
    ret += end

    with open(output, "w") as f:
        f.write(ret)

def main(argv):
    if len(argv) == 1:
        print """usage: python gen.py [list of MAC addresses]
"""
    else:
        generate_linksys(argv[1:])

if __name__ == '__main__':
    main(sys.argv)
