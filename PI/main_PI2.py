import time 
import RPi.GPIO as GPIO
import start
import game1
import firestoreMqttClient.constants_mqtt as constants_mqtt
import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as sub

def on_connect(client, userdata, flags, rc):
    print("Connected with result code: "+str(rc))

def on_message(client, userdata, msg):
    print("ON_MESSAGE: "+msg.topic+" "+str(msg.payload))

def on_message_print(client, userdata, message):
    print("ON_MESSAGE PRINT"+"%s e anche %s" % (message.topic, message.payload))
    if message.payload.decode() == "START": # if receive START message from Pi1, start the game
        start = True
        game1.game()
        print("ESCO?")

client = mqtt.Client()
def mqtt_connect():  
    return_code = client.connect(constants_mqtt.broker, 8884) # using encrypted channel
    client.on_connect = on_connect
    if return_code == 0:
        print("connection succesful\n")
    else:
        error_string = mqtt.error_string(return_code)
        print("the error is "+error_string+" code "+return_code+'\n')

def mqtt_subscribe(host_name, path):
    client.on_message = on_message
    sub.callback(on_message_print, path, hostname = host_name)

start.start() # call function to set up mqtt connection and input pins

start = False
while start == False: # wait for START message to be received 
    mqtt_subscribe(constants_mqtt.broker, constants_mqtt.path_startgame)
print("esco2?")