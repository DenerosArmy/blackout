"""Tendril API wrapper for python"""
from copy import copy
import string
import requests
import logging
import sys

class Tendril(object):
    """Class for a Tendril user connection"""
    TENDRIL_URL = 'https://dev.tendrilinc.com'
    def __init__(self, oauth_token):
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
        r = requests.get(full_url.replace("_", "-"), headers={'Access_Token': self.oauth_token}, verify=False)
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

        def log_request(req):
            logging.info(req.url)
            logging.info("HEADERS" + str(req.headers))
            logging.info(req.data)

        hooks = dict(pre_request=log_request)
        r = requests.post(full_url.replace("_", "-"),
                          data=data,
                          headers={'Access_Token': self.oauth_token,
                                   'Accept': 'application/xml',
                                   'Content-Type': 'application/xml'},
                          verify=False,
                          hooks=hooks)
        if r:
            return r.text
        else:
            logging.error(r.text)
            return None
