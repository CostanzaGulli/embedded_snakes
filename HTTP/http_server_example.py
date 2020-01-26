import http.server
import socketserver

PORT = 8080 ## ngrok port

Handler = http.server.BaseHTTPRequestHandler
class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.end_headers()
    def do_GET(self):
        """Respond to a GET request."""
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world!')
    def do_POST(self):
        self.send_response(200)
        self.end_headers()

def run(server_class=http.server.HTTPServer, handler_class=http.server.BaseHTTPRequestHandler):
    server_address = ('', 8000)
    httpd = server_class(server_address, handler_class)
    httpd.serve_forever()

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()