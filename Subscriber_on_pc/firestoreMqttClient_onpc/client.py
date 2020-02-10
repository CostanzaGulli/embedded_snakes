import time 

import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as sub
import json

import constants_mqtt

import ssl ##

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

# Subscribing in on_connect() means that if we lose the connection and
# reconnect then subscriptions will be renewed.
#    client.subscribe("$SYS/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    update_firebase(json.loads(msg.payload))

def on_message_print(client, userdata, message):
    print("%s %s" % (message.topic, message.payload))

client = mqtt.Client()
def mqtt_connect(): 
    client.tls_set(ca_certs="mosquitto.org.crt", certfile="client.crt", keyfile="client.key", tls_version=ssl.PROTOCOL_TLSv1_2) 
    return_code = client.connect(constants_mqtt.broker, 8884) #connect(host, port=1883, keepalive=60, bind_address="")
    client.on_connect = on_connect
    if return_code == 0:
        print("connection succesful\n")
    else:
        error_string = mqtt.error_string(return_code)
        print("the error is "+error_string+" code "+return_code+'\n')

def mqtt_publish(path, mqtt_message):
    msg_info = client.publish(path,mqtt_message)
    publish_out = mqtt.error_string(msg_info.rc)
    print("publish status: "+publish_out+"\n")

def mqtt_subscribe(host_name, path, on_message_func):
    client.on_message=on_message_func
    #client.message_callback_add("IC.embedded/snakes/test",on_message_func)
    client.message_callback_add(path,on_message_func)
    client.subscribe(path)
    client.loop_forever()

