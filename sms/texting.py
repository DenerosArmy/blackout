from GV import * 
from googlevoice import Voice
import sys
import bs4

def sendSMS(number, message):
    voicei= voice.Voice()
    voicei.login("vaishaal@berkeley.edu", "warnmedc") 
    sending = "This is an automatically generated message from Blackout. "
    sending += message 
    voicei.send_sms(number, sending)



def extractsms(htmlsms) :
    """
    extractsms  --  extract SMS messages from BeautifulSoup tree of Google Voice SMS HTML.

    Output is a list of dictionaries, one per message.
    """
    print(htmlsms)
    msgitems = []                                       # accum message items here
    #   Extract all conversations by searching for a DIV with an ID at top level.
    tree = bs4.BeautifulSoup(htmlsms)           # parse HTML into tree
    conversations = tree.findAll("div",attrs={"id" : True},recursive=False)
    for conversation in conversations :
        #   For each conversation, extract each row, which is one SMS message.
        rows = conversation.findAll(attrs={"class" : "gc-message-sms-row"})
        for row in rows :                               # for all rows
            #   For each row, which is one message, extract all the fields.
            msgitem = {"id" : conversation["id"]}       # tag this message with conversation ID
            spans = row.findAll("span",attrs={"class" : True}, recursive=False)
            print(spans)
            for span in spans :                         # for all spans in row
                cl = span["class"].replace('gc-message-sms-', '')
                msgitem[cl] = (" ".join(span.findAll(text=True))).strip()   # put text in dict
            msgitems.append(msgitem)                    # add msg dictionary to list
    return msgitems

def receiveSMS():
    voicei = voice.Voice()
    voicei.login("vaishaal@berkeley.edu", "warnmedc") 

    voicei.sms()

    for msg in extractsms(voicei.sms.html):
        print str(msg)

def test():
    sendSMS(5302927074, "Sup breh")
    while True:
        receiveSMS()

test()
