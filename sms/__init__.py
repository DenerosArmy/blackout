""" SMS Library """
import requests
import json

def send_sms(number, text):
    """Send text message

    :param str number: Phone number eg 5106426000
    :param str text: Contents of the text message
    :rtype: requests.Response (has truth value of True on success)
    """
    return requests.post("http://gamma.firebase.com/sms", data=json.dumps({'to': number, 'text':text}))

