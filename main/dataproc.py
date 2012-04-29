#checks for power usage, identifies devices that should not be on, sends text.

#804f58aaaaaa0358
# need start time and end time for Get consumption

from bs4 import BeautifulSoup
from tendril import Tendril
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
        for id, name in self.t.devices().items():
            self.device_count += 1
            self.device_name_list.append(name)
            self.device_id_list.append(id)
        self.location_id = self.t.get_location()

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

    def turn_off(self, device_id):
        self.t.set_device_mode(device_id, self.location_id, 'Off')

    def turn_on(self, device_id):
        self.t.set_device_mode(device_id, self.location_id, 'On')
