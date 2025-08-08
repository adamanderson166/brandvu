export type Snapshot = {
  ts: number;
  platform: string;
  followers: number;
  posts: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  engagement: number; // 0-100
};

export type Contact = { id: string; email: string; name?: string };
export type Campaign = {
  id: string;
  createdAt: number;
  subject: string;
  body: string;
  contactIds: string[];
  metrics: { opens: number; clicks: number; replies: number };
};

const ns = (key: string) => `bv_${key}`;

export function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(ns(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(ns(key), JSON.stringify(value));
  } catch {}
}

export function getSnapshots(creatorId: string, platform: string): Snapshot[] {
  return read<Snapshot[]>(`snapshots_${creatorId}_${platform}`, []);
}

export function addSnapshot(creatorId: string, platform: string, snap: Snapshot): void {
  const arr = getSnapshots(creatorId, platform);
  arr.push(snap);
  write(`snapshots_${creatorId}_${platform}`, arr);
}

export function getContacts(): Contact[] {
  return read<Contact[]>('contacts', []);
}

export function setContacts(contacts: Contact[]): void {
  write('contacts', contacts);
}

export function getCampaigns(): Campaign[] {
  return read<Campaign[]>('campaigns', []);
}

export function setCampaigns(campaigns: Campaign[]): void {
  write('campaigns', campaigns);
}
