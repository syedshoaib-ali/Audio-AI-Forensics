import librosa
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib

# Extract features
def extract_features(file_path):
    y, sr = librosa.load(file_path, sr=22050)

    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfcc_mean = np.mean(mfcc, axis=1)

    return mfcc_mean

# Train dummy model (for now)
def train_model():
    X = []
    y_labels = []

    # Fake training data (we'll improve later)
    for i in range(10):
        X.append(np.random.rand(13))
        y_labels.append(0)  # real

    for i in range(10):
        X.append(np.random.rand(13) + 1)
        y_labels.append(1)  # fake

    model = RandomForestClassifier()
    model.fit(X, y_labels)

    joblib.dump(model, "model.pkl")

# Predict
def predict(file_path):
    model = joblib.load("model.pkl")

    features = extract_features(file_path)
    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][1]

    return prediction, float(probability)