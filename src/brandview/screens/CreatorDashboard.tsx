import React, { useEffect, useState } from 'react';
import { addSnapshot, getSnapshots, Snapshot } from '../utils/storage';
import { generateSnapshot } from '../utils/mock';
import SocialMediaConnect from '../../components/SocialMediaConnect';
import LinkTree from '../../components/LinkTree';
import EmailManager from '../../components/EmailManager';
import LocalServices from '../../components/LocalServices';
import PulseMetricIntegration from '../../components/PulseMetricIntegration';

const COOLDOWN_SECONDS = 60 * 2; // 2 minutes
const TTL_SECONDS = 60 * 60; // 1 hour
const PLATFORMS = ['Instagram','TikTok','YouTube','Spotify'];

const CreatorDashboard: React.FC = () => {
  const creatorId = 'influencer-1';
  const [lastSync, setLastSync] = useState<number>(() => Date.now() - 12 * 60 * 1000);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);
  const [byPlatform, setByPlatform] = useState<Record<string, Snapshot[]>>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'social' | 'links' | 'email' | 'services' | 'analytics'>('overview');

  useEffect(() => {
    const t = setInterval(() => setCooldownLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const map: Record<string, Snapshot[]> = {};
    PLATFORMS.forEach(p => { map[p] = getSnapshots(creatorId, p); });
    setByPlatform(map);
  }, []);

  const refresh = async () => {
    if (cooldownLeft > 0) return;
    setCooldownLeft(COOLDOWN_SECONDS);
    await new Promise((r) => setTimeout(r, 500));
    // Generate and store a new snapshot per platform
    PLATFORMS.forEach(p => {
      const snap = generateSnapshot(creatorId, p, Date.now());
      addSnapshot(creatorId, p, snap);
    });
    // Reload
    const map: Record<string, Snapshot[]> = {};
    PLATFORMS.forEach(p => { map[p] = getSnapshots(creatorId, p); });
    setByPlatform(map);
    setLastSync(Date.now());
  };

  const ttlLeft = Math.max(0, TTL_SECONDS - Math.floor((Date.now() - lastSync) / 1000));
  const fmt = (s: number) => { const m = Math.floor(s / 60); const ss = s % 60; return m > 0 ? `${m}m ${ss}s` : `${ss}s`; };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Creator Dashboard</h1>
        <p className="text-gray-600">View normalized metrics and optimization suggestions.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="card p-4">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'social', label: 'Social Media', icon: '📱' },
            { id: 'links', label: 'LinkTree', icon: '🔗' },
            { id: 'email', label: 'Email Manager', icon: '📧' },
            { id: 'services', label: 'Local Services', icon: '📍' },
            { id: 'analytics', label: 'Analytics', icon: '📈' }
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
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

          {/* Per-platform tiles with tiny trend */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLATFORMS.map(p => {
              const snaps = byPlatform[p] || [];
              const latest = snaps[snaps.length - 1];
              return (
                <div key={p} className="card p-4">
                  <div className="font-semibold mb-1">{p}</div>
                  {latest ? (
                    <div>
                      <div className="text-sm text-gray-600">Followers</div>
                      <div className="text-xl font-bold">{latest.followers.toLocaleString()} <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs align-middle">Sample</span></div>
                      <div className="mt-3 text-xs text-gray-500">30d trend (followers)</div>
                      <div className="mt-1 h-10 bg-gray-100 rounded flex items-end gap-1 p-1">
                        {snaps.slice(-12).map((s, i) => (
                          <div key={i} className="flex-1 bg-primary-600 rounded" style={{ height: `${Math.max(5, Math.min(100, Math.round((s.followers / (latest.followers || 1)) * 100)))}%` }} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">No data yet. Refresh to generate sample metrics.</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Overall optimization, suggestions, learn teaser remain below */}
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
        </>
      )}

      {activeTab === 'social' && <SocialMediaConnect />}
      {activeTab === 'links' && <LinkTree />}
      {activeTab === 'email' && <EmailManager />}
      {activeTab === 'services' && <LocalServices />}
      {activeTab === 'analytics' && <PulseMetricIntegration />}
    </div>
  );
};

export default CreatorDashboard;
