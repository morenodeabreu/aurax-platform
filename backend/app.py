from vllm.entrypoints.openai.api_server import run_server
import os

MODELOS = os.getenv("MODELS", "TheBloke/CodeLlama-34B-AWQ").split(",")

if __name__ == "__main__":
    run_server(
        model=MODELOS,
        tensor_parallel_size=1,
        host="0.0.0.0",
        port=8000
    )
