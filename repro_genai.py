import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY") # Or GOOGLE_API_KEY

print(f"Key found: {bool(api_key)}")
if api_key:
    print(f"Key start: {api_key[:5]}")

genai.configure(api_key=api_key)

try:
    print("Embedding...")
    result = genai.embed_content(
        model="models/text-embedding-004",
        content="Hello world",
        task_type="retrieval_document"
    )
    print("Success!")
    print(len(result['embedding']))
except Exception as e:
    print("Failed")
    print(e)
