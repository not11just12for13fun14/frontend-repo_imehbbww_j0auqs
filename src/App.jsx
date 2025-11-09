import React, { useMemo, useState } from 'react';
import { Gauge, BarChart3, PieChart, Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolCard from './components/ToolCard';
import LogsPanel from './components/LogsPanel';

function now() {
  const d = new Date();
  return d.toLocaleTimeString();
}

export default function App() {
  const [env, setEnv] = useState('dev');
  const [logs, setLogs] = useState([]);
  const [logsOpen, setLogsOpen] = useState(false);
  const [statuses, setStatuses] = useState({}); // { [toolId]: 'idle' | 'deploying' | 'ready' }

  const tools = useMemo(
    () => [
      {
        id: 'grafana',
        name: 'Grafana',
        description: 'Observability, dashboards, and alerting.',
        icon: <Gauge className="h-5 w-5 text-cyan-300" />,
      },
      {
        id: 'qlik',
        name: 'Qlik',
        description: 'Interactive analytics and guided insights.',
        icon: <BarChart3 className="h-5 w-5 text-cyan-300" />,
      },
      {
        id: 'tableau',
        name: 'Tableau',
        description: 'Visual analytics for fast decision-making.',
        icon: <PieChart className="h-5 w-5 text-cyan-300" />,
      },
      {
        id: 'kibana',
        name: 'Kibana',
        description: 'Search, logs, and SIEM for mission data.',
        icon: <Activity className="h-5 w-5 text-cyan-300" />,
      },
    ],
    []
  );

  const pushLog = (text) => setLogs((l) => [...l, { time: now(), text }]);

  const simulateDeploy = (toolId, toolName) => {
    setLogsOpen(true);
    setStatuses((s) => ({ ...s, [toolId]: 'deploying' }));
    setLogs((_) => []);

    pushLog(`[${env.toUpperCase()}] Initializing infrastructure-as-code for ${toolName}…`);
    setTimeout(() => pushLog('• Validating policy sets and RBAC… OK'), 500);
    setTimeout(() => pushLog('• Provisioning namespace and service account… OK'), 900);
    setTimeout(() => pushLog('• Applying Helm chart and values…'), 1300);
    setTimeout(() => pushLog('• Pulling container images… 60%'), 1700);
    setTimeout(() => pushLog('• Starting pods… 2/3 Ready'), 2200);
    setTimeout(() => pushLog('• Configuring ingress + TLS… OK'), 2700);
    setTimeout(() => pushLog('• Health checks passing. System warm.'), 3200);

    setTimeout(() => {
      setStatuses((s) => ({ ...s, [toolId]: 'ready' }));
      pushLog(`✔ ${toolName} is Ready in ${env.toUpperCase()}`);
    }, 3600);
  };

  const handleLaunch = (toolId, toolName) => {
    const state = statuses[toolId];
    if (state !== 'ready') {
      setLogsOpen(true);
      pushLog(`Attempted to launch ${toolName} before ready. Waiting for readiness…`);
      return;
    }
    // For demo: open a themed preview URL placeholder per env
    const url = `https://demo.${env}.mission/${toolId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    pushLog(`Launching ${toolName} at ${url}`);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -inset-[30%] opacity-20 blur-3xl bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-indigo-500 to-cyan-500" />
      </div>

      <Navbar env={env} setEnv={setEnv} />
      <Hero />

      <main className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight">Mission Tools</h2>
              <button
                onClick={() => setLogsOpen((o) => !o)}
                className="text-xs rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/10"
              >
                {logsOpen ? 'Hide Logs' : 'Show Logs'}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tools.map((t) => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  status={statuses[t.id] || 'idle'}
                  onDeploy={() => simulateDeploy(t.id, t.name)}
                  onLaunch={() => handleLaunch(t.id, t.name)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-white/50 flex items-center justify-between">
          <span>Defense Tech • Mission Control UI</span>
          <span className="text-white/40">Environment: <span className="text-cyan-300">{env.toUpperCase()}</span></span>
        </div>
      </footer>

      <LogsPanel logs={logs} open={logsOpen} onClear={() => setLogs([])} />
    </div>
  );
}
