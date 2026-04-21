import { useState } from "react";
import Upload from "../components/Upload";
import InsightPanel from "../components/InsightPanel";
import Spectrogram from "../components/Spectrogram";
import FeatureRadar from "../components/FeatureRadar";
import AudioPlayer from "../components/AudioPlayer";
import FeatureValues from "../components/FeatureValues";
import ExplanationCard from "../components/ExplanationCard";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen px-3 md:px-6 py-6">

      {/* HERO */}
      <div className="relative w-full h-[140px] md:h-[160px] flex items-center justify-center overflow-hidden">

  {/* 🌊 WAVE */}
  <svg
    className="absolute bottom-[-15px] w-full opacity-60 scale-y-65"
    viewBox="0 0 1440 320"
  >
    <defs>
      {/* 🔥 BRIGHT GRADIENT */}
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#60a5fa" />   {/* brighter blue */}
        <stop offset="50%" stopColor="#a78bfa" />  {/* brighter purple */}
        <stop offset="100%" stopColor="#22d3ee" /> {/* brighter cyan */}
      </linearGradient>
    </defs>

    <path
      fill="url(#waveGradient)"
      fillOpacity="0.5"
      d="M0,180L60,190C120,200,240,210,360,195C480,180,600,160,720,155C840,150,960,180,1080,195C1200,210,1320,200,1380,190L1440,185V320H0Z"
    >
      <animate
        attributeName="d"
        dur="5s"
        repeatCount="indefinite"
        values="
        M0,180L60,190C120,200,240,210,360,195C480,180,600,160,720,155C840,150,960,180,1080,195C1200,210,1320,200,1380,190L1440,185V320H0Z;

        M0,150L60,170C120,190,240,160,360,150C480,140,600,170,720,180C840,190,960,170,1080,150C1200,130,1320,120,1380,110L1440,100V320H0Z;

        M0,180L60,190C120,200,240,210,360,195C480,180,600,160,720,155C840,150,960,180,1080,195C1200,210,1320,200,1380,190L1440,185V320H0Z
        "
      />
    </path>
  </svg>

  {/* TEXT */}
  <div className="relative z-10 text-center">
    <h1 className="text-3xl md:text-4xl font-bold">
      🎧 AI Audio Forensics
    </h1>
    <p className="text-gray-400 text-sm mt-1">
      Detect deepfake audio using AI
    </p>
  </div>

</div>

      {/* UPLOAD */}
      <div className="flex justify-center mb-6">
        <Upload setResult={setResult} />
      </div>

      {/* 🔥 SECTION DIVIDER */}
      {result && !result.error && (
        <div className="w-full max-w-7xl mx-auto flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <p className="text-sm md:text-lg text-gray-300 tracking-widest leading-relaxed py-1">
            ANALYSIS RESULTS
          </p>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>
      )}

      {/* RESULTS */}
      {result && !result.error && (
        <div className="w-full max-w-7xl mx-auto space-y-6">

          {/* 🔥 ROW 1 */}
          <InsightPanel result={result} />

          {/* 🔥 ROW 2 */}
          {result.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <FeatureValues features={result.features} />
              <FeatureRadar
                features={result.features}
                status={result.final_label}
              />
            </div>
          )}

          {/* 🔥 ROW 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

            <ExplanationCard
              ai={result.ai_analysis || {
                summary: result.explanations?.join(" "),
                severity: result.final_label,
                issues: result.explanations || [],
                conclusion: result.final_label,
              }}
            />

            {result.audio && (
              <AudioPlayer
                audioPath={result.audio}
                segments={result.segments || []}
              />
            )}

          </div>

          {/* 🔥 ROW 4 */}
          {result.spectrogram && (
            <Spectrogram imagePath={result.spectrogram} />
          )}

        </div>
      )}

    </div>
  );
}