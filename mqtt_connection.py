import time 

import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as sub

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

# Subscribing in on_connect() means that if we lose the connection and
# reconnect then subscriptions will be renewed.
#    client.subscribe("$SYS/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

def on_message_print(client, userdata, message):
    print("%s %s" % (message.topic, message.payload))

client = mqtt.Client()

return_code = client.connect("test.mosquitto.org", 1883) #connect(host, port=1883, keepalive=60, bind_address="")
client.on_connect = on_connect
if return_code == 0:
    print("connection succesful\n")
else:
    error_string = mqtt.error_string(return_code)
    print("the error is "+error_string+" code "+return_code+'\n')

MSG_INFO = client.publish("IC.embedded/snakes/test","hello from pi")
publish_out = mqtt.error_string(MSG_INFO.rc)
print("publish status: "+publish_out+"\n")

time.sleep(1) 

client.on_message = on_message
#client.subscribe("IC.embedded/snakes/#")
client.loop()
#client.subscribe("IC.embedded/#")

#callback(callback, topics, qos=0, userdata=None, hostname="146.169.151.183", port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311)
sub.callback(on_message_print, "IC.embedded/#", hostname="test.mosquitto.org")