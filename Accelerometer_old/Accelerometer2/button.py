import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

while True:
    input_state = GPIO.input(10)
    if input_state == True:
        print('Button Pressed')
        time.sleep(0.2)
    else:
        print("not pressed")
        time.sleep(0.2)


