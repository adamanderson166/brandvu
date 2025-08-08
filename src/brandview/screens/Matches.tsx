import React, { useMemo, useState } from 'react';

type ShortlistEntry = { id: string; note: string; addedAt: number };

type ChatMessage = { from: 'brand' | 'creator'; text: string; ts: number };

function getSession() {
  return (window as any).BrandViewSession || ((window as any).BrandViewSession = {});
}

const Matches: React.FC = () => {
  const s = getSession();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const shortlist: ShortlistEntry[] = s.shortlist || [];

  const messagesKey = (id: string) => `chat_${id}`;
  const getMessages = (id: string): ChatMessage[] => s[messagesKey(id)] || [];
  const setMessages = (id: string, msgs: ChatMessage[]) => { s[messagesKey(id)] = msgs; };

  const [draft, setDraft] = useState('');
  const msgs = useMemo(() => (selectedId ? getMessages(selectedId) : []), [selectedId]);

  const send = () => {
    if (!selectedId || !draft.trim()) return;
    const next = [...getMessages(selectedId), { from: 'brand', text: draft.trim(), ts: Date.now() }];
    setMessages(selectedId, next);
    setDraft('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Matches & Shortlist</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card p-4">
          <div className="font-semibold mb-2">Shortlisted creators</div>
          {shortlist.length === 0 && (
            <div className="text-sm text-gray-600">No creators shortlisted. Add some from Brand Dashboard.</div>
          )}
          <div className="space-y-2 max-h-80 overflow-auto">
            {shortlist.map(e => (
              <button key={e.id} onClick={()=>setSelectedId(e.id)} className={`w-full text-left p-3 rounded-lg border ${selectedId===e.id?'border-primary-400 bg-primary-50':'border-gray-200 hover:bg-gray-50'}`}>
                <div className="font-medium">{e.id}</div>
                <div className="text-xs text-gray-500">added {new Date(e.addedAt).toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 card p-4 flex flex-col h-[480px]">
          {!selectedId ? (
            <div className="text-sm text-gray-600">Select a shortlisted creator to open chat.</div>
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-2">Prototype only — messaging not yet live.</div>
              <div className="flex-1 overflow-auto space-y-2">
                {msgs.map((m, i) => (
                  <div key={i} className={`max-w-xs p-2 rounded ${m.from==='brand'?'ml-auto bg-primary-600 text-white':'bg-gray-100 text-gray-900'}`}>
                    <div className="text-xs text-white/70">{new Date(m.ts).toLocaleTimeString()}</div>
                    <div>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input className="input-field flex-1" placeholder="Type a message…" value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} />
                <button className="btn-primary" onClick={send}>Send</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matches;
