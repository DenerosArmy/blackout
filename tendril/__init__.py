"""Tendril API wrapper for python"""
from copy import copy
import string
import requests
import logging

class Tendril(object):
    """Class for a Tendril user connection"""
    TENDRIL_URL = 'http://dev.tendrilinc.com'
    def __init__(self, oauth_token='bbf00685300e5d45845ff6637bb471cf'):
        """Create a connection to Tendril with a given OAuth token

        :param str oauth_token: OAuth token
        """
        self.oauth_token = oauth_token

    def get(self, url, **params):
        """Send a GET request to Tendril

        :param str url: Tendril API URL, e.g. '/connect/user/{user-id}'
        :param str **params: param=value pairs. Use underscores instead of dashes
        :rtype: str or None
        """
        full_url = self.TENDRIL_URL + url.replace("-", "_").format(**params)
        unused_params = copy(params)
        for _, param, _, _ in string.Formatter().parse(url):
            if param is not None:
                del unused_params[param.replace("-", "_")]
        if unused_params:
            full_url += ";" + ";".join([k.replace("_", "-") + "=" + v for k,v in unused_params.items()])
        r = requests.get(full_url.replace("_", "-"), headers={'Access_Token': self.oauth_token})
        if r:
            return r.text
        else:
            logging.error(r.text)
            return None

    def post(self, url, data, **params):
        """Send a POST request to Tendril

        :param str url: Tendril API URL, e.g. '/connect/user/{user-id}'
        :param str data: Data of the POST request
        :param str **params: param=value pairs. Use underscores instead of dashes
        :rtype: str or None
        """
        full_url = self.TENDRIL_URL + url.replace("-", "_").format(**params)
        unused_params = copy(params)
        for _, param, _, _ in string.Formatter().parse(url):
            if param is not None:
                del unused_params[param.replace("-", "_")]
        if unused_params:
            full_url += ";" + ";".join([k.replace("_", "-") + "=" + v for k,v in unused_params.items()])
        r = requests.post(full_url.replace("_", "-"),
                          data=data,
                          headers={'Access_Token': self.oauth_token})
        if r:
            return r.text
        else:
            logging.error(r.text)
            return None
