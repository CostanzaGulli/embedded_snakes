import time 
import RPi.GPIO as GPIO

import start
import game1

import firestoreMqttClient.client as cl
import firestoreMqttClient.constants_mqtt as const

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
    if (not_pressed_once == True) and elapsed_start_time > 1: #If the button is pressed once, 1 player
        start=True
        print("GAME 1")
        game1.game()
    if (not_pressed_once == True) and (input_state == True) and (elapsed_start_time<=1): #If the button is pressed twice, 2 players
        start=True
        print("GAME 2")

        # Send message to Pi1 to start the game.
        cl.mqtt_publish(const.path_startgame, "START")
        game1.game()
        # Start Game (at a time?)