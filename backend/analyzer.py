import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt

from cnn_model import predict_cnn, load_cnn_model

# 🔥 Load model once
cnn_model = load_cnn_model()


# 🧠 FEATURE SCORE
def compute_feature_score(features):
    score = 0

    if features["zcr"] > 0.1:
        score += 20

    if features["rolloff"] > 3000:
        score += 20

    if features["bandwidth"] > 2000:
        score += 20

    if features["energy"] < 0.02:
        score += 20

    if abs(features["mfcc"]) > 100:
        score += 20

    return min(score, 100)


# 🧠 🔥 NEW AI EXPLANATION SYSTEM
def generate_explanation(features, final_score):
    issues = []

    if features["zcr"] > 0.1:
        issues.append("High zero-crossing rate indicates noisy or synthetic signal")

    if features["rolloff"] > 3000:
        issues.append("Excessive high-frequency content detected")

    if features["bandwidth"] > 2000:
        issues.append("Unusual frequency spread detected")

    if features["energy"] < 0.02:
        issues.append("Low energy suggests artificial silence or compression")

    if abs(features["mfcc"]) > 100:
        issues.append("Voice characteristics appear unnatural")

    # 🎯 Severity
    if final_score > 75:
        severity = "High Risk"
        summary = "Audio shows strong indicators of manipulation or AI generation."
    elif final_score > 50:
        severity = "Medium Risk"
        summary = "Audio contains irregular patterns that may indicate partial manipulation."
    else:
        severity = "Low Risk"
        summary = "Audio characteristics appear natural with no strong signs of manipulation."

    # 🧠 Conclusion
    if final_score > 60:
        conclusion = "Audio is likely fake or AI-generated."
    elif final_score > 40:
        conclusion = "Audio may be partially manipulated."
    else:
        conclusion = "Audio is likely genuine."

    return {
        "severity": severity,
        "summary": summary,
        "issues": issues if issues else ["No major anomalies detected"],
        "conclusion": conclusion
    }


# 🔍 SEGMENTS
def detect_suspicious_segments(y, sr):
    segments = []

    energy = librosa.feature.rms(y=y)[0]
    threshold = np.mean(energy) * 1.5

    for i, e in enumerate(energy):
        if e > threshold:
            start = i * 512 / sr
            end = (i + 1) * 512 / sr
            segments.append({"start": round(start, 2), "end": round(end, 2)})

    return segments[:5]


# 🎯 MAIN FUNCTION
def analyze_audio(file_path):
    try:
        print("🔥 Running AI Audio Forensics")

        # -------- CNN --------
        cnn_label, cnn_score = predict_cnn(file_path)

        # -------- AUDIO --------
        y, sr = librosa.load(file_path, sr=22050)

        if len(y) == 0:
            return {"error": "Empty audio file"}

        # -------- FEATURES --------
        energy = float(np.mean(np.abs(y)))
        spectral = librosa.feature.spectral_centroid(y=y, sr=sr)
        spectral_centroid = float(np.mean(spectral))

        zcr = float(np.mean(librosa.feature.zero_crossing_rate(y)))
        rolloff = float(np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr)))
        bandwidth = float(np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr)))
        mfcc = float(np.mean(librosa.feature.mfcc(y=y, sr=sr)))

        features = {
            "energy": energy,
            "spectral_centroid": spectral_centroid,
            "zcr": zcr,
            "rolloff": rolloff,
            "bandwidth": bandwidth,
            "mfcc": mfcc
        }

        # -------- SCORE --------
        feature_score = compute_feature_score(features)
        final_score = (0.7 * cnn_score) + (0.3 * feature_score)

        # -------- LABEL --------
        if final_score > 60:
            final_label = "Fake"
        elif final_score > 40:
            final_label = "Suspicious"
        else:
            final_label = "Real"

        # -------- AI EXPLANATION --------
        explanation_data = generate_explanation(features, final_score)

        # -------- SPECTROGRAM --------
        spectrogram_path = file_path.replace(".wav", "_spec.png")

        plt.figure(figsize=(10, 4))
        S = librosa.feature.melspectrogram(y=y, sr=sr)
        S_dB = librosa.power_to_db(S, ref=np.max)

        librosa.display.specshow(S_dB, sr=sr, x_axis='time', y_axis='mel')
        plt.colorbar()
        plt.tight_layout()

        plt.savefig(spectrogram_path)
        plt.close()

        # -------- RESPONSE --------
        return {
            "final_label": final_label,
            "confidence": round(final_score, 2),

            "cnn_score": round(cnn_score, 2),
            "feature_score": round(feature_score, 2),

            "spectrogram": spectrogram_path,
            "features": features,

            # 🔥 NEW STRUCTURED EXPLANATION
            "ai_analysis": explanation_data,

            "segments": detect_suspicious_segments(y, sr),
            "audio": file_path
        }

    except Exception as e:
        return {
            "error": str(e)
        }