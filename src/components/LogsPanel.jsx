import React, { useEffect, useRef } from 'react';

export default function LogsPanel({ logs, open, onClear }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [logs, open]);

  return (
    <div className={`fixed right-4 bottom-4 z-30 w-[92vw] md:w-[520px] max-h-[50vh] rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-transform ${
      open ? 'translate-y-0' : 'translate-y-[120%]'
    }`}>
      <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 backdrop-blur p-3 flex items-center justify-between">
        <div className="text-white/80 text-sm">Live Deployment Logs</div>
        <div className="flex items-center gap-2">
          <button onClick={onClear} className="text-xs text-white/60 hover:text-white">Clear</button>
          <span className="text-[10px] text-white/40">IaC · Pods · Health</span>
        </div>
      </div>
      <div ref={ref} className="bg-black/80 text-cyan-200/80 font-mono text-xs p-3 space-y-1 overflow-auto" style={{ backdropFilter: 'blur(6px)' }}>
        {logs.length === 0 ? (
          <div className="text-white/40">No logs yet. Trigger a deployment to stream output…</div>
        ) : (
          logs.map((l, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              <span className="text-cyan-400">{l.time}</span> — {l.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
