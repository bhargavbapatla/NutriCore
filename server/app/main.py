from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the Express-like app
app = FastAPI(title="NutriMind API")

# Allow your React frontend (Vite's default port 5173) to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a basic GET route (like app.get('/') in Express)
@app.get("/")
async def root():
    return {"message": "NutriMind API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "Not connected yet"}