from Libraries import LIS3DH
import time, spidev, sys, smbus
from time import sleep
import datetime
from firebase import firebase

import json
import os 
from functools import partial

accel = LIS3DH.Accelerometer('i2c',i2cAddress = 0x18)
#accel = LIS3DH.Accelerometer('spi', i2cAddress = 0x0, spiPort = 0, spiCS = 1)  # spi connection alternative
accel.set_ODR(odr=50, powerMode='normal')
accel.axis_enable(x='on',y='on',z='on')
accel.interrupt_high_low('high')
accel.latch_interrupt('on')
accel.set_BDU('on')
accel.set_scale()

# Sensor should be set to Adafruit_DHT.DHT11,
# Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.

# Example using a Beaglebone Black with DHT sensor
# connected to pin P8_11.
# Try to grab a sensor reading.  Use the read_retry method which will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).


firebase = firebase.FirebaseApplication('https://embedded-snakes.firebaseio.com/', None)
#firebase.put("/dht", "/temp", "0.00")

while True:
    print('1. Raw X,Y & Z Data Output')
    print('2. Inertial Threshold Wake-up')
    print('3. 6D Positioning')
    print('4. 6D Movement')
    print('5. Single Click')
    print('6. Double Click')
    print('7. Get Temperature')
    print('9. Quit')
    exampleType = int(input('Pick example set up type: '))

    #----------  Raw X,Y, Z data output -----------------

    if exampleType == 1:

        print('\nPress Ctrl-C to stop')
        print('Starting Raw X,Y, & Z data output')

        try:
            while True:                  
                x = accel.x_axis_reading()   
                y = accel.y_axis_reading()
                z = accel.z_axis_reading()                    
                print ('x: '+str(x)+' y: '+str(y)+' z: '+str(z))
                #firebase.post("RaspberryPi",{"x":x,"y":y," z":z}) 
                time.sleep(.25)
        except:
            print('Stopping Raw X,Y, & Z data output \n')


# Distributed with a free-will license.
# Use it any way you want, profit or free, provided it fits in the licenses of its associated works.
# LIS3DHTR
# This code is designed to work with the LIS3DHTR_I2CS I2C Mini Module available from dcubestore.com
# http://dcubestore.com/product/lis3dhtr-3-axis-accelerometer-digital-output-motion-sensor-i%C2%B2c-mini-module/

