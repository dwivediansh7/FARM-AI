from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {
            "message": "Crop Recommendation API - Test Server",
            "status": "OK"
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            # Try to parse the JSON data
            data = json.loads(post_data.decode('utf-8'))
            
            # Create a sample prediction response
            sample_predictions = [
                {"crop": "Wheat", "probability": 0.92},
                {"crop": "Rice", "probability": 0.85},
                {"crop": "Maize", "probability": 0.78},
                {"crop": "Cotton", "probability": 0.65},
                {"crop": "Chickpea", "probability": 0.58}
            ]
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(sample_predictions).encode('utf-8'))
            
        except Exception as e:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))

def run_server():
    server_address = ('127.0.0.1', 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print("Starting simple HTTP server on http://127.0.0.1:8000")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Server stopped by user")
    except Exception as e:
        print(f"Server error: {str(e)}")

if __name__ == "__main__":
    run_server() 