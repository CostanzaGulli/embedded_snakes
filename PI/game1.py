#accelerometer
import time, spidev, sys, smbus
import Accelerometer.accelerometer_fn as accelerometer_fn
from statistics import stdev
import RPi.GPIO as GPIO

import mqtt_senddata
import constants_game
import random

def game():
    random.seed()
    timeout = 5 #set timeout for each action  
    
    while True:
        action = random.randint(1,3)
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
                for j in range(0,29):
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
                    print('action 1 done')
                x_out.clear()
                y_out.clear()
                z_out.clear()
                elapsed_action_time = time.time() - start_action_time


            #move2
            #x_prev, y_prev, z_prev = accelerometer_fn.read_xyz()                 
            #print ('x: '+str(x_prev)+' y: '+str(y_prev)+' z: '+str(z_prev)+'\n')
            #elapsed_action_time = time.time() - start_action_time
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
                if (x_stdev > 3000 and x_stdev < 7000) or (y_stdev > 3000 and y_stdev < 7000) or (z_stdev > 3000 and z_stdev < 7000):
                    action_done = True
                    user_action = 2
                    print('action 2 done')
                x_out.clear()
                y_out.clear()
                z_out.clear()
                elapsed_action_time = time.time() - start_action_time


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
