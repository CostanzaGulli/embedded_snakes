#accelerometer
import time, spidev, sys, smbus
import accelerometer_fn
from statistics import stdev

import mqtt_connection_fn

import RPi.GPIO as GPIO

#set up mqtt connection
mqtt_connection_fn.mqtt_connect() 

#set input pins
GPIO.setmode(GPIO.BCM)
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

#ADD NEGATIVE DIFFERENCES AS WELL   
action = int(input('Pick action: '))

if action == 1: #shake
    start_action_time = time.time()
    print ('\nstart time: '+str(start_action_time)+'\n')
    elapsed_time = time.time() - start_action_time
    print ('elapsed time: '+str(elapsed_time)+'\n')
    action_done = False

    while (action_done is False) and (elapsed_time <= 3):
        x_out = []
        y_out = []
        z_out = []
        for i in range(0,29):
            x, y, z = accelerometer_fn.read_xyz()
            x_out.append(x)
            y_out.append(y)
            z_out.append(z)
        x_stdev = stdev(x_out)
        y_stdev = stdev(y_out)
        z_stdev = stdev(z_out)
        print ('x: '+str(x_stdev)+' y: '+str(y_stdev)+' z: '+str(z_stdev)+'\n')#testing
        if x_stdev > 10000 or y_stdev > 10000 or z_stdev > 10000:
            action_done = True
            print ('action 1 done\n')#testing
            mqtt_connection_fn.mqtt_publish("IC.embedded/snakes/test","action 1 done")
        x_out.clear()
        y_out.clear()
        z_out.clear()
        elapsed_time = time.time() - start_action_time

    if action_done is False:
        print ('no action 1\n')#testing
        mqtt_connection_fn.mqtt_publish("IC.embedded/snakes/test","no action 1")
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
        # 

if action == 3:
    start_action_time = time.time()
    elapsed_time = time.time() - start_action_time
    action_done = False

    while (action_done is False) and (elapsed_time <= 10):
        input_state = GPIO.input(10)
        elapsed_time = time.time() - start_action_time
        if input_state == True:
            print('action 3 done - Button Pressed')
            action_done = True
            mqtt_connection_fn.mqtt_publish("IC.embedded/snakes/test","action 3 done")
    if action_done is False:
        print ('no action 3\n')#testing
        mqtt_connection_fn.mqtt_publish("IC.embedded/snakes/test","no action 3")

