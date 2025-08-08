import React, { useEffect, useState } from 'react';

const COOLDOWN_SECONDS = 60 * 2; // 2 minutes
const TTL_SECONDS = 60 * 60; // 1 hour

const CreatorDashboard: React.FC = () => {
  const [lastSync, setLastSync] = useState<number>(() => Date.now() - 12 * 60 * 1000);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCooldownLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const refresh = async () => {
    if (cooldownLeft > 0) return;
    // Simulate fetch delay
    setCooldownLeft(COOLDOWN_SECONDS);
    await new Promise((r) => setTimeout(r, 800));
    setLastSync(Date.now());
  };

  const ttlLeft = Math.max(0, TTL_SECONDS - Math.floor((Date.now() - lastSync) / 1000));

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return m > 0 ? `${m}m ${ss}s` : `${ss}s`;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <p className="text-gray-600">View normalized metrics and optimization suggestions.</p>
      </div>

      <div className="flex items-center justify-between card p-4">
        <div>
          <div className="font-semibold">Test Influencer</div>
          <div className="text-sm text-gray-600">niches: fitness, wellness</div>
        </div>
        <div className="text-sm text-gray-500">
          Last sync: {Math.floor((Date.now() - lastSync) / 60000)} min ago
          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Sample</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary" onClick={refresh} disabled={cooldownLeft > 0}>
            {cooldownLeft > 0 ? `Refresh in ${fmt(cooldownLeft)}` : 'Refresh metrics'}
          </button>
          <span className="text-xs text-gray-500">TTL: {fmt(ttlLeft)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Followers', value: '12,450' },
          { label: 'Avg Likes', value: '420' },
          { label: 'Avg Comments', value: '38' },
          { label: 'Avg Shares', value: '17' },
          { label: 'Posts (30d)', value: '22' },
          { label: 'Engagement', value: '4.1%' },
        ].map((m) => (
          <div key={m.label} className="card p-4">
            <div className="text-gray-600 text-sm mb-1">{m.label}</div>
            <div className="text-xl font-semibold">{m.value} <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs align-middle">Sample</span></div>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Optimization score</div>
          <div className="text-sm text-gray-500">Overall profile health</div>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div className="bg-green-500 h-3 rounded-full" style={{ width: '62%' }} />
        </div>
        <div className="text-sm text-gray-600 mt-2">62 / 100</div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-2">Suggestions</div>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Post 3x/week — impact: high</li>
          <li>Improve hooks in first 3 seconds — impact: medium</li>
          <li>Add CTA in captions — impact: low</li>
        </ul>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-2">Learn next</div>
        <div className="text-sm text-gray-700">Module: Crafting high-retention short-form intros (5–7 min)</div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
