import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

client = OpenAI(
    api_key=api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

def main():
    try:
        print("Testing OpenAI-compatible embedding (SYNC)...")
        response = client.embeddings.create(
            input="Test query",
            model="models/text-embedding-004"
        )
        print("Success!")
        print(f"Vector length: {len(response.data[0].embedding)}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    main()
