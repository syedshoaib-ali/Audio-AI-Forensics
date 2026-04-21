import ConfidenceChart from "./ConfidenceChart";

export default function InsightPanel({ result }) {
  if (!result) return null;

  const confidence = Number(result.confidence ?? 0);
  const status = result.final_label;

  const cnn = result.cnn_score ?? 0;
  const feature = result.feature_score ?? 0;

  // 🎨 COLOR ONLY FOR FINAL RESULT
  const getColor = () => {
    if (status === "Fake") return "red";
    if (status === "Suspicious") return "yellow";
    return "green";
  };

  const color = getColor();

  const textColor =
    color === "red"
      ? "text-red-400"
      : color === "yellow"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="w-full glass p-8 md:p-10 rounded-3xl border border-white/20">

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

        {/* 🟢 CENTER → FINAL RESULT */}
        <div className="flex flex-col items-center order-1 md:order-2">

          <div className="scale-110 md:scale-125">
            <ConfidenceChart
              value={confidence}
              color={color}   // ✅ only here
            />
          </div>

          <p className={`text-xl font-semibold mt-4 text-center ${textColor}`}>
            {status === "Fake"
              ? "⚠️ Fake Audio"
              : status === "Suspicious"
              ? "⚠️ Suspicious Audio"
              : "✅ Genuine Audio"}
          </p>

        </div>

        {/* 🟣 FEATURE (UNCHANGED COLOR) */}
        <div className="text-center order-2 md:order-3">

          <p className="text-sm text-gray-400 mb-2">
            Feature Analysis
          </p>

          <p className="text-xl font-semibold text-purple-400 mb-2">
            {feature.toFixed(2)}%
          </p>

          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${feature}%` }}
            />
          </div>

        </div>

        {/* 🔵 CNN (UNCHANGED COLOR) */}
        <div className="text-center order-3 md:order-1">

          <p className="text-sm text-gray-400 mb-2">
            CNN Model
          </p>

          <p className="text-xl font-semibold text-blue-400 mb-2">
            {cnn.toFixed(2)}%
          </p>

          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${cnn}%` }}
            />
          </div>

        </div>

      </div>

    </div>
  );
}