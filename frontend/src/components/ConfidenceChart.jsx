import { useEffect, useState } from "react";

export default function ConfidenceChart({ value, color }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(value), 200);
  }, [value]);

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // 🎨 COLOR FROM PARENT
  const getColor = () => {
    if (color === "red") return "#ef4444";
    if (color === "yellow") return "#facc15";
    return "#22c55e";
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <svg height={radius * 2} width={radius * 2}>
        
        {/* Background */}
        <circle
          stroke="#374151"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 1s ease",
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* TEXT */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-white text-xl font-semibold"
        >
          {progress.toFixed(0)}%
        </text>
      </svg>

      <p className="text-sm text-gray-400 mt-2">
        Confidence Score
      </p>

    </div>
  );
}