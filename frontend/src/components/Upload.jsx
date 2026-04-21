import { useState } from "react";
import { analyzeAudio } from "../services/api";

export default function Upload({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    setLoading(true);

    try {
      const res = await analyzeAudio(file);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch result" });
    }

    setLoading(false);
  };

  // 📂 Drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  return (
    <div className="glass p-8 rounded-3xl shadow-2xl w-full max-w-lg transition duration-300 hover:scale-[1.03] glow">

      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Audio 🎧
      </h2>

      {/* 🔥 DRAG & DROP AREA */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
          dragActive
            ? "border-blue-400 bg-blue-500/10"
            : "border-gray-500 hover:border-blue-400"
        }`}
      >
        <p className="text-gray-300 mb-2">
          Drag & Drop your audio here
        </p>

        <p className="text-sm text-gray-500 mb-3">
          or
        </p>

        {/* 📎 FILE INPUT */}
        <label className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Choose File
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        {file && (
          <p className="text-xs text-gray-400 mt-3">
            Selected: {file.name}
          </p>
        )}
      </div>

      {/* 🚀 BUTTON */}
      <button
        onClick={handleUpload}
        className="mt-5 bg-blue-500 px-4 py-2 rounded-lg w-full transition hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/50"
      >
        {loading ? "Analyzing AI Model..." : "Analyze Audio"}
      </button>

    </div>
  );
}