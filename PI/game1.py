import time, spidev, sys, smbus
import constants_game
import Accelerometer.accelerometer_fn as accelerometer_fn
from statistics import stdev
import RPi.GPIO as GPIO
import mqtt_senddata
import random
import os

# game funcion
def game():

    random.seed()
    timeout = 3 # Set timeout for each action  
    total_moves = 0
    total_score = 0
    time.sleep(1)
    os.system('mpg321 Audio/startgame.mp3')
    time.sleep(1)
    
    while total_moves < 10: # 10 moves in one game

        action_num = random.randint(1,3) # generate move randomly
        if action_num == 1:
            action = "Shake"
            os.system('mpg321 Audio/shake.mp3')

        elif action_num == 2:
            action = "Raise"
            os.system('mpg321 Audio/raise.mp3')

        else:
            action = "Button"
            os.system('mpg321 Audio/button.mp3')
        print("Do action: "+action)
        
        user_action = 0
        start_action_time = time.time()
        elapsed_action_time = time.time() - start_action_time
        action_done = False

        while (elapsed_action_time <= timeout) and (action_done is False):

            # check if Shake or Raise moves are detected (done with accelerometer)
            if (action_done is False):
                x_out = []
                y_out = []
                z_out = []

                for j in range(0,29): # take standard deviation over the past 30 readings in order to tell weather Shake or Raise actions were detected - raw readings were too inaccurate
                    x, y, z = accelerometer_fn.read_xyz()
                    x_out.append(x)
                    y_out.append(y)
                    z_out.append(z)

                x_stdev = stdev(x_out)
                y_stdev = stdev(y_out)
                z_stdev = stdev(z_out)

                if x_stdev > 10000 or y_stdev > 10000 or z_stdev > 10000:
                    action_done = True
                    user_action = "Shake"

                if (x_stdev > 3000 and x_stdev < 7000) or (y_stdev > 3000 and y_stdev < 7000) or (z_stdev > 3000 and z_stdev < 7000):
                    action_done = True
                    user_action = "Raise"

                # clear arrays to ensure next reading is correct
                x_out.clear()
                y_out.clear()
                z_out.clear()
                elapsed_action_time = time.time() - start_action_time          

            # check if Button move is detected
            if (action_done is False):
                input_state = GPIO.input(10)

                if input_state == True:
                    action_done = True
                    user_action = "Button"

            elapsed_action_time = time.time() - start_action_time
            
        # When the button is pressed, the accelerometer detects the board moving, detecting Shake or Raise insted. So check if the botton is pressed after 0.1s of the deteced move
        loopstart_time = time.time()
        loop_time = time.time() - loopstart_time
        if action_done is True and (user_action == "Shake" or user_action == "Raise") and loop_time < 0.1:
            input_state = GPIO.input(10)
            loop_time = time.time() - loopstart_time

            if input_state == True:
                action_done = True
                user_action = "Button"
   
        # Send game data to the database. 
        if action_done is False:
            print("No action") # no move detected within timeout 
            mqtt_senddata.sendmove(action, timeout, constants_game.player, False)

        elif user_action == action:
            print("Right action "+str(action)) # right move is detected
            total_score += 100 # 100 points for right move
            if elapsed_action_time < 1:
                total_score += 50 # plus 50 points for right move done within one second 
            print("score = "+str(total_score))
            mqtt_senddata.sendmove(action, elapsed_action_time, constants_game.player, True)

        else:
            total_score -= 20 # -20 penalty for performing wrong action
            print("Wrong action. Had to do "+str(action)+ ", done "+str(user_action)+" instead\n") # wrong move is detected
            mqtt_senddata.sendmove(action, timeout, constants_game.player, False)

        total_moves += 1
        user_action = 0
        time.sleep(2) #at the end of the move, wait before the next one

    if total_score >= 1000:
        mqtt_senddata.sendgame(True, total_score, constants_game.player)
    else:
        mqtt_senddata.sendgame(False, total_score, constants_game.player)