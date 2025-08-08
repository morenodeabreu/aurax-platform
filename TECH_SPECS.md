# 🔧 AURAX Platform - Technical Specifications

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Frontend      │    │   Backend API    │    │   LLM Providers     │
│   (React/Next)  │◄──►│   (FastAPI)      │◄──►│   (OpenAI, Claude)  │
│                 │    │                  │    │                     │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   CDN/Static    │    │   Database       │    │   External APIs     │
│   (Vercel/S3)   │    │   (PostgreSQL)   │    │   (Monitoring)      │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

## 🎨 Frontend Stack

### Core Technologies
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand/Redux Toolkit
- **HTTP Client**: TanStack Query + Axios
- **WebSocket**: Socket.io-client
- **Charts**: Recharts/Chart.js
- **Icons**: Lucide React

### Project Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Auth group routes
│   │   ├── dashboard/      # Dashboard pages
│   │   └── chat/          # Chat interface
│   ├── components/         # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── chat/          # Chat-specific components
│   │   └── layout/        # Layout components
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React contexts
│   ├── styles/            # Global styles
│   ├── lib/              # Utilities & configs
│   └── types/            # TypeScript types
├── public/               # Static assets
└── tests/               # Frontend tests
```

### Key Components

#### Chat Interface
```typescript
// Chat component structure
interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  provider: 'openai' | 'claude' | 'gemini' | 'ollama';
  timestamp: Date;
  metadata?: {
    model: string;
    tokens: number;
    cost: number;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  settings: ChatSettings;
  createdAt: Date;
  updatedAt: Date;
}
```

#### API Integration
```typescript
// API client structure
class AuraxAPI {
  async sendMessage(params: SendMessageParams): Promise<ChatMessage>
  async getHistory(sessionId: string): Promise<ChatMessage[]>
  async createSession(title?: string): Promise<ChatSession>
  async updateApiKey(provider: string, key: string): Promise<void>
  async getUsageStats(): Promise<UsageStats>
}
```

## 🔧 Backend Stack

### Core Technologies
- **Framework**: FastAPI 0.104+
- **Language**: Python 3.11+
- **Database**: PostgreSQL 15+
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Cache**: Redis 7+
- **Queue**: Celery + Redis
- **WebSocket**: FastAPI WebSocket
- **Auth**: JWT + OAuth2
- **HTTP Client**: httpx

### Project Structure
```
backend/
├── src/
│   ├── main.py              # FastAPI app entry
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   ├── chat.py
│   │   └── api_key.py
│   ├── routers/             # API routes
│   │   ├── auth.py
│   │   ├── chat.py
│   │   ├── users.py
│   │   └── providers.py
│   ├── services/            # Business logic
│   │   ├── llm_service.py
│   │   ├── auth_service.py
│   │   └── chat_service.py
│   ├── providers/           # LLM provider integrations
│   │   ├── openai.py
│   │   ├── anthropic.py
│   │   ├── gemini.py
│   │   └── ollama.py
│   └── utils/              # Utilities
│       ├── database.py
│       ├── security.py
│       └── config.py
├── tests/                  # Backend tests
└── migrations/            # Database migrations
```

### Database Schema

#### Core Tables
```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    plan_type VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- API Keys table
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    encrypted_key TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Chat Sessions table
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    provider VARCHAR(50),
    model VARCHAR(100),
    tokens INTEGER,
    cost DECIMAL(10,6),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Usage tracking table
CREATE TABLE usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    model VARCHAR(100),
    tokens_used INTEGER,
    cost DECIMAL(10,6),
    request_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### LLM Provider Integration

#### Base Provider Interface
```python
from abc import ABC, abstractmethod
from typing import Dict, Any, AsyncGenerator

class BaseLLMProvider(ABC):
    def __init__(self, api_key: str):
        self.api_key = api_key
    
    @abstractmethod
    async def chat_completion(
        self, 
        messages: List[Dict[str, str]], 
        model: str = None,
        **kwargs
    ) -> Dict[str, Any]:
        pass
    
    @abstractmethod
    async def stream_chat_completion(
        self, 
        messages: List[Dict[str, str]], 
        model: str = None,
        **kwargs
    ) -> AsyncGenerator[str, None]:
        pass
    
    @abstractmethod
    def get_available_models(self) -> List[str]:
        pass
    
    @abstractmethod
    def calculate_cost(self, tokens: int, model: str) -> float:
        pass
```

