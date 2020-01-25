from time import sleep
import datetime
from firebase import firebase

import json
import os 
from functools import partial


# Sensor should be set to Adafruit_DHT.DHT11,
# Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.

# Example using a Beaglebone Black with DHT sensor
# connected to pin P8_11.
# Try to grab a sensor reading.  Use the read_retry method which will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).


firebase = firebase.FirebaseApplication('https://embedded-snakes.firebaseio.com/', None)
#firebase.put("/dht", "/temp", "0.00")
#firebase.put("/dht", "/humidity", "0.00")
"""
humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)
if humidity is not None and temperature is not None:
    sleep(5)
    str_temp = ' {0:0.2f} *C '.format(temperature)	
    str_hum  = ' {0:0.2f} %'.format(humidity)
    print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity))	
        
else:
    print('Failed to get reading. Try again!')	
    sleep(10)
"""

def update_firebase():
    data = {"temp": 0, "humidity": 1.0}
    firebase.post('/sensor/dht', data)
	

while True:
		update_firebase()
		
        #sleepTime = int(sleepTime)
		sleep(5)