#checks for power usage, identifies devices that should not be on, sends text.

#804f58aaaaaa0358
# need start time and end time for Get consumption

from bs4 import BeautifulSoup       
class DataProcessor(object):
    #passes in user id
    def __init__ (self, user_id = '804f58aaaaaa0358'):
        self.user_id = user_id
        self.devices = {}
        start_time = ...
        end_time = ...
        self.device_count = 0
        self.device_id_list = []
        self.device_name_list = []
        self.device_power_list = []
    
    def get_voltage():
        data = BeautifulSoup(self.consumption_XML, xml)
        return float(data.consumption.string)

    def is_SMS():
        voltage = self.get_voltage()
        if (voltage > 0):
            SMS(self.device_id)

    def list_devices(self):
        user_XML = list_user_devices(user_id)
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
        print(self.device_name_list)
        print (self.device_id_list)

    def power_use(self):
        for num in self.device_id_list:
            power_XML = list_power_source(num)
            parser = BeautifulSoup(power_XML)
            parser.prettify()
            power = parser.find_all('consumption')
            self.device_power_list.append(float(power[0].string))
            print(self.device_power_list)

    def send_text(self):
        string = []
        index = 0
        for index in range(self.device_count):
            if (self.device_power_list[index] > 0):
                string.append(self.device_device_name_list[index])
            else:
                continue
        text = "You still have {0} turned on!".format(string[0])
        send_sms(phone_number,text)

        
                
                

            
            
            
        


            
            
            
            
        
        
        
        
        

    
        
        
        
        
            
        
        
        
        

    
