import time 

import json
import client

client.mqtt_connect()


data = {
    "move":"Shake",
    "time":1.4,
    "user":"Eirik",
    "success":True
}
while 1:
    time.sleep(5)
    client.mqtt_publish("IC.embedded/snakes/test",str(json.dumps(data)))