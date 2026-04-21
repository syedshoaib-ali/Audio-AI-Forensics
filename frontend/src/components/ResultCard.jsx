import ConfidenceChart from "./ConfidenceChart";

export default function ResultCard({ result }) {
  if (!result || result.error) {
    return (
      <div className="bg-red-500/20 border border-red-500 p-4 rounded-xl mt-4 text-center">
        <p className="text-red-300">⚠️ Failed to analyze audio</p>
      </div>
    );
  }

  const confidence = Number(result.confidence ?? 0);
  const status = result.final_label;

  const isFake = status === "Fake";
  const isSuspicious = status === "Suspicious";

  return (
    <div className="w-full max-w-2xl mx-auto glass p-6 md:p-8 rounded-3xl shadow-2xl mt-6 border border-white/20">

      <h2 className="text-2xl font-semibold text-center mb-6">
        AI Analysis Result
      </h2>

      <div className="flex justify-center mb-6">
        <ConfidenceChart value={confidence} status={status} />
      </div>

      <div className="text-center mb-6">
        <p className="text-xl font-semibold">
          {isFake
            ? "⚠️ Fake Audio Detected"
            : isSuspicious
            ? "⚠️ Suspicious Audio"
            : "✅ Genuine Audio"}
        </p>
      </div>

      {/* MODEL SCORES */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mb-6">

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <p className="text-gray-400 text-xs">CNN Score</p>
          <p className="font-semibold text-blue-400">
            {result.cnn_score}%
          </p>
        </div>

        <div className="bg-white/5 p-3 rounded-xl border border-white/10">
          <p className="text-gray-400 text-xs">Feature Score</p>
          <p className="font-semibold text-purple-400">
            {result.feature_score}%
          </p>
        </div>

      </div>

    </div>
  );
}
