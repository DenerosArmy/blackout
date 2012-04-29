""" scraper.py """


def findTableLines(html):
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
    addresses = []
    for line in lines:
        line = line.split(',')
        addresses.append(line[2][1:-1])
    return addresses


def main():
    lines = findTableLines(open('sample.html'))
    names = parseTableLines(lines)
    print(names)

main()
