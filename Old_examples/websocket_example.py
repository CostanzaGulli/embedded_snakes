#!/usr/bin/env python

# WS client example

import socketio

# standard Python
sio = socketio.Client()

@sio.event
def message(data):
    print('I received a message!')

@sio.event
def connect():
    print("I'm connected!")

@sio.event
def connect_error():
    print("The connection failed!")

@sio.event
def disconnect():
    print("I'm disconnected!")

@sio.on('FromAPI')
def on_message(data):
    print(data)

sio.connect('http://localhost:4001')

print('my sid is', sio.sid)
