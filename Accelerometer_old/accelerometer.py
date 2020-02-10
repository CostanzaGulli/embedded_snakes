#accelerometer
#import LIS3DH
import time, spidev, sys, smbus
import accelerometer_fn

#http
import requests 

#ADD NEGATIVE DIFFERENCES AS WELL

accel = LIS3DH.Accelerometer('i2c',i2cAddress = 0x18)
accel.set_ODR(odr=50, powerMode='normal')
accel.axis_enable(x='on',y='on',z='on')
#accel.interrupt_high_low('high')
#accel.latch_interrupt('on')
#accel.set_BDU('on')
#accel.set_scale()

#while True:
    
action = int(input('Pick action: '))

if action == 1: #shake
    start_action_time = time.time()
    print ('\nstart time: '+str(start_action_time)+'\n')
    elapsed_time = time.time() - start_action_time
    print ('elapsed time: '+str(elapsed_time)+'\n')
    action_done = False
    
    x_prev, y_prev, z_prev = accelerometer_fn.read_xyz()                 
    #print ('x: '+str(x_prev)+' y: '+str(y_prev)+' z: '+str(z_prev)+'\n')
    elapsed_time = time.time() - start_action_time

    #while action_done is False or elapsed_time >= 3:
    while elapsed_time <= 3:                  
            x, y, z = accelerometer_fn.read_xyz()
            #time.sleep(.25)                   
            #print ('x: '+str(x)+' y: '+str(y)+' z: '+str(z)+'\n')
            elapsed_time = time.time() - start_action_time
            #print ('elapsed time: '+str(elapsed_time)+'\n')
            if (x_prev-x)>20000:
                action_done = True
                print ('action 1 done X\n')
                #json_data=json.dumps({1})
                #URL = "http://aaf0cac7.ngrok.io" # api-endpoint 
                #r = requests.post(url = URL, params = json_data) # sending get request and saving the response as response object
            if (y_prev-y)>20000:
                action_done = True
                print ('action 1 done Y\n')
            if (z_prev-z)>20000:
                action_done = True
                print ('action 1 done Z\n')
            x_prev = x
            y_prev = y
            z_prev = z
    if action_done is False:
        print ('no movement\n')
        #json_data=json.dumps({0})
        #URL = "http://aaf0cac7.ngrok.io"
        #r = requests.post(url = URL, params = json_data)


if action == 2: #big move - slower
    start_action_time = time.time()
    print ('\nstart time: '+str(start_action_time)+'\n')
    elapsed_time = time.time() - start_action_time
    print ('elapsed time: '+str(elapsed_time)+'\n')
    action_done = False

    x_prev, y_prev, z_prev = accelerometer_fn.read_xyz()                 
    #print ('x: '+str(x_prev)+' y: '+str(y_prev)+' z: '+str(z_prev)+'\n')
    elapsed_time = time.time() - start_action_time

    #while action_done is False or elapsed_time >= 3:
    while elapsed_time <= 10:                  
            x, y, z = accelerometer_fn.read_xyz()
            #time.sleep(.25)                   
            #print ('x: '+str(x)+' y: '+str(y)+' z: '+str(z)+'\n')
            elapsed_time = time.time() - start_action_time
            #print ('elapsed time: '+str(elapsed_time)+'\n')
            if (((x_prev-x)<-5000 and (x_prev-x)>-10000) or ((x_prev-x)>5000 and (x_prev-x)<10000)) and (y_prev-y)<10000 and (z_prev-z)<10000 and (y_prev-y)>-10000 and (z_prev-z)>-10000:
                action_done = True
                print ('action 2 done X\n')
                print ('(x_prev-x)'+str(x_prev-x)+'\n')
                print ('(y_prev-y)'+str(y_prev-y)+'\n')
                print ('(z_prev-z)'+str(z_prev-z)+'\n')
                #json_data=json.dumps({1})
                #URL = "http://aaf0cac7.ngrok.io" # api-endpoint 
                #r = requests.post(url = URL, params = json_data) # sending get request and saving the response as response object
            if (((y_prev-y)<-5000 and (y_prev-y)>-10000) or ((y_prev-y)>5000 and (y_prev-y)<10000)) and (x_prev-x)<10000 and (z_prev-z)<10000 and (x_prev-x)>-10000 and (z_prev-z)>-10000:
                action_done = True
                print ('action 2 done Y\n')
                print ('(x_prev-x)'+str(x_prev-x)+'\n')
                print ('(y_prev-y)'+str(y_prev-y)+'\n')
                print ('(z_prev-z)'+str(z_prev-z)+'\n')
            if (((z_prev-z)<-5000 and (z_prev-z)>-10000) or ((z_prev-z)>5000 and (z_prev-z)<10000)) and (y_prev-y)<10000 and (x_prev-x)<10000 and (y_prev-y)>-10000 and (x_prev-x)>-10000:
                action_done = True
                print ('action 2 done Z\n')
                print ('(x_prev-x)'+str(x_prev-x)+'\n')
                print ('(y_prev-y)'+str(y_prev-y)+'\n')
                print ('(z_prev-z)'+str(z_prev-z)+'\n')
            x_prev = x
            y_prev = y
            z_prev = z
    if action_done is False:
        print ('no movement\n')
        #json_data=json.dumps({0})
        #URL = "http://aaf0cac7.ngrok.io"
        #r = requests.post(url = URL, params = json_data)        