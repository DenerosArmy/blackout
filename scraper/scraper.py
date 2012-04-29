""" scraper.py """


def findTableLines(html):
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

def parseTableLines(lines):
    """Parses through the list of lines to generate a list of MAC addresses

    :param list lines: The list of valid lines from the router html file
    :rtype: list
    """
    addresses = []
    for line in lines:
        line = line.split(',')
        addresses.append(line[2][1:-1])
    return addresses

def genAddrList(html):
    """Generates a list of MAC addresses from an html page of the router's
    device list

    :param file html: The html file to be parsed
    :rtntype: list
    """
    lines = findTableLines(open(html))
    names = parseTableLines(lines)
    return names

def test():
    lines = findTableLines(open('sample.html'))
    names = parseTableLines(lines)
    print(names)

#main()
