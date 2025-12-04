import requests

# Test the enhanced endpoint with LinkedIn job URL
url = "http://localhost:8081/analyze/enhanced"

# The LinkedIn job URL you provided
data = {
    "job_url": "https://www.linkedin.com/jobs/view/4347332912",
    "job_description": "",  # Leave empty to test auto-scraping
    "company_url": ""  # Leave empty to test auto-detection
}

print("Testing automatic job scraping...")
print(f"Job URL: {data['job_url']}")
print("\nSending request...\n")

try:
    response = requests.post(url, data=data, timeout=60)
    
    if response.status_code == 200:
        result = response.json()
        print("✅ SUCCESS! Auto-scraping worked!\n")
        print(f"Trust Score: {result.get('trust_score')}/100")
        print(f"Combined Score: {result.get('combined_trust_score')}/100")
        print(f"Label: {result.get('label')}")
        print(f"Company Verified: {result.get('company_verified')}")
        print(f"Company Name: {result.get('company_name')}")
        print(f"Company Trust: {result.get('company_trust_score')}/100")
        print(f"\nReasons:")
        for reason in result.get('reasons', []):
            print(f"  - {reason}")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"❌ Request failed: {str(e)}")
