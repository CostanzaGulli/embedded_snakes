import time 

import json
import client

client.mqtt_connect()


data_move = {
        "type":"moves", 
        "data":{
            "move":"Shake",
            "time":1.4,
            "user":"Eirik",
            "success":True
        }
}
data_game = {
        "type":"games", 
        "data":{
            "win":True,
            "score":14000,
            "user":"Eirik",
        }
}
while 1:
    time.sleep(5)
    client.mqtt_publish("IC.embedded/snakes/test",str(json.dumps(data_game)))