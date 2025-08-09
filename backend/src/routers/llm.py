from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import httpx
import os

router = APIRouter(prefix="/llm", tags=["llm"])

# Configuração do vLLM
VLLM_URL = os.getenv("VLLM_URL", "http://localhost:8000")

@router.post("/chat")
async def chat_completion(request: Dict[str, Any]):
    """
    Endpoint para chat completion usando vLLM
    """
    try:
        # Forward request para vLLM
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{VLLM_URL}/v1/chat/completions",
                json=request,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Request timeout")
    except httpx.HTTPError as e:
        raise HTTPException(status_code=500, detail=f"LLM service error: {str(e)}")

@router.get("/models")
async def list_models():
    """
    Lista modelos disponíveis no vLLM
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{VLLM_URL}/v1/models")
            response.raise_for_status()
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list models: {str(e)}")

@router.get("/health")
async def llm_health():
    """
    Health check do serviço vLLM
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{VLLM_URL}/health")
            response.raise_for_status()
            return {"status": "healthy", "service": "vllm"}
    except Exception as e:
        return {"status": "unhealthy", "service": "vllm", "error": str(e)}

