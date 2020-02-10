import client
import json

from firebase import firebase

import constants_mqtt


firebase = firebase.FirebaseApplication('https://embedded-snakes.firebaseio.com/', None)

def update_firebase(json_in):
    print(json_in)
    #json = {"move":data["move"],
    #        "time":data["time"],
    #        "user":data["user"],
    #        "success":data["success"]}
    firebase.post('/'+json_in["type"]+'/'+json_in["data"]["user"],json_in["data"])

def on_message_func(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    update_firebase(json.loads(msg.payload))
#update_firebase({"move":"Tap",
#            "time":1.2,
#            "user":"Eirik",
#            "success":True})
client.mqtt_connect()
client.mqtt_subscribe(constants_mqtt.broker, constants_mqtt.path ,on_message_func)


