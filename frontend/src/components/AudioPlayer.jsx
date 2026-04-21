import { useRef, useState } from "react";

export default function AudioPlayer({ audioPath, segments }) {
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  if (!audioPath) return null;

  const audioUrl = `http://127.0.0.1:8000/${encodeURIComponent(audioPath)}`;

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const jumpTo = (time) => {
    audioRef.current.currentTime = time;
    audioRef.current.play();
  };

  // 🔥 ACTIVE SEGMENT CHECK
  const isActive = (seg) => {
    return currentTime >= seg.start && currentTime <= seg.end;
  };

  return (
    <div className="w-full glass p-4 rounded-2xl border border-white/20 h-full flex flex-col justify-between">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-center mb-2">
        🎧 Audio Timeline
      </h2>

      {/* AUDIO PLAYER */}
      <audio
        ref={audioRef}
        controls
        src={audioUrl}
        className="w-full mb-2"
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      />

      {/* TIMELINE */}
      <div className="relative w-full h-2 bg-gray-700 rounded-full mb-3 overflow-hidden">

        {/* PROGRESS */}
        <div
          className="absolute top-0 left-0 h-2 bg-blue-500"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />

        {/* SEGMENTS */}
        {(segments || []).slice(0, 3).map((seg, i) => {
          const left = (seg.start / duration) * 100;
          const width = ((seg.end - seg.start) / duration) * 100;

          return (
            <div
              key={i}
              onClick={() => jumpTo(seg.start)}
              className={`absolute top-0 h-2 cursor-pointer transition ${
                isActive(seg)
                  ? "bg-red-400 shadow-[0_0_6px_red]" // 🔥 ACTIVE GLOW
                  : "bg-red-500/70 hover:bg-red-500"
              }`}
              style={{
                left: `${left}%`,
                width: `${width}%`,
              }}
            />
          );
        })}
      </div>

      {/* TIME */}
      <div className="flex justify-between text-xs text-gray-400 mb-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* SEGMENT LIST */}
      <div>
        <h3 className="text-xs text-gray-400 mb-2 text-center">
          ⚠️ Top Suspicious Segments
        </h3>

        {segments && segments.length > 0 ? (
          <div className="space-y-1">
            {segments.slice(0, 3).map((seg, i) => (
              <div
                key={i}
                onClick={() => jumpTo(seg.start)}
                className={`p-1 rounded-md text-xs text-center cursor-pointer transition ${
                  isActive(seg)
                    ? "bg-red-500/30 border border-red-400"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                {formatTime(seg.start)} – {formatTime(seg.end)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xs">
            No suspicious segments
          </p>
        )}
      </div>

    </div>
  );
}