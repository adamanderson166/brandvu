import React, { useCallback, useEffect, useMemo, useState } from 'react';

type Candidate = {
  id: string;
  name: string;
  avatar?: string;
  niches: string[];
  followers: number;
  engagement: number; // 0-100 composite
  rationale: string;
};

type ShortlistEntry = { id: string; note: string; addedAt: number };

const sampleCandidates: Candidate[] = [
  { id: 'c1', name: 'Alex Rivera', niches: ['fitness','wellness'], followers: 12450, engagement: 62, rationale: 'Strong consistency, wellness overlap' },
  { id: 'c2', name: 'Mia Chen', niches: ['beauty','fashion'], followers: 50320, engagement: 71, rationale: 'High avg likes, fashion overlap' },
  { id: 'c3', name: 'Sam Park', niches: ['tech','gaming'], followers: 18200, engagement: 58, rationale: 'Rising engagement; gaming overlap' },
];

const BrandDashboard: React.FC = () => {
  const [minFollowers, setMinFollowers] = useState(0);
  const [minEngagement, setMinEngagement] = useState(0);
  const [nichesDesired, setNichesDesired] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>(() => {
    const s: any = (window as any).BrandViewSession;
    return s?.shortlist || [];
  });

  useEffect(() => {
    const s: any = (window as any).BrandViewSession || ((window as any).BrandViewSession = {});
    s.shortlist = shortlist;
  }, [shortlist]);

  const allNiches = ['wellness','beauty','fitness','music','food','tech','fashion','gaming','travel','education'];

  const score = useCallback((c: Candidate): number => {
    const overlap = nichesDesired.length === 0 ? 1 : c.niches.filter(n => nichesDesired.includes(n)).length / nichesDesired.length;
    let s = Math.round(0.6 * c.engagement + 40 * overlap);
    if (c.followers < minFollowers) s -= 25;
    if (c.engagement < minEngagement) s -= 25;
    return Math.max(0, Math.min(100, s));
  }, [nichesDesired, minFollowers, minEngagement]);

  const candidates = useMemo(() => {
    return sampleCandidates
      .map(c => ({ ...c, match: score(c) }))
      .filter(c => c.followers >= minFollowers && c.engagement >= minEngagement)
      .sort((a,b) => (b as any).match - (a as any).match);
  }, [minFollowers, minEngagement, score]);

  const toggleNiche = (n: string) => {
    setNichesDesired((prev) => prev.includes(n) ? prev.filter(x=>x!==n) : [...prev, n]);
  };

  const addToShortlist = (id: string) => {
    setShortlist((s) => (s.find(e=>e.id===id) ? s : [...s, { id, note: '', addedAt: Date.now() }]));
  };

  const removeFromShortlist = (id: string) => {
    setShortlist((s) => s.filter(x => x.id !== id));
  };

  const updateNote = (id: string, note: string) => {
    setShortlist((s) => s.map(e => e.id===id ? { ...e, note } : e));
  };

  const getById = (id: string) => candidates.find(x => x.id === id) || sampleCandidates.find(x=>x.id===id)!;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Brand Dashboard</h1>
        <p className="text-gray-600">Filter creators, browse/swipe, and manage your shortlist.</p>
      </div>

      <div className="card p-4 space-y-4">
        <div className="font-semibold">Filters</div>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Minimum followers</label>
            <input type="number" className="input-field" value={minFollowers} onChange={e=>setMinFollowers(Number(e.target.value)||0)} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Minimum engagement (0-100)</label>
            <input type="number" className="input-field" value={minEngagement} onChange={e=>setMinEngagement(Number(e.target.value)||0)} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Niches desired</label>
            <div className="flex flex-wrap gap-2">
              {allNiches.map(n => (
                <button key={n} onClick={()=>toggleNiche(n)} className={`px-3 py-1 rounded-full text-sm ${nichesDesired.includes(n)?'bg-primary-600 text-white':'bg-gray-100'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          {candidates.length === 0 && (
            <div className="card p-4 text-sm text-gray-700">No candidates. Try relaxing filters or reset.</div>
          )}
          {candidates.map(c => (
            <div key={c.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-600">niches: {c.niches.join(', ')}</div>
                  <div className="text-sm text-gray-600">followers: {c.followers.toLocaleString()} • engagement: {c.engagement}</div>
                  <div className="text-sm text-gray-500">{c.rationale}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{(c as any).match}</div>
                  <div className="text-xs text-gray-500">match score</div>
                  <div className="mt-2">
                    <button className="btn-primary" onClick={()=>addToShortlist(c.id)}>Accept</button>
                    <button className="btn-secondary ml-2">Pass</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="font-semibold">Shortlist</div>
          {shortlist.length === 0 && <div className="card p-4 text-sm text-gray-600">No creators shortlisted yet.</div>}
          {shortlist.map(entry => {
            const c = getById(entry.id);
            return (
              <div key={entry.id} className="card p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-gray-500">added {new Date(entry.addedAt).toLocaleString()}</div>
                  </div>
                  <div>
                    <button className="btn-secondary" onClick={()=>removeFromShortlist(entry.id)}>Remove</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Notes</label>
                  <textarea className="input-field h-20" value={entry.note} onChange={e=>updateNote(entry.id, e.target.value)} placeholder="Add context or next steps" />
                </div>
                <div className="text-xs text-gray-500">Chat (prototype only — messaging not yet live)</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandDashboard;
