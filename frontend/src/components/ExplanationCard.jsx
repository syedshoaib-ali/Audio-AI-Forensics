export default function ExplanationCard({ ai }) {
  if (!ai) {
    return (
      <div className="glass p-4 rounded-2xl border border-white/20 h-full flex items-center justify-center">
        <p className="text-gray-400 text-sm">No AI analysis available</p>
      </div>
    );
  }

  // 🎨 COLOR LOGIC
  const getColor = () => {
    if (ai.severity?.includes("High")) return "text-red-400";
    if (ai.severity?.includes("Medium")) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="glass p-5 rounded-2xl border border-white/20 h-full flex flex-col justify-between">

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-center mb-3">
        🧠 AI Reasoning
      </h2>

      {/* SUMMARY */}
      <p className="text-sm text-gray-300 text-center mb-4 leading-relaxed">
        {ai.summary}
      </p>

      {/* SEVERITY */}
      <div className="text-center mb-4">
        <p className="text-xs text-gray-400">Severity</p>
        <p className={`font-semibold text-base ${getColor()}`}>
          {ai.severity}
        </p>
      </div>

      {/* ISSUES */}
      <div className="mb-4 flex-1 overflow-hidden">
        <p className="text-sm text-gray-400 mb-2 text-center">
          Key Observations
        </p>

        <ul className="space-y-2 text-sm text-gray-300 max-h-[110px] overflow-auto">
          {(ai.issues || []).slice(0, 3).map((item, i) => (
            <li key={i} className="bg-white/5 p-2 rounded-md">
              • {item}
            </li>
          ))}
        </ul>
      </div>

      {/* FINAL VERDICT */}
      <div className="text-center mt-2">
        <p className="text-xs text-gray-400">Final Verdict</p>
        <p className={`font-semibold text-base ${getColor()}`}>
          {ai.conclusion}
        </p>
      </div>

    </div>
  );
}