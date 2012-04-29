""" scraper.py """

from StringIO import StringIO
import requests

def findTableLinesFromFile(html):
    """Finds the specific lines in the file that contains the table code

    :param file html: The html file to be parsed through
    :rtype: list 
    """
    table_lines = []
    line = ''
    while line != 'var table = new Array();\n':
        line = html.readline()
    line = html.readline()
    line = html.readline()
    line = html.readline()
    #print(line[:-1])
    while line[0:5] == 'table':
        table_lines.append(line[:-1])
        line = html.readline()
    return table_lines

def findTableLinesFromText(html):
    string = StringIO(html)
    return findTableLinesFromFile(string)

def parseTableLines(lines):
    """Parses through the list of lines to generate a list of MAC addresses

    :param list lines: The list of valid lines from the router html file
    :rtype: list
    """
    addresses = {}
    for line in lines:
        line = line.split(',')
        name = line[0].split("'")[-2]
        addresses[line[2][1:-1]] = name
    return addresses

def genAddrList():
    """Generates a list of MAC addresses from an html page of the router's
    device list

    :param file html: The html file to be parsed
    :rtntype: list
    """
    #lines = findTableLinesFromFile(html)
    r = requests.get('http://192.168.1.1/DHCPTable.asp', auth=('admin', 'admin'))    
    lines = findTableLinesFromText(r.text)
    names = parseTableLines(lines)
    return names

def test():
    lines = findTableLinesFromFile(open('sample.html'))
    print(lines)
    names = parseTableLines(lines)
    print(names)

#test()
