import os
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from analyzer import analyze_audio

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads folder exists
os.makedirs("uploads", exist_ok=True)

# Serve uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


@app.get("/")
def home():
    return {"message": "AI Audio Forensics Running 🚀"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        file_path = f"uploads/{file.filename}"

        # ✅ Save file
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # ✅ Pass file path to analyzer
        result = analyze_audio(file_path)

        return result

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}