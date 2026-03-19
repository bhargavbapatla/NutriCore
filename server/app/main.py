from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
import app.models
from app.database import engine, get_db
from app.api.routes.api import router as api_router


app = FastAPI(title="NutriCore API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "NutriCore API is running!"}

# Health check route to verify Supabase connection
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Execute a simple raw SQL query
        db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "Connected to Supabase PostgreSQL!"}
    except Exception as e:
        return {"status": "unhealthy", "database": f"Connection failed: {str(e)}"}


app.include_router(api_router, prefix="/api")