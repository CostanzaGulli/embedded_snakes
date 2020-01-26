import requests 
import json
  
# api-endpoint 
URL = "http://3d6cc8e6.ngrok.io"
    
# sending get request and saving the response as response object 
r = requests.post(url = URL, params = {"1":2}) 

r = requests.get(url=URL,params="Name")
print(r.content)