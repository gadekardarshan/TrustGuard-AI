import requests

url = "http://localhost:8081/analyze"

data = {
    'job_description': "Hello,\n\nYour account just logged in using a(n) Windows device we haven't seen you use recently. Click the link below to verify this was you and continue to NVIDIA. If this wasn't you please change your password.",
    'linkedin_url': 'https://www.linkedin.com/in/darshan-gadekar-b98'
}

print("Testing Phishing Text Analysis...")
try:
    response = requests.post(url, data=data)
    print(f"Status: {response.status_code}")
    try:
        print("Response:", response.json())
    except Exception:
        print("Response (raw):", response.text.encode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
