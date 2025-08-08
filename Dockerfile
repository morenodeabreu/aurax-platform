FROM runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04

WORKDIR /aurax

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl wget vim htop screen tmux \
    postgresql-client redis-tools \
    nodejs npm \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt /aurax/backend/requirements.txt
RUN pip install --no-cache-dir -r /aurax/backend/requirements.txt

# Copy application
COPY . /aurax/

# Install and build frontend
WORKDIR /aurax/frontend
RUN npm install && npm run build

WORKDIR /aurax

# Create startup script
RUN echo '#!/bin/bash\n\
echo "🚀 AURAX Platform Starting..."\n\
cd /aurax/backend && uvicorn src.main:app --host 0.0.0.0 --port 8000 &\n\
cd /aurax/frontend && npm start -- --port 3000 &\n\
echo "✅ Running on ports 8000 (API) and 3000 (Frontend)"\n\
tail -f /dev/null\n\
' > start.sh && chmod +x start.sh

EXPOSE 8000 3000
CMD ["./start.sh"]
