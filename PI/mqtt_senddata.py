import json
import firestoreMqttClient.client as client 
import firestoreMqttClient.constants_mqtt as constants_mqtt

def sendmove(move_in, time_in, user_in, success_in):
    data_move = {
        "type":"moves",
        "data":{
            "move":move_in,
            "time":time_in,
            "user":user_in,
            "success":success_in
        }
    }
    client.mqtt_publish(constants_mqtt.path, str(json.dumps(data_move)))

def sendgame(win_in, score_in, user_in):
    data_game = {
        "type":"games",
        "data":{
            "win":win_in,
            "score":score_in,
            "user":user_in
        }
    }
    client.mqtt_publish(constants_mqtt.path, str(json.dumps(data_game)))