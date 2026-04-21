export default function Spectrogram({ imagePath }) {
  if (!imagePath) return null;

  const imageUrl = `http://127.0.0.1:8000/${imagePath}`;

  return (
    <div className="w-full glass p-6 md:p-7 rounded-2xl border border-white/20">

      {/* HEADER */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        Audio Spectrogram Analysis
      </h2>

      {/* DESCRIPTION */}
      <div className="text-sm text-gray-400 text-center mb-6 max-w-2xl mx-auto">
        A spectrogram visualizes how audio frequencies evolve over time. 
        Natural audio typically shows smooth and continuous frequency transitions, 
        while manipulated or AI-generated audio may introduce irregular spikes, 
        abrupt frequency changes, or unnatural patterns.
      </div>

      {/* IMAGE (FIXED PROPORTION) */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2 max-w-4xl mx-auto">
        <img
          src={imageUrl}
          alt="Spectrogram"
          className="w-full h-[260px] md:h-[320px] object-contain rounded-lg"
        />
      </div>

      {/* INFO GRID */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm max-w-4xl mx-auto">

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 mb-1">What you're seeing</p>
          <p className="font-medium">
            Time (X-axis) vs Frequency (Y-axis) with intensity shown by color.
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <p className="text-gray-400 mb-1">Why it matters</p>
          <p className="font-medium">
            Inconsistent frequency energy or unnatural transitions may indicate tampering.
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10 md:col-span-2">
          <p className="text-gray-400 mb-1">AI Insight</p>
          <p className="font-medium">
            The model uses spectral features like energy distribution and frequency centroids 
            to detect anomalies that are difficult to notice in raw audio.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Generated using signal processing techniques (Librosa)
      </p>

    </div>
  );
}