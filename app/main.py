from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

from app.database import engine, Base
from app.routers import patients, doctors  # Diğer router’lar da buraya eklenebilir

from app.api import auth

app = FastAPI()  # APP burada tanımlanmalı

# Router’i eklemeden önce app olmalı
app.include_router(auth.router, prefix="/auth", tags=["auth"])

# EKLE: Sahte veri yükleyici
from app.initial_data import load_initial_data

# Veritabanındaki tabloları oluştur (eğer yoksa)
Base.metadata.create_all(bind=engine)

# CORS ayarları
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # React uygulamanızın adresleri
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sahte veri yükleyici fonksiyonunu sadece server'ın ilk açılışında çağır
@app.on_event("startup")
def startup_load_fake_data():
    load_initial_data()

# Router’ları ekle
app.include_router(patients.router, prefix="/patients", tags=["patients"])
app.include_router(doctors.router, prefix="/doctors", tags=["doctors"])

@app.get("/")
async def root():
    return {"app_name": settings.app_name, "admin_email": settings.admin_email}
