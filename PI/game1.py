import time, spidev, sys, smbus
import Accelerometer.accelerometer_fn as accelerometer_fn
from statistics import stdev
import RPi.GPIO as GPIO

import mqtt_senddata
import constants_game
import random

def game():
    random.seed()
    timeout = 3 # Set timeout for each action  
    total_moves = 0
    total_score = 0
    time.sleep(1)

    while total_moves < 10:
        action_num = random.randint(1,3)
        if action_num == 1:
            action = "Shake"
        elif action_num == 2:
            action = "Raise"
        else:
            action = "Button"
        print("Do action:"+action)
        #convert to string
        user_action = 0
        start_action_time = time.time()
        elapsed_action_time = time.time() - start_action_time
        action_done = False
        while (elapsed_action_time <= timeout) and (action_done is False):

            # Move1 : shake the board
            # Move2 : raise the arm
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
                if x_stdev > 10000 or y_stdev > 10000 or z_stdev > 10000:
                    action_done = True
                    user_action = 1
                if (x_stdev > 3000 and x_stdev < 7000) or (y_stdev > 3000 and y_stdev < 7000) or (z_stdev > 3000 and z_stdev < 7000):
                    action_done = True
                    user_action = 2
                x_out.clear()
                y_out.clear()
                z_out.clear()
                elapsed_action_time = time.time() - start_action_time            

            # Move3 : press the button
            if (action_done is False):
                input_state = GPIO.input(10)
                if input_state == True:
                    action_done = True
                    user_action = 3 
            elapsed_action_time = time.time() - start_action_time
            
        # When the button is pressed, the board is moved a bit. So check if the botton is presses after 0.1s of the move
        loopstart_time = time.time()
        loop_time = time.time() - loopstart_time
        if action_done is True and (user_action==1 or user_action==2) and loop_time<0.1:
            input_state = GPIO.input(10)
            loop_time = time.time() - loopstart_time
            if input_state == True:
                action_done = True
                user_action = 3
   
        # Send mode data to the database. 
        if action_done is False:
            print("No action")
            mqtt_senddata.sendmove(str(action), timeout, constants_game.player, False)
        elif user_action == action:
            print("Right action "+str(action))
            total_score += 100
            if elapsed_action_time < 1:
                total_score += 50
            print("score = "+str(total_score))
            mqtt_senddata.sendmove(str(action), elapsed_action_time, constants_game.player, True)
        else:
            print("Wrong action. Had to do "+str(action)+", done "+str(user_action)+" instead\n")
            mqtt_senddata.sendmove(str(action), timeout, constants_game.player, False)
        total_moves += 1
        user_action = 0
        time.sleep(2) #at the end of the move, wait bofore the next

    return total_score