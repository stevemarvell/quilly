import os
from typing import List, Optional, Any, Dict

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

app = FastAPI()

# Allow all origins during development; tighten for production as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PORT = int(os.getenv("PORT", "3001"))


# ----- Request/Response models -----
class ClaudeMessage(BaseModel):
    role: str
    content: str


class ClaudeRequest(BaseModel):
    messages: List[ClaudeMessage]
    system: Optional[str] = None


class EmbeddingsRequest(BaseModel):
    texts: List[str]


# ----- Routes -----
@app.post("/api/claude")
async def proxy_claude(req: ClaudeRequest) -> Any:
    api_key = os.getenv("CLAUDE_API_KEY")
    model = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5-20250929")

    if not api_key:
        raise HTTPException(status_code=500, detail={"error": "API key not configured"})

    url = "https://api.anthropic.com/v1/messages"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
    }

    payload: Dict[str, Any] = {
        "model": model,
        "max_tokens": 4096,
        "messages": [m.model_dump() for m in req.messages],
    }
    if req.system:
        payload["system"] = req.system

    async with httpx.AsyncClient(timeout=120) as client:
        r = await client.post(url, headers=headers, json=payload)

    if r.status_code < 200 or r.status_code >= 300:
        # Try to pass through the error from Anthropic
        try:
            data = r.json()
        except Exception:
            data = {"error": r.text}
        raise HTTPException(status_code=r.status_code, detail=data)

    return r.json()


@app.post("/api/embeddings")
async def proxy_embeddings(req: EmbeddingsRequest) -> Any:
    api_key = os.getenv("VOYAGE_API_KEY")

    if not api_key:
        raise HTTPException(status_code=500, detail={"error": "Voyage API key not configured"})

    url = "https://api.voyageai.com/v1/embeddings"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    payload = {
        "input": req.texts,
        "model": "voyage-2",
    }

    async with httpx.AsyncClient(timeout=120) as client:
        r = await client.post(url, headers=headers, json=payload)

    if r.status_code < 200 or r.status_code >= 300:
        try:
            data = r.json()
        except Exception:
            data = {"error": r.text}
        raise HTTPException(status_code=r.status_code, detail=data)

    return r.json()


# Optional root route to check health
@app.get("/")
async def root():
    return {"status": "ok", "service": "quilly-backend", "port": PORT}
