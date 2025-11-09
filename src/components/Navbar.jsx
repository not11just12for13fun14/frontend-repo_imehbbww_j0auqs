import React from 'react';
import { Rocket, Settings } from 'lucide-react';

const environments = [
  { key: 'dev', label: 'Dev' },
  { key: 'staging', label: 'Staging' },
  { key: 'prod', label: 'Prod' },
];

export default function Navbar({ env, setEnv }) {
  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 border border-cyan-400/30 grid place-items-center shadow-[0_0_20px_rgba(34,211,238,0.35)]">
            <Rocket className="h-5 w-5 text-cyan-300" />
          </div>
          <div className="leading-tight">
            <div className="text-cyan-300 tracking-wider text-xs uppercase">DTRA</div>
            <div className="text-white font-semibold">Mission App Store</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-xs text-white/50">Environment</div>
          <div className="inline-flex rounded-md border border-white/10 bg-white/5 p-1">
            {environments.map((e) => (
              <button
                key={e.key}
                onClick={() => setEnv(e.key)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  env === e.key
                    ? 'bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 text-white border border-white/10'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>

          <button className="h-9 w-9 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition grid place-items-center">
            <Settings className="h-4 w-4 text-white/70" />
          </button>
        </div>
      </div>
    </header>
  );
}
