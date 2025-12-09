import sys
import os
sys.path.insert(0, os.getcwd())

from utils.helpers import embed_text
from utils.config import settings

print(f"DEBUG: settings.google_api_key repr: {repr(settings.google_api_key)}")

try:
    print("Calling embed_text...")
    emb = embed_text("Test")
    print(f"Success! {len(emb)}")
except Exception as e:
    print(f"Failed: {e}")
