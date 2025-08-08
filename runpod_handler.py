"""
AURAX Platform - RunPod Serverless Handler
"""

import runpod
import json
import os
import sys
from typing import Dict, Any

# Add paths for imports
sys.path.append('/aurax/backend/src')
sys.path.append('/aurax')

# Load environment if available
try:
    from dotenv import load_dotenv
    if os.path.exists('/aurax/.env'):
        load_dotenv('/aurax/.env')
except ImportError:
    pass

def handler(job):
    """Main RunPod serverless handler"""
    try:
        job_input = job.get('input', {})
        
        # Extract parameters
        prompt = job_input.get('prompt')
        if not prompt:
            return {"error": "Missing 'prompt' parameter"}
            
        provider = job_input.get('provider', 'aurax')
        model = job_input.get('model', 'aurax-v1')
        max_tokens = job_input.get('max_tokens', 1000)
        
        # Simulate LLM response (will integrate real LLMs later)
        response = f"🚀 AURAX Platform [{provider}] Response: {prompt}"
        
        return {
            "status": "success", 
            "response": response,
            "provider": provider,
            "model": model,
            "tokens_used": len(response.split()),
            "cost": 0.001,
            "processing_time": 0.5
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "error_type": type(e).__name__
        }

def health_check(job):
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "AURAX Platform is running",
        "version": "1.0.0",
        "environment": os.getenv('ENVIRONMENT', 'development')
    }

def main_router(job):
    """Main request router"""
    job_input = job.get('input', {})
    endpoint = job_input.get('endpoint', 'generate')
    
    if endpoint == 'health':
        return health_check(job)
    else:
        return handler(job)

if __name__ == "__main__":
    print("🚀 AURAX Platform Serverless Handler Starting...")
    print(f"Environment: {os.getenv('ENVIRONMENT', 'development')}")
    print(f"Python Path: {sys.path[:3]}...")  # Show first 3 paths
    
    runpod.serverless.start({
        "handler": main_router,
        "return_aggregate_stream": True
    })
