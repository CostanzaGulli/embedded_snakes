import http.server
import socketserver

class HTTPHandler(http.server.BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.end_headers()
    def do_GET(self):
        """Respond to a GET request."""
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Hello, world!')
    def do_POST(self):
        """Respond to a POST request"""
        self.send_response(200)
        self.end_headers()
        self.
    