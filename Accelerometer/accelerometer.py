#accelerometer
import LIS3DH
import time, spidev, sys, smbus
import accelerometer_fn

#http
import requests 

accel = LIS3DH.Accelerometer('i2c',i2cAddress = 0x18)
accel.set_ODR(odr=50, powerMode='normal')
accel.axis_enable(x='on',y='on',z='on')
#accel.interrupt_high_low('high')
#accel.latch_interrupt('on')
#accel.set_BDU('on')
#accel.set_scale()

while True:
    
    action = int(input('Pick action: '))

    if action == 1:
        start_action_time = time.clock()
        elapsed_time = time.clock() - start_action_time
        action_done = False

        while action_done is False or elapsed_time >= 3:                  
                x, y, z = accelerometer_fn.read_xyz()
                time.sleep(.25)                   
                print ('x: '+str(x)+' y: '+str(y)+' z: '+str(z))
                if x>100 or y>100 or z>100:
                    action_done = True
                    #json_data=json.dumps({1})
                    #URL = "http://aaf0cac7.ngrok.io" # api-endpoint 
                    #r = requests.post(url = URL, params = json_data) # sending get request and saving the response as response object
        if action_done is False:
            #json_data=json.dumps({0})
            #URL = "http://aaf0cac7.ngrok.io"
            #r = requests.post(url = URL, params = json_data)

