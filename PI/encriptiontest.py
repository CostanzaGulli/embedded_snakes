import ssl
import paho.mqtt.client as mqtt
client = mqtt.Client()
import json 
client.tls_set(ca_certs="mosquitto.org.crt", certfile="client.crt", keyfile="client.key", tls_version=ssl.PROTOCOL_TLSv1_2)

client.connect("test.mosquitto.org",port=8884)

data_move = {
        "type":"moves", 
        "data":{
            "move":"Burrito",
            "time":1.88,
            "user":"ValeBU",
            "success":False
        }
}

msg_info = client.publish("IC.embedded/snakes/test",str(json.dumps(data_move)))
publish_out = mqtt.error_string(msg_info.rc)
print("publish status: "+publish_out+"\n")

