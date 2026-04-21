import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function FeatureRadar({ features, status }) {
  if (!features) return null;

  // 🎯 Better Normalization (balanced scaling)
  const normalize = (value, max) => Math.min((value / max) * 100, 100);

  const data = [
    { feature: "Energy", value: normalize(features.energy, 0.1) },
    { feature: "Centroid", value: normalize(features.spectral_centroid, 3000) },
    { feature: "ZCR", value: normalize(features.zcr, 0.2) },
    { feature: "Rolloff", value: normalize(features.rolloff, 5000) },
    { feature: "Bandwidth", value: normalize(features.bandwidth, 3000) },
    { feature: "MFCC", value: normalize(Math.abs(features.mfcc), 200) },
  ];

  // 🎨 Dynamic Color
  const getColor = () => {
    if (status === "Fake") return "#ef4444";      // red
    if (status === "Suspicious") return "#facc15"; // yellow
    return "#3b82f6"; // blue for real
  };

  return (
    <div className="w-full h-full glass p-4 rounded-2xl border border-white/20 flex flex-col">

      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-semibold text-center mb-2">
        Feature Analysis Radar
      </h2>

      <p className="text-sm text-gray-400 text-center mb-6">
        AI visualizes key audio characteristics to detect anomalies and synthetic patterns.
      </p>

      {/* 📊 RESPONSIVE CHART */}
      <div className="w-full h-[240px]">
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart data={data}>
      <PolarGrid stroke="#555" />
      <PolarAngleAxis dataKey="feature" stroke="#ccc" />
      <PolarRadiusAxis stroke="#888" domain={[0, 100]} />

      <Radar
        dataKey="value"
        stroke={getColor()}
        fill={getColor()}
        fillOpacity={0.4}
      />
    </RadarChart>
  </ResponsiveContainer>
</div>

      {/* 🧠 INSIGHT */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Irregular shapes or extreme spikes may indicate manipulated or AI-generated audio.
      </p>

    </div>
  );
}