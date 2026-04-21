import numpy as np
import librosa
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
import os
# import gdown
# from tensorflow.keras.models import load_model

# MODEL_PATH = "cnn_model.h5"
# MODEL_URL = "https://drive.google.com/uc?id=18djCRLFAVRVtC44_wzwogZ5dngb7LzOI"

# # ✅ Download if not exists
# if not os.path.exists(MODEL_PATH):
#     print("⬇️ Downloading model...")
#     gdown.download(MODEL_URL, MODEL_PATH, quiet=False)

# # ✅ Load model
# model = load_model(MODEL_PATH)

model = load_model("cnn_model.h5", compile=False)

# 🔥 BUILD MODEL PROPERLY (CRITICAL FIX)
dummy = tf.zeros((1, 128, 128, 1))
model(dummy)

print("✅ CNN Model Loaded & Graph Initialized")

# ✅ ADD THIS (IMPORTANT)
def load_cnn_model():
    return model


# 🎧 Convert audio → spectrogram
def extract_spectrogram(file_path):
    try:
        y, sr = librosa.load(file_path, sr=22050)

        S = librosa.feature.melspectrogram(y=y, sr=sr)
        S_dB = librosa.power_to_db(S, ref=np.max)

        S_dB = cv2.resize(S_dB, (128, 128))

        S_dB = (S_dB - np.min(S_dB)) / (np.max(S_dB) - np.min(S_dB) + 1e-6)

        return S_dB

    except Exception as e:
        print("Spectrogram error:", e)
        return None


# 🤖 CNN Prediction
def predict_cnn(file_path):
    try:
        spec = extract_spectrogram(file_path)

        if spec is None:
            return "Error", 0.0

        spec = spec.reshape(1, 128, 128, 1)

        prob = model.predict(spec)[0][0]

        label = "Fake" if prob > 0.5 else "Real"

        return label, float(prob * 100)

    except Exception as e:
        print("Prediction error:", e)
        return "Error", 0.0