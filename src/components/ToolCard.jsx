import React from 'react';
import { Rocket, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ToolCard({ tool, onDeploy, onLaunch, status }) {
  const isDeploying = status === 'deploying';
  const isReady = status === 'ready';

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(34,211,238,0.15)' }}
      className="group relative rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 border border-cyan-400/30 grid place-items-center">
            {tool.icon}
          </div>
          <div>
            <h3 className="text-white font-semibold">{tool.name}</h3>
            <p className="text-sm text-white/60">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={onDeploy}
          disabled={isDeploying}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm border transition ${
            isReady
              ? 'border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10'
              : 'border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10'
          } ${isDeploying ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <Rocket className="h-4 w-4" />
          {isReady ? 'Redeploy' : isDeploying ? 'Deploying…' : 'Deploy'}
        </button>
        <button
          onClick={onLaunch}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm border transition ${
            isReady
              ? 'border-indigo-400/40 text-indigo-300 hover:bg-indigo-400/10'
              : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Play className="h-4 w-4" />
          Launch
        </button>
        <div className="ml-auto text-xs text-white/60">
          Status: {isDeploying ? 'Deploying' : isReady ? 'Ready' : 'Idle'}
        </div>
      </div>

      {isDeploying && (
        <div className="mt-4">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '10%' }}
              animate={{ width: ['20%', '60%', '85%'] }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400"
            />
          </div>
          <p className="mt-2 text-xs text-white/50">Initializing containers, applying IaC, provisioning service mesh…</p>
        </div>
      )}
    </motion.div>
  );
}
