#checks for power usage, identifies devices that should not be on, sends text.

#804f58aaaaaa0358
# need start time and end time for Get consumption

from bs4 import BeautifulSoup
from tendril import Tendril
from sms import send_sms
from datetime import datetime, timedelta

class DataProcessor(object):
    #passes in user id
    def __init__ (self, t, phone_number=None):
        self.t = t
        self.phone_number = phone_number
        self.device_count = 0
        self.device_id_list = []
        self.device_name_list = []
        self.device_power_list = []
        self.list_devices()
        self.power_use()

    def list_devices(self):
        user_XML = self.t.get('/connect/user/{user-id}/account/{account-id}/location/{location-id}/network/default-network/device',
                         user_id='current-user',
                         account_id='default-account',
                         location_id='default-location',
                         include_extended_properties="false")
        parser = BeautifulSoup(user_XML)
        parser.prettify()
        id_list = parser.find_all('deviceid')
        count = 0
        for a in id_list:
            self.device_id_list.append(str(a.string))
            count = count+1
        self.device_count = count

        name_list = parser.find_all('name')
        for p in name_list:
            if str(p.parent.name) == 'device':
                self.device_name_list.append(str(p.string))
            else:
                continue
        return self.device_name_list

    def power_use(self):
        start_date = datetime.today().replace(microsecond=0) - timedelta(seconds=120)
        end_date = datetime.today().replace(microsecond=0)

        for num in self.device_id_list:
            power_XML = self.t.get('/connect/user/{user-id}/account/{account-id}/location/{location-id}/device/{device-id}/consumption/{resolution}', **{
                              'user_id': 'current-user',
                              'account_id': 'default-account',
                              'location_id': 'default-location',
                              'device_id': str(num),
                              'resolution': 'RANGE',
                              'from': start_date.isoformat()+'Z',
                              'to': end_date.isoformat()+'Z',
                              'limit-to-latest': '10',
                              'include-submetering-devices': 'false'})
            parser = BeautifulSoup(power_XML)
            parser.prettify()
            power = parser.find_all('consumption')
            self.device_power_list.append(float(power[0].string))
        return self.device_power_list

    def send_text(self):
        string = []
        index = 0
        for index in range(self.device_count):
            if (self.device_power_list[index] > 0):
                string.append(self.device_device_name_list[index])
            else:
                continue
        text = "You still have {0} turned on!".format(string[0])
        send_sms(self.phone_number, text)

    def turn_off(self, device_id):
        text = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<setVoltDataRequest xmlns="http://platform.tendrilinc.com/tnop/extension/ems"
  deviceId="{device_id}" locationId="{location-id}">
  <data>
    <mode>{mode}</mode>
  </data>
</setVoltDataRequest>
""".format(device_id=device_id, location_id="62", mode="Off")
        response_XML = self.t.post('/connect/device-action', text)
        parser = BeautifulSoup(response_XML)
        parser.prettify()
        request_id = parser.setVoltDataRequest['requestId']
        result = self.t.get('/connect/device-action/{request-id}', request_id=request_id)
        if "Off" not in result:
            print result
            return False
        return True

    def query_on_off(self, device_id):
        text = """<?xml version="1.0" encoding="UTF-8' standalone="yes"?>
<{getRequest}
  xmlns="http://platform.tendrilinc.com/tnop/extension/ems"
  deviceId="{device-id}" locationId="{location-id}">
</{getRequest}>
""".format(device_id=device_id, location_id="62")
        response_XML = self.t.post('/connect/device-action', text)
        parser = BeautifulSoup(response_XML)
        parser.prettify()
        request_id = parser.setVoltDataRequest['requestId']
        result = self.t.get('/connect/device-action/{request-id}', request_id=request_id)
        print result
