import requests

url = "http://localhost:8080/analyze"

# Valid Job Description
data = {
    'job_description': 'We are looking for a Software Engineer to join our team. Competitive salary and benefits. Apply at careers.google.com.',
    'linkedin_url': 'https://www.linkedin.com/in/testuser'
}

print("Testing Local LLM Integration...")
try:
    response = requests.post(url, data=data)
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("Response:", response.json())
        print("[SUCCESS] Integration Successful!")
    else:
        print("[FAILURE] Request Failed:", response.text)
except Exception as e:
    print(f"[ERROR] Error: {e}")
