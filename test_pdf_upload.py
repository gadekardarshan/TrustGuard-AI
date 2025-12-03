import requests
import io
from pypdf import PdfWriter

# Create a dummy PDF in memory
pdf_buffer = io.BytesIO()
writer = PdfWriter()
writer.add_blank_page(width=72, height=72)
writer.write(pdf_buffer)
pdf_buffer.seek(0)

url = "http://localhost:8080/analyze"
files = {
    'resume_file': ('test_resume.pdf', pdf_buffer, 'application/pdf')
}
data = {
    'job_description': 'Software Engineer at Google. Apply at careers.google.com. No fees.'
}

try:
    response = requests.post(url, data=data, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
