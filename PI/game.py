#accelerometer
import time, spidev, sys, smbus
import Accelerometer.accelerometer_fn as accelerometer_fn
from statistics import stdev
import RPi.GPIO as GPIO

import mqtt_senddata
import constants_game

def game():
    timeout = 5 #set timeout for each action  
    
    action = int(input('Pick action: '))
    user_action = 0
    start_action_time = time.time()
    elapsed_action_time = time.time() - start_action_time
    action_done = False
    while (elapsed_action_time <= timeout) and (action_done is False):
        #move1
        if (action_done is False):
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
                user_action = 1
            x_out.clear()
            y_out.clear()
            z_out.clear()
            elapsed_action_time = time.time() - start_action_time


        #move2
        x_prev, y_prev, z_prev = accelerometer_fn.read_xyz()                 
        #print ('x: '+str(x_prev)+' y: '+str(y_prev)+' z: '+str(z_prev)+'\n')
        elapsed_action_time = time.time() - start_action_time
        if (action_done is False):                  
                x, y, z = accelerometer_fn.read_xyz()
                #time.sleep(.25)                   
                #print ('x: '+str(x)+' y: '+str(y)+' z: '+str(z)+'\n')
                elapsed_action_time = time.time() - start_action_time
                #print ('elapsed time: '+str(elapsed_action_time)+'\n')
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


        #move3
        if (action_done is False):
            input_state = GPIO.input(10)
            if input_state == True:
                action_done = True
                user_action = 3

        elapsed_action_time = time.time() - start_action_time
        print("LOOP END\n")
    #if action_done is False:
    if (action_done is False) and (elapsed_action_time >= timeout):#put this at the beginning
        mqtt_senddata.sendmove(str(action), timeout, constants_game.player, False)
        user_action = 0
