import firestoreMqttClient.client as client
import RPi.GPIO as GPIO


def start():
    # set up mqtt connection
    client.mqtt_connect() 

    # set input pins
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
