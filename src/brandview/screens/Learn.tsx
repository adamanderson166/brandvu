import React, { useMemo, useState } from 'react';

type Module = { id: string; title: string; level: 'beginner'|'intermediate'|'advanced'; type: 'video'|'article'|'checklist'; duration: string; url?: string; };

const seed: Module[] = [
  { id: 'm1', title: 'Crafting high-retention short-form intros', level: 'beginner', type: 'video', duration: '7 min' },
  { id: 'm2', title: 'Writing CTAs that convert', level: 'intermediate', type: 'article', duration: '6 min' },
  { id: 'm3', title: 'Content calendar: cadence and themes', level: 'beginner', type: 'checklist', duration: '5 min' },
];

const Learn: React.FC = () => {
  const [level, setLevel] = useState<'all'|Module['level']>('all');
  const [type, setType] = useState<'all'|Module['type']>('all');

  const modules = useMemo(() => seed.filter(m => (level==='all'||m.level===level) && (type==='all'||m.type===type)), [level, type]);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Learn</h1>
        <p className="text-gray-600">Curriculum stubs — plug in real content later. Supports external links.</p>
      </div>

      <div className="card p-4 grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Level</label>
          <select className="input-field" value={level} onChange={e=>setLevel(e.target.value as any)}>
            <option value="all">All</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Type</label>
          <select className="input-field" value={type} onChange={e=>setType(e.target.value as any)}>
            <option value="all">All</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="checklist">Checklist</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {modules.map(m => (
          <div key={m.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-gray-600 capitalize">{m.level} • {m.type} • {m.duration}</div>
              </div>
              <button className="btn-secondary">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
