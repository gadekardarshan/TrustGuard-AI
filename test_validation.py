import requests

url = "http://localhost:8080/analyze"

# Test 1: Short Job Description
print("Test 1: Short Job Description")
data_short = {
    'job_description': 'hello',
    'linkedin_url': 'https://linkedin.com/in/test'
}
try:
    response = requests.post(url, data=data_short)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")

print("-" * 20)

# Test 2: Invalid LinkedIn URL
print("Test 2: Invalid LinkedIn URL")
data_invalid_url = {
    'job_description': 'This is a valid job description that is long enough to pass the validation check. It needs to be at least 50 characters.',
    'linkedin_url': 'https://github.com/test'
}
try:
    response = requests.post(url, data=data_invalid_url)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
