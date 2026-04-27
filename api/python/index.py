from http.server import BaseHTTPRequestHandler
import time
import json

def sieve(limit):
    primes = bytearray([1]) * (limit + 1)
    primes[0] = primes[1] = 0
    for p in range(2, int(limit**0.5) + 1):
        if primes[p]:
            for i in range(p * p, limit + 1, p):
                primes[i] = 0
    return sum(primes)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        limit = 10_000_000
        start = time.time()
        count = sieve(limit)
        end = time.time()
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {
            "language": "Python",
            "time": end - start,
            "count": count,
            "limit": limit
        }
        self.wfile.write(json.dumps(response).encode())
        return
