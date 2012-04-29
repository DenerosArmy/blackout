from GV import * 
import sys
import bs4


class TextMessage(object):

    def __init__(self, user, password):
        self.sess = voice.Voice()
        self.sess.login(user, password)


    def sendSMS(self, number, message):
        sending = "This is an automatically generated message from Blackout. "
        sending += message 
        self.sess.send_sms(number, sending)

    def extractsms(self, htmlsms) :
        """
        extractsms  --  extract SMS messages from BeautifulSoup tree of Google Voice SMS HTML.

        Output is a list of dictionaries, one per message.
        """
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
                for span in spans :                         # for all spans in row
                    cl = span["class"][0].replace('gc-message-sms-', '')
                    msgitem[cl] = (" ".join(span.findAll(text=True))).strip()   # put text in dict
                msgitems.append(msgitem)                    # add msg dictionary to list
        return msgitems

    def receiveSMS(self):
        self.sess.sms()
        messages = []
        for msg in self.extractsms(self.sess.sms.html):
            messages.append(msg)
        return messages

    def clearMessages(self):
        for message in self.sess.sms().messages:
                message.delete()

def test():
    tm = TextMessage("denerosarmy@gmail.com", "allhailjohndenero")
    tm.sendSMS(5302927074, "Sup breh")
    tm.clearMessages()
    raw_input()
    print(tm.receiveSMS())

#test()
