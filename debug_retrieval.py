import os
import logging
from dotenv import load_dotenv
import google.generativeai as genai
from qdrant_client import QdrantClient

# Load env from rag-bot folder if running from root
load_dotenv("rag-bot/.env")
load_dotenv() # Fallback

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("debug_retrieval")

def debug_search(query: str):
    api_key_gemini = os.getenv("GEMINI_API_KEY")
    api_key_qdrant = os.getenv("QDRANT_API_KEY")
    url_qdrant = os.getenv("QDRANT_URL")

    if not api_key_gemini or not api_key_qdrant:
        logger.error("Missing API Keys")
        return

    genai.configure(api_key=api_key_gemini)
    client = QdrantClient(url=url_qdrant, api_key=api_key_qdrant)

    # 1. Check Collection Info
    try:
        collection_info = client.get_collection("physical_ai_book")
        logger.info(f"Collection 'physical_ai_book' Status: {collection_info.status}")
        logger.info(f"Points Count: {collection_info.points_count}")
    except Exception as e:
        logger.error(f"Failed to get collection info: {e}")
        return

    # 2. Embed Query
    logger.info(f"Embedding query: '{query}'")
    emb_result = genai.embed_content(
        model="models/text-embedding-004",
        content=query,
        task_type="retrieval_query"
    )
    vector = emb_result["embedding"]

    # 3. Search
    logger.info("Searching Qdrant...")
    results = client.query_points(
        collection_name="physical_ai_book",
        query=vector,
        limit=5,
        with_payload=True
    ).points

    logger.info(f"Found {len(results)} results:")
    for i, point in enumerate(results):
        payload = point.payload
        print(f"\n[{i+1}] Score: {point.score:.4f}")
        print(f"Title: {payload.get('title')}")
        print(f"Heading: {payload.get('heading')}")
        print(f"Snippet: {payload.get('text')[:150]}...")

if __name__ == "__main__":
    debug_search("Digital Twin")
