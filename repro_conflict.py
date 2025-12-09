import sys
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

import google.generativeai as genai

def test_genai(label):
    print(f"Testing {label}...")
    genai.configure(api_key=api_key)
    try:
        genai.embed_content(model="models/text-embedding-004", content="Test", task_type="retrieval_query")
        print(f"  {label} Success!")
    except Exception as e:
        print(f"  {label} Failed: {e}")

test_genai("Baseline")

try:
    import pydantic_settings
    print("\nImported pydantic_settings")
    test_genai("After pydantic_settings")
except ImportError:
    print("pydantic_settings not found")

try:
    sys.path.insert(0, os.getcwd())
    from utils.config import settings
    print("\nImported utils.config")
    test_genai("After utils.config")
except Exception as e:
    print(f"\nutils.config import failed: {e}")
