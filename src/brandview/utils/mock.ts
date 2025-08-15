import { Snapshot } from './storage';

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0);
}

export function generateSnapshot(seed: string, platform: string, ts: number = Date.now()): Snapshot {
  const base = hash(`${seed}:${platform}`);
  const jitter = (n: number, p: number) => Math.max(1, Math.round(n * (1 + ((base % 200 - 100) / 100) * p)));

  const followers = jitter(10000 + (base % 90000), 0.05);
  const posts = jitter(20 + (base % 40), 0.1);
  const avgLikes = jitter(300 + (base % 500), 0.15);
  const avgComments = jitter(20 + (base % 60), 0.2);
  const avgShares = jitter(10 + (base % 30), 0.25);
  const engagement = Math.max(1, Math.min(100, Math.round((avgLikes + avgComments * 3 + avgShares * 5) / followers * 1000)));

  return { ts, platform, followers, posts, avgLikes, avgComments, avgShares, engagement };
}

