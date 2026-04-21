export default function FeatureValues({ features }) {
  if (!features) return null;

  return (
    <div className="glass p-5 rounded-2xl border border-white/20 h-full flex flex-col justify-between">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-center mb-4">
        📊 Feature's Breakdown
      </h2>

      {/* VALUES GRID */}
      <div className="grid grid-cols-2 gap-3 text-center flex-1">

        <FeatureBox label="Energy" value={features.energy} color="text-blue-400" />
        <FeatureBox label="Centroid" value={features.spectral_centroid} color="text-purple-400" />
        <FeatureBox label="ZCR" value={features.zcr} color="text-pink-400" />
        <FeatureBox label="Rolloff" value={features.rolloff} color="text-yellow-400" />
        <FeatureBox label="Bandwidth" value={features.bandwidth} color="text-green-400" />
        <FeatureBox label="MFCC" value={features.mfcc} color="text-cyan-400" />

      </div>

      {/* 🧠 EXPLANATION SECTION */}
      <div className="mt-4 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-gray-400 leading-relaxed">

        <p className="text-center font-medium text-gray-300 mb-2">
          What do these mean?
        </p>

        <ul className="space-y-1 text-[11px]">
          <li>• <span className="text-blue-400">Energy</span>: Loudness of the audio signal</li>
          <li>• <span className="text-purple-400">Centroid</span>: Brightness (high freq vs low freq)</li>
          <li>• <span className="text-pink-400">ZCR</span>: Signal noisiness / abrupt changes</li>
          <li>• <span className="text-yellow-400">Rolloff</span>: Frequency distribution cutoff</li>
          <li>• <span className="text-green-400">Bandwidth</span>: Spread of frequencies</li>
          <li>• <span className="text-cyan-400">MFCC</span>: Voice characteristics (human vs synthetic)</li>
        </ul>

      </div>

    </div>
  );
}


/* 🔹 FEATURE BOX */
function FeatureBox({ label, value, color }) {
  return (
    <div className="bg-white/5 p-3 rounded-xl border border-white/10">

      {/* LABEL */}
      <p className={`text-sm font-semibold mb-1 ${color}`}>
        {label}
      </p>

      {/* VALUE */}
      <p className="text-base font-bold text-white">
        {typeof value === "number" ? value.toFixed(2) : value}
      </p>

    </div>
  );
}