#### OpenAI Provider Implementation
```python
class OpenAIProvider(BaseLLMProvider):
    BASE_URL = "https://api.openai.com/v1"
    
    MODELS = {
        "gpt-4": {"input": 0.03, "output": 0.06},
        "gpt-4-turbo": {"input": 0.01, "output": 0.03},
        "gpt-3.5-turbo": {"input": 0.001, "output": 0.002}
    }
    
    async def chat_completion(self, messages, model="gpt-4", **kwargs):
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.BASE_URL}/chat/completions",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={
                    "model": model,
                    "messages": messages,
                    **kwargs
                }
            )
            return response.json()
```

## 🔗 API Design

### REST Endpoints

#### Authentication
```
POST /auth/register        # User registration
POST /auth/login          # User login
POST /auth/refresh        # Token refresh
DELETE /auth/logout       # User logout
```

#### Chat Management
```
GET    /chat/sessions           # List user sessions
POST   /chat/sessions           # Create new session
GET    /chat/sessions/{id}      # Get session details
PUT    /chat/sessions/{id}      # Update session
DELETE /chat/sessions/{id}      # Delete session

POST   /chat/sessions/{id}/messages  # Send message
GET    /chat/sessions/{id}/messages  # Get message history
```

#### Provider Management
```
GET    /providers              # List available providers
GET    /providers/{name}/models # Get provider models
POST   /providers/{name}/keys   # Set API key
DELETE /providers/{name}/keys   # Remove API key
GET    /providers/usage         # Get usage statistics
```

#### WebSocket Events
```javascript
// Client -> Server
{
  "type": "chat_message",
  "session_id": "uuid",
  "content": "Hello world",
  "provider": "openai",
  "model": "gpt-4"
}

// Server -> Client
{
  "type": "chat_response",
  "message_id": "uuid", 
  "content": "Hello! How can I help?",
  "tokens": 125,
  "cost": 0.0025
}
```

## 🗄️ Database Design

### Performance Considerations
- **Indexing Strategy**
  - Primary keys: UUID with B-tree index
  - User queries: Index on user_id + created_at
  - Full-text search: GIN index on message content
  - Provider queries: Composite index on (user_id, provider)

- **Partitioning**
  - Messages table: Partition by created_at (monthly)
  - Usage logs: Partition by created_at (weekly)

- **Connection Pooling**
  - PgBouncer for connection management
  - Async connection pool with SQLAlchemy

### Data Retention
- **Messages**: 90 days for free tier, unlimited for paid
- **Usage logs**: 1 year for analytics
- **Sessions**: Unlimited, user-controlled deletion

## ☁️ Infrastructure

### Development Environment
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/aurax
      - REDIS_URL=redis://redis:6379
    depends_on: [db, redis]
  
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=aurax
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes: ["postgres_data:/var/lib/postgresql/data"]
  
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

### Production Architecture (AWS)
- **Compute**: ECS Fargate containers
- **Database**: RDS PostgreSQL with read replicas
- **Cache**: ElastiCache Redis cluster
- **Storage**: S3 for static assets
- **CDN**: CloudFront distribution
- **Load Balancer**: Application Load Balancer
- **Monitoring**: CloudWatch + Grafana
- **Secrets**: AWS Secrets Manager

### Security Measures
- **API Security**
  - JWT authentication with RS256
  - Rate limiting per user/IP
  - Request validation with Pydantic
  - CORS configuration
  - HTTPS enforcement

- **Database Security**
  - Encrypted connections (SSL)
  - Row-level security (RLS)
  - API key encryption at rest
  - Regular backups with encryption

- **Infrastructure Security**
  - VPC with private subnets
  - Security groups and NACLs
  - WAF for DDoS protection
  - Regular security scans

## 📊 Monitoring & Observability

### Application Metrics
- **Performance**: Response time, throughput, error rate
- **Business**: Token usage, API calls, user activity
- **Infrastructure**: CPU, memory, disk usage

### Logging Strategy
```python
import structlog

logger = structlog.get_logger()

# Example usage in chat endpoint
logger.info(
    "chat_message_sent",
    user_id=user.id,
    session_id=session.id,
    provider=provider,
    model=model,
    tokens=response.tokens,
    cost=response.cost,
    duration_ms=duration
)
```

### Alerting Rules
- **Critical**: API error rate > 5%
- **Warning**: Response time > 2s
- **Info**: High usage spike (>500% normal)

## 🚀 Deployment Pipeline

### CI/CD Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          # Backend tests
          cd backend && python -m pytest
          # Frontend tests  
          cd frontend && npm test
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          # Build and push Docker images
          # Update ECS services
          # Run database migrations
```

### Environment Configuration
- **Development**: Local Docker setup
- **Staging**: AWS ECS with test data
- **Production**: AWS ECS with production data

---

**Document Version**: 1.0  
**Last Updated**: Janeiro 2025  
**Author**: Roberto Moreno