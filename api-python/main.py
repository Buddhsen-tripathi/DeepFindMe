from fastapi import FastAPI
from routes.whois_route import router as whois_router
from routes.notify_route import router as notify_router
from routes.username_search_route import router as username_search_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DeepFindMe API", version="1.0.0")

# Include routers
app.include_router(whois_router)
app.include_router(notify_router)
app.include_router(username_search_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the DeepFindMe API!"}