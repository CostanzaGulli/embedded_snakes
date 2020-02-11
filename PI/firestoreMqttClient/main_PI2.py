import time 
import RPi.GPIO as GPIO

import start
import game1

import firestoreMqttClient.client as cl
import firestoreMqttClient.constants_mqtt as const



start.start() #set up mqtt connection and input pins

start = False

while start == False: