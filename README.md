<div align="center">

<br />

```
 ███╗   ██╗██╗   ██╗████████╗██████╗ ██╗ ██████╗ ██████╗ ██████╗ ███████╗
 ████╗  ██║██║   ██║╚══██╔══╝██╔══██╗██║██╔════╝██╔═══██╗██╔══██╗██╔════╝
 ██╔██╗ ██║██║   ██║   ██║   ██████╔╝██║██║     ██║   ██║██████╔╝█████╗  
 ██║╚██╗██║██║   ██║   ██║   ██╔══██╗██║██║     ██║   ██║██╔══██╗██╔══╝  
 ██║ ╚████║╚██████╔╝   ██║   ██║  ██║██║╚██████╗╚██████╔╝██║  ██║███████╗
 ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
```

**Precision nutrition intelligence — built for Indian bodies.**

[![Python](https://img.shields.io/badge/Python-3.11-3d7a5e?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-3d7a5e?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-0d9488?style=flat-square)](https://langchain-ai.github.io/langgraph)
[![React](https://img.shields.io/badge/React-18-3d7a5e?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-0d9488?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Llama](https://img.shields.io/badge/Llama_3.1-Ollama-3d7a5e?style=flat-square)](https://ollama.com)
[![License](https://img.shields.io/badge/License-MIT-0d9488?style=flat-square)](LICENSE)

<br />

> *Not another calorie counter. A stateful, multi-agent AI system that knows your history, learns your patterns, and gives advice no generic app can replicate — grounded in 14,000+ Indian foods, PubMed research, and your live biometric data.*

<br />

</div>

---

## Table of Contents

- [Overview](#overview)
- [Why NutriCore](#why-nutricore)
- [System Architecture](#system-architecture)
- [The Six Agents](#the-six-agents)
- [Tech Stack](#tech-stack)
- [Data & Memory Systems](#data--memory-systems)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Overview

NutriCore is a **multi-agent AI nutrition system** designed specifically for Indian users. It combines meal tracking, fitness data, bloodwork analysis, and medical research to deliver deeply personalised nutrition guidance — including dedicated support for diabetic and prediabetic users.

Six specialised AI agents run on a **LangGraph state machine**, sharing context and conditionally activating based on your data, your day, and your health profile. Every agent output is grounded — in Indian food databases, PubMed research abstracts, and your live biometric history.

```
Photo of your meal  ──►  NutritionAgent  ──►  full macro + micro breakdown
Strava workout      ──►  FitnessAgent    ──►  adjusted calorie ceiling
Bloodwork PDF       ──►  DeficiencyAgent ──►  cited micronutrient alerts
Friday evening      ──►  CheatDayAgent   ──►  justified cheat budget
HbA1c history       ──►  DiabetesAgent   ──►  GI/GL scoring + CGM correlation
All of the above    ──►  PlannerAgent    ──►  one coherent daily plan
```

---

## Why NutriCore

| Problem | How NutriCore solves it |
|---|---|
| Generic apps use Western food databases | Built on IFCT 2017 — 1,000+ Indian foods with full micronutrient data |
| No app accounts for daily variance | 6 agents share live state — sleep, workout, and meals all inform each other |
| Diabetic users get no specialised guidance | DiabetesAgent scores every meal by GI/GL, correlates with CGM readings |
| Nutrition advice is never cited | DeficiencyAgent cites PubMed abstracts with every alert |
| Cheat days are ignored | CheatDayAgent calculates a mathematically justified weekend budget |
| Apps don't learn your patterns | LangGraph conversation memory persists context across sessions |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Frontend                           │
│          Dashboard  ·  Chat  ·  Questionnaire  ·  Auth         │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTP / REST
┌──────────────────────────────▼──────────────────────────────────┐
│                      FastAPI Backend                            │
│   /meals  ·  /chat  ·  /fitness  ·  /bloodwork  ·  /auth      │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                  LangGraph State Machine                        │
│                                                                 │
│   NutritionAgent  ──►  FitnessAgent  ──►  CheatDayAgent       │
│         │                   │                    │              │
│         └──────────────►  Shared State  ◄────────┘              │
│                             │                                   │
│   DeficiencyAgent  ◄────────┤  ────►  DiabetesAgent            │
│                             │                                   │
│                       PlannerAgent  (always last)               │
└──────────────────────────────┬──────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                    ▼
   PostgreSQL             Qdrant DB           Ollama (local)
   User data &         Vector embeddings     Llama 3.1 · LLaVA
   meal/workout logs   IFCT · PubMed RAG     nomic-embed-text
```

### Supervisor routing logic

The PlannerAgent supervisor reads the current state and conditionally routes:

```python
# User logs a meal photo
→ ALWAYS:          NutritionAgent   (identify food, calc macros)
→ IF Strava synced:  FitnessAgent   (adjust calorie ceiling)
→ IF micro < threshold: DeficiencyAgent  (flag gap, cite PubMed)
→ IF day == Friday:  CheatDayAgent  (calculate weekend budget)
→ IF diabetic user:  DiabetesAgent  (GI/GL score, CGM correlation)
→ ALWAYS last:     PlannerAgent     (synthesise final response)
```

---

## The Six Agents

### `01` — NutritionAgent · *Food Intelligence*

Identifies Indian dishes from meal photos using LLaVA vision. Maps every ingredient to the IFCT 2017 database — 1,000+ foods — returning a full macro and micro breakdown down to B12, iron, and calcium.

- **Tools:** LLaVA 1.6 (vision), IFCT RAG (Qdrant), USDA API
- **Input:** Meal photo OR text (e.g. `"2 rotis, dal tadka, raita"`)
- **Output:** Calories, protein, carbs, fat, fibre + all micronutrients
- **Special:** Understands Indian portions — katori, glass, piece, handful

---

### `02` — FitnessAgent · *Activity Sync*

Pulls live workout data from Strava and Google Fit via OAuth2. Recalculates your daily calorie ceiling based on workout intensity, heart rate zones, and MET values.

- **Tools:** Strava API, Google Fit API, MET calculator
- **Input:** Strava OAuth token, manual gym log
- **Output:** Calories burned, activity type, adjusted daily target
- **Special:** Distinguishes cardio vs strength training intensity

---

### `03` — CheatDayAgent · *Weekend Intelligence*

The only agent of its kind. Monitors your weekly calorie deficit and workout streak, then produces a mathematically justified cheat budget — expressed in real Indian food equivalents (samosas, biryani, chai).

- **Tools:** Weekly history DB, Indian junk food database
- **Input:** Weekly deficit, workout consistency, prior cheat history
- **Output:** Weekend calorie budget + payback plan
- **Activates:** When user asks OR on Fridays automatically

---

### `04` — DeficiencyAgent · *Micronutrient Watchdog*

Flags silent deficiencies before they compound. Cross-references daily logs against bloodwork PDFs (parsed with PyMuPDF) and cites PubMed research abstracts with every alert.

- **Tools:** PubMed RAG (Qdrant), PyMuPDF bloodwork parser
- **Input:** Daily micro logs, uploaded bloodwork PDF
- **Output:** Deficiency alerts with Indian food suggestions + citations
- **Activates:** When any micro falls below threshold for 2+ consecutive days

---

### `05` — DiabetesAgent · *Glycaemic Control*

Only activates for prediabetic and diabetic users. Scores every meal by glycaemic index and load, correlates readings with CGM glucose data, and tracks HbA1c trends against ICMR dietary guidelines.

- **Tools:** GI/GL database (University of Sydney), CGM API, ICMR RAG
- **Input:** Every meal + glucose readings + HbA1c from bloodwork
- **Output:** GI/GL score per meal, spike warnings, HbA1c trend
- **Activates:** `user.health_condition in ["prediabetic", "type1", "type2"]`

> ⚠️ Every DiabetesAgent output includes: *"This is AI-generated guidance. Consult your doctor before changing diet or medication."*

---

### `06` — PlannerAgent · *Orchestrator*

Always runs last. Reads the full shared state graph — every agent's output — and synthesises it into one coherent, personalised daily recommendation. This is the voice you actually talk to.

- **Tools:** Full shared state, LangChain conversation memory
- **Input:** Everything all other agents wrote to state
- **Output:** Single coherent response + daily summary
- **Always runs:** Yes — every single interaction ends here

---

## Tech Stack

### Backend

| Layer | Technology | Purpose |
|---|---|---|
| Language | Python 3.11 | Core backend |
| API Framework | FastAPI | Async REST endpoints |
| ORM | SQLAlchemy 2.0 | Database models + queries |
| Validation | Pydantic v2 | Request/response schemas |
| Auth | JWT (python-jose) | Token-based authentication |

### AI & Agent Layer

| Tool | Purpose |
|---|---|
| LangChain | Prompt management, chains, tool binding |
| LangGraph | Multi-agent state graph with conditional routing |
| Llama 3.1 (Ollama) | Local LLM — no API cost, no vendor dependency |
| LLaVA 1.6 (Ollama) | Vision model — identifies Indian foods from photos |
| nomic-embed-text | Embedding model for RAG vector search |

### RAG Layer

| Tool | Purpose |
|---|---|
| Qdrant | Vector database — IFCT foods + PubMed research |
| LangChain Retriever | Semantic search connector |
| PyMuPDF | PDF parser for bloodwork uploads |

### Frontend

| Tool | Purpose |
|---|---|
| React 18 + TypeScript | Component framework |
| Vite | Build tooling |
| Framer Motion | Animations |
| GSAP + ScrollTrigger | Scroll-based animations (landing page) |
| Lenis | Smooth scroll |
| Formik + Yup | Form state + validation |
| Sonner | Toast notifications |
| React Router v6 | Client-side routing |

### Infrastructure

| Tool | Purpose |
|---|---|
| Docker + Compose | Local containerisation |
| PostgreSQL | Primary database |
| Railway.app | Cloud deployment |

---

## Data & Memory Systems

NutriCore uses three distinct memory types:

### 1. RAG Knowledge Memory (Qdrant)
Shared across all users. Documents chunked → embedded → stored in Qdrant → retrieved by semantic similarity.

| Collection | Contents |
|---|---|
| `ifct_foods` | 1,000+ Indian foods with full nutrition profiles (IFCT 2017) |
| `pubmed_nutrition` | 500+ PubMed abstracts on nutrition and deficiencies |
| `gi_database` | Glycaemic index values from University of Sydney |
| `icmr_guidelines` | Indian dietary guidelines, chunked and indexed |

### 2. User Long-Term Memory (PostgreSQL)
Personal data persisted across all sessions.

| Table | Key Fields |
|---|---|
| `users` | id, name, email, weight, goal, activity_level, health_condition, hba1c, region |
| `meal_logs` | user_id, date, food_items[], calories, macros, micros |
| `workout_logs` | user_id, date, source, activity_type, calories_burned |
| `glucose_logs` | user_id, date, reading_type, value, meal_id |
| `bloodwork` | user_id, date, b12, iron, d3, calcium, hba1c |

### 3. Conversation Memory (LangChain)
Current session context. Enables follow-ups like *"I just told you I had poha — what should I eat for lunch?"*  
Persists for the current session only.

---

## Project Structure

```
nutricore/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── models/
│   │   ├── user.py             # SQLAlchemy User model
│   │   ├── meal_log.py
│   │   ├── workout_log.py
│   │   └── bloodwork.py
│   ├── agents/
│   │   ├── nutrition_agent.py
│   │   ├── fitness_agent.py
│   │   ├── cheat_day_agent.py
│   │   ├── deficiency_agent.py
│   │   ├── diabetes_agent.py
│   │   └── planner_agent.py
│   ├── graph/
│   │   ├── state.py            # NutriMindState definition
│   │   └── supervisor.py       # LangGraph routing logic
│   ├── rag/
│   │   ├── indexer.py          # IFCT + PubMed ingestion
│   │   └── retriever.py        # Qdrant semantic search
│   ├── routers/
│   │   ├── auth.py
│   │   ├── meals.py
│   │   ├── fitness.py
│   │   ├── bloodwork.py
│   │   └── chat.py
│   ├── database.py             # SQLAlchemy session setup
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Questionnaire.tsx
│   │   │   └── Loader.tsx
│   │   ├── context/
│   │   │   └── ThemeContext.tsx # Design token system
│   │   ├── api/
│   │   │   └── authentication.ts
│   │   └── App.tsx
│   ├── index.html
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Docker + Docker Compose
- [Ollama](https://ollama.com) installed locally

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nutricore.git
cd nutricore
```

### 2. Pull Ollama models

```bash
ollama pull llama3.1
ollama pull llava
ollama pull nomic-embed-text
```

### 3. Start infrastructure

```bash
# Starts PostgreSQL + Qdrant
docker-compose up -d
```

### 4. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

pip install fastapi uvicorn sqlalchemy alembic pydantic python-jose
pip install langchain langchain-ollama langgraph langchain-community
pip install qdrant-client pymupdf pillow requests python-dotenv httpx

# Run database migrations
alembic upgrade head

# Index knowledge bases (first run only)
python rag/indexer.py

# Start the API server
uvicorn main:app --reload --port 8000
```

### 5. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/nutricore

# Vector DB
QDRANT_URL=http://localhost:6333

# LLM (local via Ollama)
LLAMA_URL=http://localhost:11434

# Auth
SECRET_KEY=your-random-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Strava OAuth
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret

# Google Fit OAuth
GOOGLE_FIT_CLIENT_ID=your_google_fit_client_id
GOOGLE_FIT_CLIENT_SECRET=your_google_fit_client_secret
```

> **Security note:** Never commit `.env` to version control. `strava_access_token` and `strava_refresh_token` stored in the database should be encrypted with `cryptography.fernet` before insertion.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Create a new user account |
| `POST` | `/auth/login` | Authenticate and receive JWT |
| `POST` | `/meals/log` | Log a meal (photo or text) |
| `GET` | `/meals/history` | Retrieve meal history |
| `POST` | `/fitness/sync` | Trigger Strava / Google Fit sync |
| `GET` | `/fitness/history` | Retrieve workout history |
| `POST` | `/bloodwork/upload` | Upload bloodwork PDF for parsing |
| `GET` | `/bloodwork/latest` | Get latest bloodwork summary |
| `POST` | `/chat` | Send message to PlannerAgent |
| `GET` | `/chat/history` | Retrieve conversation history |
| `GET` | `/user/profile` | Get current user profile |
| `PATCH` | `/user/profile` | Update profile (weight, goal, etc.) |

Full interactive docs available at `http://localhost:8000/docs` (Swagger UI) after starting the backend.

---

## Deployment

NutriCore deploys to [Railway.app](https://railway.app) as three services:

```
Railway Project: NutriCore
├── Service 1: FastAPI App
│   └── Source: GitHub (auto-deploy on push to main)
│
├── Service 2: PostgreSQL
│   └── Managed by Railway — DATABASE_URL injected automatically
│
└── Service 3: Qdrant
    └── Docker image: qdrant/qdrant | Port: 6333
```

### Deploy steps

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect repo to Railway
#    railway.app → New Project → Deploy from GitHub

# 3. Add PostgreSQL service
#    Railway dashboard → Add Service → PostgreSQL

# 4. Add Qdrant service
#    Railway dashboard → Add Service → Docker Image → qdrant/qdrant

# 5. Set environment variables in Railway dashboard

# 6. Re-index Qdrant after deployment
railway run python rag/indexer.py
```

**Estimated cost:** ~$5/month on Railway Hobby Plan covering all three services.

---

## Roadmap

- [x] NutritionAgent — photo + text meal logging
- [x] FitnessAgent — Strava + Google Fit OAuth2
- [x] CheatDayAgent — weekly deficit + budget
- [x] DeficiencyAgent — PubMed-cited alerts
- [x] DiabetesAgent — GI/GL + CGM + HbA1c
- [x] PlannerAgent — LangGraph orchestration
- [x] React frontend with chat-first dashboard
- [x] JWT authentication
- [ ] FreeStyle Libre CGM integration (LibreLinkUp API)
- [ ] Regional personalisation (North / South / East / West Indian)
- [ ] Fasting mode — Navratri, Ekadashi, Ramadan safe meal plans
- [ ] Weekly email summaries
- [ ] Mobile app (React Native)
- [ ] HbA1c prediction model

---

## Acknowledgements

- [IFCT 2017](https://www.nin.res.in) — Indian Food Composition Tables, National Institute of Nutrition, Hyderabad
- [PubMed E-utilities](https://www.ncbi.nlm.nih.gov/home/develop/api/) — National Library of Medicine
- [University of Sydney GI Database](https://glycemicindex.com) — Glycaemic index reference data
- [ICMR Dietary Guidelines](https://www.icmr.gov.in) — Indian Council of Medical Research
- [LangGraph](https://langchain-ai.github.io/langgraph) — Multi-agent orchestration framework
- [Ollama](https://ollama.com) — Local LLM inference

---

<div align="center">

<br />

Built with precision for Indian bodies.

`LangGraph` · `Llama 3.1` · `FastAPI` · `React` · `Qdrant`

<br />

</div>
