import requests 
  
# api-endpoint 
# URL = "http://44ac3734.ngrok.io"
URL = "http://9f5767b3.ngrok.io"
    
# sending get request and saving the response as response object 
r = requests.post(url = URL, params = {"1":2}) 
  
# extracting data in json format 
data = r.json() 

  
# printing the output 
print("Latitude:%s\nLongitude:%s\nFormatted Address:%s"
      %(latitude, longitude,formatted_address) ) 