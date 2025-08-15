import React, { useMemo, useState } from 'react';
import { flags } from '../../config/flags';
import { Contact, Campaign, getContacts, setContacts, getCampaigns, setCampaigns } from '../utils/storage';

const EmailMVP: React.FC = () => {
  const [contacts, setContactsState] = useState<Contact[]>(() => getContacts());
  const [campaigns, setCampaignsState] = useState<Campaign[]>(() => getCampaigns());

  const [importText, setImportText] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  };

  const importCSV = () => {
    const lines = importText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const next: Contact[] = [...contacts];
    lines.forEach((line, idx) => {
      const [email, name] = line.split(',').map(s => s?.trim());
      if (email && !next.find(c=>c.email===email)) {
        next.push({ id: `ct_${Date.now()}_${idx}`, email, name });
      }
    });
    setContactsState(next);
    setContacts(next);
    setImportText('');
  };

  const sendMock = () => {
    if (!subject.trim() || !body.trim() || selectedIds.length === 0) return;
    const camp: Campaign = {
      id: `ca_${Date.now()}`,
      createdAt: Date.now(),
      subject, body,
      contactIds: selectedIds,
      metrics: { opens: 0, clicks: 0, replies: 0 },
    };
    const upd = [camp, ...campaigns];
    setCampaignsState(upd);
    setCampaigns(upd);
    // simulate engagement over time
    setTimeout(() => bumpMetrics(camp.id, 5, 1, 0), 1000);
    setTimeout(() => bumpMetrics(camp.id, 12, 3, 1), 3000);
    setTimeout(() => bumpMetrics(camp.id, 20, 5, 2), 6000);
    setSubject(''); setBody(''); setSelectedIds([]);
  };

  const bumpMetrics = (id: string, opens: number, clicks: number, replies: number) => {
    const arr = getCampaigns();
    const i = arr.findIndex(c=>c.id===id);
    if (i>=0) {
      arr[i] = { ...arr[i], metrics: {
        opens: arr[i].metrics.opens + opens,
        clicks: arr[i].metrics.clicks + clicks,
        replies: arr[i].metrics.replies + replies,
      }};
      setCampaigns(arr);
      setCampaignsState(arr);
    }
  };

  const totalSelected = selectedIds.length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Email Management (MVP)</h1>
        <p className="text-gray-600">Prototype sending and engagement tracking. For demo purposes only.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 card p-4">
          <div className="font-semibold mb-2">Contacts</div>
          <textarea className="input-field h-24" placeholder="email,name per line" value={importText} onChange={e=>setImportText(e.target.value)} />
          <button className="btn-secondary mt-2" onClick={importCSV}>Import CSV</button>
          <div className="mt-3 max-h-64 overflow-auto space-y-1">
            {contacts.map(c => (
              <label key={c.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={selectedIds.includes(c.id)} onChange={()=>toggleSelect(c.id)} />
                <span>{c.email}{c.name ? ` • ${c.name}`:''}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 card p-4">
          <div className="font-semibold mb-2">Compose Campaign</div>
          <input className="input-field mb-2" placeholder="Subject" value={subject} onChange={e=>setSubject(e.target.value)} />
          <textarea className="input-field h-40" placeholder="Body" value={body} onChange={e=>setBody(e.target.value)} />
          <div className="mt-2 text-sm text-gray-600">Selected recipients: {totalSelected}</div>
          <button className="btn-primary mt-2" onClick={sendMock} disabled={totalSelected===0 || !subject.trim() || !body.trim()}>Send (Mock)</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="font-semibold mb-3">Campaigns</div>
        <div className="grid md:grid-cols-2 gap-3">
          {campaigns.map(c => (
            <div key={c.id} className="border rounded-xl p-3">
              <div className="font-medium">{c.subject}</div>
              <div className="text-xs text-gray-500 mb-2">{new Date(c.createdAt).toLocaleString()}</div>
              <div className="text-sm text-gray-700 mb-2 line-clamp-2">{c.body}</div>
              <div className="text-xs text-gray-600">Opens: {c.metrics.opens} • Clicks: {c.metrics.clicks} • Replies: {c.metrics.replies}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailMVP;

