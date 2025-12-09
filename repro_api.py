import requests
import json

url = "http://localhost:8001/api/chat"
headers = {"Content-Type": "application/json"}
data = {"query": "What is ROS 2?"}

try:
    response = requests.post(url, headers=headers, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
