import sys
import os

# Add project root to path
sys.path.insert(0, os.getcwd())

from utils.helpers import embed_text
from utils.config import settings
import google.generativeai as genai

print(f"API Key Start: {settings.google_api_key[:4] if settings.google_api_key else 'None'}")

if settings.google_api_key:
    genai.configure(api_key=settings.google_api_key)

try:
    print("Attempting direct embedding (bypassing helper)...")
    res = genai.embed_content(
        model=settings.model_embedding,
        content="Direct test",
        task_type="retrieval_query"
    )
    print(f"Direct Success! Vector len: {len(res['embedding'])}")

    print("Attempting helper embedding...")
    emb = embed_text("Test query")
    print(f"Helper Success! Vector length: {len(emb)}")
except Exception as e:
    print(f"Embedding failed: {e}")
    import traceback
    traceback.print_exc()
