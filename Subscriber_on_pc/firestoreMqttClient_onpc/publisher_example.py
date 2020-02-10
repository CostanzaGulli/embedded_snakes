import time 

import json
import client
import constants_mqtt

client.mqtt_connect()


data_move = {
        "type":"moves", 
        "data":{
            "move":"Shake",
            "time":1.4,
            "user":"Pi1",
            "success":True
        }
}
data_game = {
        "type":"games", 
        "data":{
            "win":True,
            "score":15000,
            "user":"Costanza",
        }
}
while 1:
    time.sleep(5)
    client.mqtt_publish(constants_mqtt.path,str(json.dumps(data_game)))