FROM runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04

WORKDIR /aurax

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl wget vim htop \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt /aurax/requirements.txt
RUN pip install --no-cache-dir -r /aurax/requirements.txt

# Install RunPod serverless
RUN pip install runpod

# Copy application files
COPY backend/src/ /aurax/backend/src/
COPY runpod_handler.py /aurax/

# Set environment
ENV PYTHONPATH=/aurax/backend/src

# Run serverless handler
CMD ["python", "/aurax/runpod_handler.py"]
