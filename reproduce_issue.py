import requests

url = "http://localhost:8081/analyze"

data = {
    "job_description": """
    URGENT: Security Alert
    Your account just logged in using a Windows device we haven't seen recently.
    Click the link below to verify this was you.
    If this wasn't you please change your password.
    """
    # No linkedin_url provided
}

print("Testing Job-Only Analysis...")
try:
    response = requests.post(url, data=data)
    print(f"Status: {response.status_code}")
    try:
        print("Response:", response.json())
    except Exception:
        print("Response (raw):", response.text.encode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
