import paho.mqtt.client as mqtt
import json
client =mqtt.Client()
client.connect("127.0.0.1",port=1883)

data_out=json.dumps({"acc":{"X":1,"Y":2,"Z":3}}) # encode object to JSON
client.publish("IC.embedded/GROUP_NAME/test","Hello from me")