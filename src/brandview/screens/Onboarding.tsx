import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple in-memory mock persistence for MVP
const session: any = (window as any).BrandViewSession || ((window as any).BrandViewSession = {});

type Role = 'creator' | 'brand';

const stepsByRole: Record<Role, string[]> = {
  creator: ['role', 'basics', 'niches', 'socials', 'preview', 'finish'],
  brand: ['role', 'basics', 'niches', 'preview', 'finish'],
};

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>(session.role || 'creator');
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [form, setForm] = useState<any>({
    displayName: session.displayName || '',
    bio: session.bio || '',
    timezone: session.timezone || 'UTC',
    niches: session.niches || [],
    socials: session.socials || [],
  });

  const steps = stepsByRole[role];
  const step = steps[stepIndex];

  const next = () => {
    const last = stepIndex >= steps.length - 1;
    if (last) {
      session.role = role;
      Object.assign(session, form);
      if (role === 'creator') navigate('/brandview/dashboard/creator');
      else navigate('/brandview/dashboard/brand');
      return;
    }
    setStepIndex(stepIndex + 1);
  };

  const back = () => {
    if (stepIndex === 0) {
      navigate('/brandview');
      return;
    }
    setStepIndex(stepIndex - 1);
  };

  const toggleNiche = (n: string) => {
    setForm((f: any) => ({
      ...f,
      niches: f.niches.includes(n) ? f.niches.filter((x: string) => x !== n) : [...f.niches, n],
    }));
  };

  const addSocial = (platform: string, value: string) => {
    setForm((f: any) => ({ ...f, socials: [...f.socials, { platform, value, status: 'Sample' }] }));
  };

  const nicheList = [
    'wellness', 'beauty', 'fitness', 'music', 'food', 'tech', 'fashion', 'gaming', 'travel', 'education',
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">Step {stepIndex + 1} of {steps.length}</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Onboarding</h1>

      {step === 'role' && (
        <div className="card p-6 space-y-4">
          <div className="font-semibold">Select your role</div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setRole('creator')} className={`p-4 rounded-xl border ${role==='creator'?'border-primary-500 bg-primary-50':'border-gray-200'}`}>Creator</button>
            <button onClick={() => setRole('brand')} className={`p-4 rounded-xl border ${role==='brand'?'border-primary-500 bg-primary-50':'border-gray-200'}`}>Brand</button>
          </div>
          <div className="flex justify-end">
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 'basics' && (
        <div className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Display name</label>
            <input className="input-field" value={form.displayName} onChange={e=>setForm({...form, displayName:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio (max 280)</label>
            <textarea className="input-field h-28" maxLength={280} value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <input className="input-field" value={form.timezone} onChange={e=>setForm({...form, timezone:e.target.value})} />
          </div>
          <div className="flex justify-between">
            <button onClick={back} className="btn-secondary">Back</button>
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 'niches' && (
        <div className="card p-6 space-y-4">
          <div className="font-semibold">Select niches</div>
          <div className="flex flex-wrap gap-2">
            {nicheList.map((n) => (
              <button key={n} onClick={()=>toggleNiche(n)} className={`px-3 py-1 rounded-full text-sm ${form.niches.includes(n)?'bg-primary-600 text-white':'bg-gray-100'}`}>{n}</button>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={back} className="btn-secondary">Back</button>
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 'socials' && role === 'creator' && (
        <div className="card p-6 space-y-4">
          <div className="font-semibold">Connect platforms</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <SocialAdd onAdd={addSocial} platform="Instagram" example="@handle or url" />
            <SocialAdd onAdd={addSocial} platform="TikTok" example="@handle or url" />
            <SocialAdd onAdd={addSocial} platform="YouTube" example="channel url" />
            <SocialAdd onAdd={addSocial} platform="Spotify" example="artist/profile url" />
          </div>
          <div>
            {form.socials.length === 0 ? (
              <div className="text-sm text-gray-600">No platforms connected yet.</div>
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {form.socials.map((s: any, i: number) => (
                  <li key={i}>{s.platform}: {s.value} <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Sample</span></li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-between">
            <button onClick={back} className="btn-secondary">Back</button>
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="card p-6 space-y-4">
          <div className="font-semibold">Preview</div>
          <div className="text-sm text-gray-700">Public metrics snapshot (sample) and initial score.</div>
          <ul className="list-disc pl-5 text-sm">
            <li>Followers: 12,450 <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Sample</span></li>
            <li>Avg likes: 420 <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Sample</span></li>
            <li>Engagement estimate: 4.1% <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">Sample</span></li>
            <li>Optimization score: 62/100</li>
          </ul>
          <div className="font-semibold">Top suggestions</div>
          <ul className="list-disc pl-5 text-sm">
            <li>Post 3x/week (impact: high)</li>
            <li>Improve hooks in first 3 seconds (impact: med)</li>
            <li>Add CTA in captions (impact: low)</li>
          </ul>
          <div className="flex justify-between">
            <button onClick={back} className="btn-secondary">Back</button>
            <button onClick={next} className="btn-primary">Continue</button>
          </div>
        </div>
      )}

      {step === 'finish' && (
        <div className="card p-6 space-y-4">
          <div className="text-lg font-semibold">All set!</div>
          <div className="text-gray-700">Go to your dashboard and continue with next best actions.</div>
          <div className="flex justify-end">
            <button onClick={next} className="btn-primary">Go to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

const SocialAdd: React.FC<{ platform: string; example: string; onAdd: (p: string, v: string) => void }> = ({ platform, example, onAdd }) => {
  const [value, setValue] = useState('');
  return (
    <div className="p-3 border rounded-xl">
      <div className="text-sm font-medium mb-1">{platform}</div>
      <input className="input-field" placeholder={example} value={value} onChange={e=>setValue(e.target.value)} />
      <div className="mt-2 text-right">
        <button className="btn-secondary" onClick={() => { if(value.trim()){ onAdd(platform, value.trim()); setValue(''); }}}>Add</button>
      </div>
    </div>
  );
};

export default Onboarding;
