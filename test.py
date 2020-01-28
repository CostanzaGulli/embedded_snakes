import time 

#num = (0b1<<2) + 0b1
#print(str(bin(num))) 

#start = time.perf_counter() 
#time.sleep(.5) 
#elapsed = 

import paho.mqtt.client as mqtt
import paho.mqtt.subscribe as subscribe

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
#    client.subscribe("$SYS/#")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
#print(RETURN_CODE'\n')

#client.connect("test.mosquitto.org", 1883, 60) #connect(host, port=1883, keepalive=60, bind_address="")
#client.connect("test.mosquitto.org", 1883)
client.connect("146.169.151.183", 1883)
client.on_connect = on_connect

mqtt.error_string('error')

client.publish("IC.embedded/snakes/test","hello from pi")

#mqtt.error_string(MSG_INFO.rc) #MSG_INFO is result of publish()
#mqtt.error_string('mqtt_errno')
#print(error+'\n')
time.sleep(10) 

#client.subscribe("IC.embedded/snakes/test")
#client.on_message = on_message
#client.loop_start()
#callback(callback, topics, qos=0, userdata=None, hostname="146.169.151.183", port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None, protocol=mqtt.MQTTv311)

def on_message_print(client, userdata, message):
    print("%s %s" % (message.topic, message.payload))

subscribe.callback(on_message_print, "IC.embedded/snakes/test", hostname="146.169.151.183")

