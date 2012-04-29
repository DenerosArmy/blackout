"""Tendril API wrapper for python"""
from bs4 import BeautifulSoup
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

    def devices(self):
        """Return a device dictionary for the current user

        :rtype: Dictionary from device id to device name
        """
        xml = self.get('/connect/user/{user-id}/account/{account-id}/location/{location-id}/network/default-network/device',
                         user_id='current-user',
                         account_id='default-account',
                         location_id='default-location',
                         include_extended_properties="false")
        parser = BeautifulSoup(xml)

        device_id_list = []
        device_name_list = []
        count = 0

        id_list = parser.find_all('deviceid')
        for a in id_list:
            device_id_list.append(str(a.string))
            count = count+1

        name_list = parser.find_all('name')
        for p in name_list:
            if str(p.parent.name) == 'device':
                device_name_list.append(str(p.string))

        return dict(zip(device_id_list, device_name_list))

    def get_location(self):
        """Get the location id for the current user

        :rtype: str
        """
        response_XML = self.get("/connect/user/{user-id}/account/{account-id}/location/{location-id}",
        user_id='current-user',
        account_id='default-account',
        location_id='default_location')
        parser = BeautifulSoup(response_XML)
        parser.prettify()
        parser.find_all('MeterReading') 	
	for node in parser.find_all('location'):
            return node['id']

    def set_device_mode(self, device_id, location_id, mode='Off'):
        """Set the mode for a given device

        :param str device_id: Device id
        :param str device_id: Location id
        :param str mode: Either 'On' or 'Off'
        :return: True on success, False on failure
        """
        text = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<setVoltDataRequest xmlns="http://platform.tendrilinc.com/tnop/extension/ems"
  deviceId="{device_id}" locationId="{location_id}">
  <data>
    <mode>{mode}</mode>
  </data>
</setVoltDataRequest>
""".format(device_id=device_id, location_id=location_id, mode=mode)
        xml = self.post('/connect/device-action', text)
        print xml
        parser = BeautifulSoup(xml)
        parser.prettify()
        find = parser.find_all('setvoltdatarequest')
        if len(find) != 1:
            logging.error("Could not parse XML response")
            return False
        request_id = find[0]['requestid']
        result = self.get('/connect/device-action/{request-id}', request_id=request_id)
        if mode not in result:
            logging.error(result)
            return False
        return True

    def query_device_mode(self, device_id, location_id):
        """Get the mode for a given device

        :return: Either 'On' or 'Off'
        """
        text = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<getVoltDataRequest
  xmlns="http://platform.tendrilinc.com/tnop/extension/ems"
  deviceId="{device_id}" locationId="{location_id}">
</getVoltDataRequest>
""".format(device_id=device_id, location_id=location_id)
        xml = self.post('/connect/device-action', text)
        if 'On' in xml:
            return 'On'
        elif 'Off' in xml:
            return 'Off'
        else:
            assert False
	def read_meter(self,startTime, endTime,limit_to_latest,source): 
		"""Returns actual or estimated meter readings for an account. Returns as dictionary of dictionaries, mapping mRIDs to a dictionary of times and meter readings. 

		:param str startTime: The user's account ID, which corresponds to the seId entered in the user's database record.
		:param datetime startTime: The start date and time for the returned data.
		:param datetime endTime: The end date and time for the returned data.
		:param string limit_to_latest: The total number of records to be returned.
		:param string source Whether to return actual or estimated values.
		"""

		
		
		account_id = 'default-account'
		result = self.get('/connect/meter/read',**{
					'account_id':account_id ,
					'from':startTime,
					'to':endTime,
					'limit_to_latest':limit_to_latest,
					'source':source})
		parser = BeautifulSoup(result)
		parser.prettify() 
		returnDict = {} 
		meterReadings = parser.find_all('MeterReading') 
		for eachMeter in meterReadings:
					returnDict[eachMeter.MeterAsset.mRID.originalEncoding] = {} 
					meterReading = eachMeter.find_all('Reading') 
					for eachMeterReading in eachMeter:
						returnDict[eachMeter.MeterAsset.mRID.originalEncoding][eachMeterReading.timeStamp.originalEncoding] = eachMeterReading.value.originalEncoding
						
						returnDict[eachMeter.MeterAsset.mRID.originalEncoding][eachMeterReading.timeStamp.originalEncoding] = eachMeterReading.ReadingQualities.quality.originalEncoding

		return returnDict


	
