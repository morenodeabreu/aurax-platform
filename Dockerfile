FROM runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04

WORKDIR /aurax

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl wget vim htop \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better caching)
COPY backend/requirements.txt /aurax/requirements.txt

# Install ALL Python dependencies at once
RUN pip install --no-cache-dir -r /aurax/requirements.txt

# Copy application files
COPY backend/ /aurax/backend/
COPY runpod_handler.py /aurax/
COPY .env.runpod /aurax/.env

# Set environment variables
ENV PYTHONPATH=/aurax/backend/src:/aurax
ENV ENVIRONMENT=production

# Run serverless handler
CMD ["python", "/aurax/runpod_handler.py"]
