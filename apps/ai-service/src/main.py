"""
Tessera AI Service — FastAPI entry point.

Provides RAG ingestion endpoints and MCP tool server
for LLM-powered code assistance.
"""

from fastapi import FastAPI

app = FastAPI(
    title="Tessera AI Service",
    version="0.1.0",
    description="RAG & Model Context Protocol service for Tessera.io",
)


@app.get("/health")
async def health_check() -> dict[str, str]:
    """Liveness probe."""
    return {"status": "ok"}
