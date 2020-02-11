import time 

import start
import game1

start.start() #set up mqtt connection and input pins

#while true . program keeps running
start=False
pressed_once = False
not_pressed_once = False
while start == False:
    input_state = GPIO.input(10)
    if (input_state == True) and (not_pressed_once == False):
        pressed_once = True
        print("pressed_once")
        time.sleep(0.1)
        start_start_time = time.time()
    if (pressed_once == True) and (input_state == False):
        not_pressed_once = True
        print("notpressed_once")
        time.sleep(0.1)
        elapsed_start_time = time.time() - start_start_time
    if (not_pressed_once == True) and elapsed_start_time > 1:
        print("GAME 1")
        game1.game()
        start=True
    if (not_pressed_once == True) and (input_state == True) and (elapsed_start_time<=1):
        print("GAME 2")
        start=True