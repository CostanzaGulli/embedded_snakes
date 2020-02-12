import time 
import RPi.GPIO as GPIO
import start
import game1
import firestoreMqttClient.client as cl
import firestoreMqttClient.constants_mqtt as const
import mqtt_senddata
import constants_game

start.start() # call function to set up mqtt connection and input pins


while True: # program keeps waiting for the beginning of a game

    start = False 
    pressed_once = False
    not_pressed_once = False
    print("To play alone, press button once. To play with Pi2, press button twice.")

    while start == False:
        input_state = GPIO.input(10)

        # If the button is pressed once: 1 PLAYER GAME
        # If the button is pressed twice: 2 PLAYERS GAME
        if (input_state == True) and (not_pressed_once == False):
            pressed_once = True
            time.sleep(0.1)
            start_start_time = time.time()

        if (pressed_once == True) and (input_state == False):
            not_pressed_once = True
            time.sleep(0.1)
            elapsed_start_time = time.time() - start_start_time

        if (not_pressed_once == True) and elapsed_start_time > 1:
            start=True
            print("1 PLAYER GAME")
            score = game1.game() #Start game
            if score >= 1000:
                mqtt_senddata.sendgame(True, score, constants_game.player)
            else:
                mqtt_senddata.sendgame(False, score, constants_game.player)

        if (not_pressed_once == True) and (input_state == True) and (elapsed_start_time <= 1): # if the button is pressed twice within one second: two players 
            start = True
            print("2 PLAYERS GAME")
            cl.mqtt_publish(const.path_startgame, "START") # Send message to Pi2 to start the game.
            score = game1.game() # call function to start the game