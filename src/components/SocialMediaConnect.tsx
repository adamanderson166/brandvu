import React, { useState } from 'react';
import { Instagram, Youtube, Facebook, Music, Link, ExternalLink, RefreshCw, TrendingUp, Users, Heart, MessageCircle, Share2 } from 'lucide-react';

type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'spotify';

interface SocialAccount {
  platform: SocialPlatform;
  username: string;
  isConnected: boolean;
  isApiConnected: boolean;
  metrics: {
    followers: number;
    posts: number;
    avgLikes: number;
    avgComments: number;
    avgViews?: number;
    engagement: number;
  };
  recentPosts: Array<{
    id: string;
    caption: string;
    likes: number;
    comments: number;
    views?: number;
    timestamp: number;
  }>;
}

const SocialMediaConnect: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      platform: 'instagram',
      username: '@fitness_alex',
      isConnected: true,
      isApiConnected: false,
      metrics: {
        followers: 12450,
        posts: 156,
        avgLikes: 890,
        avgComments: 45,
        engagement: 7.5
      },
      recentPosts: [
        { id: '1', caption: 'Morning workout routine 💪', likes: 1200, comments: 89, timestamp: Date.now() - 86400000 },
        { id: '2', caption: 'Healthy meal prep ideas 🥗', likes: 980, comments: 67, timestamp: Date.now() - 172800000 },
        { id: '3', caption: 'Weekend hike adventures 🏔️', likes: 1450, comments: 123, timestamp: Date.now() - 259200000 }
      ]
    },
    {
      platform: 'youtube',
      username: 'FitnessAlex',
      isConnected: true,
      isApiConnected: true,
      metrics: {
        followers: 8900,
        posts: 89,
        avgLikes: 450,
        avgComments: 23,
        avgViews: 12000,
        engagement: 5.3
      },
      recentPosts: [
        { id: '1', caption: 'Full Body HIIT Workout', likes: 520, comments: 34, views: 15800, timestamp: Date.now() - 86400000 },
        { id: '2', caption: 'Meal Prep Sunday Routine', likes: 380, comments: 28, views: 9200, timestamp: Date.now() - 172800000 }
      ]
    },
    {
      platform: 'tiktok',
      username: '@fitness_alex',
      isConnected: false,
      isApiConnected: false,
      metrics: { followers: 0, posts: 0, avgLikes: 0, avgComments: 0, engagement: 0 },
      recentPosts: []
    }
  ]);

  const [isConnecting, setIsConnecting] = useState<SocialPlatform | null>(null);

  const platforms = {
    instagram: { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', priority: 1 },
    tiktok: { name: 'TikTok', icon: TikTok, color: 'from-black to-gray-800', priority: 2 },
    youtube: { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700', priority: 2 },
    facebook: { name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700', priority: 3 },
    spotify: { name: 'Spotify', icon: Music, color: 'from-green-500 to-green-600', priority: 3 }
  };

  const connectAccount = async (platform: SocialPlatform) => {
    setIsConnecting(platform);
    
    // Simulate API connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAccounts(prev => prev.map(acc => 
      acc.platform === platform 
        ? { ...acc, isConnected: true, isApiConnected: true }
        : acc
    ));
    
    setIsConnecting(null);
  };

  const connectViaApi = async (platform: SocialPlatform) => {
    setIsConnecting(platform);
    
    // Simulate API connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAccounts(prev => prev.map(acc => 
      acc.platform === platform 
        ? { ...acc, isApiConnected: true }
        : acc
    ));
    
    setIsConnecting(null);
  };

  const refreshMetrics = async (platform: SocialPlatform) => {
    // Simulate refreshing metrics
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real implementation, this would call the scraping/API endpoints
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Social Media Connect</h2>
        <p className="text-gray-600">Connect your social media accounts to showcase your reach and engagement to brands.</p>
      </div>

      {/* Platform Connection Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(platforms).map(([key, platform]) => {
          const account = accounts.find(acc => acc.platform === key);
          const IconComponent = platform.icon;
          
          return (
            <div key={key} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Priority #{platform.priority}</div>
                  {account?.isConnected && (
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Connected
                    </div>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
              
              {account?.isConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">@{account.username}</span>
                    {account.isApiConnected && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        API Connected
                      </span>
                    )}
                  </div>

                  {/* Metrics Display */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold">{account.metrics.followers.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold">{account.metrics.engagement}%</div>
                      <div className="text-xs text-gray-500">Engagement</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {!account.isApiConnected ? (
                      <button
                        onClick={() => connectViaApi(key as SocialPlatform)}
                        disabled={isConnecting === key}
                        className="btn-primary flex-1 text-sm py-2"
                      >
                        {isConnecting === key ? 'Connecting...' : 'Connect API'}
                      </button>
                    ) : (
                      <button
                        onClick={() => refreshMetrics(key as SocialPlatform)}
                        className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                    )}
                    <button className="btn-secondary text-sm py-2 px-3">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Connect your {platform.name} account to start tracking metrics.</p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => connectAccount(key as SocialPlatform)}
                      disabled={isConnecting === key}
                      className="btn-primary w-full text-sm py-2"
                    >
                      {isConnecting === key ? 'Connecting...' : 'Connect Account'}
                    </button>
                    
                    <button className="btn-secondary w-full text-sm py-2">
                      Paste Profile URL
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Posts Display */}
      <div className="card p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Posts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts
            .filter(acc => acc.isConnected && acc.recentPosts.length > 0)
            .flatMap(acc => 
              acc.recentPosts.map(post => ({
                ...post,
                platform: acc.platform,
                username: acc.username
              }))
            )
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 9)
            .map((post, index) => (
              <div key={`${post.platform}-${post.id}`} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${
                    platforms[post.platform as SocialPlatform].color
                  } flex items-center justify-center`}>
                    {React.createElement(platforms[post.platform as SocialPlatform].icon, { 
                      className: "w-3 h-3 text-white" 
                    })}
                  </div>
                  <span className="text-sm font-medium">{post.username}</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.caption}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments.toLocaleString()}
                    </span>
                    {post.views && (
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Data Strategy Info */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="font-semibold text-lg mb-3 text-blue-900">Data Strategy</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium text-blue-800 mb-2">Phase 1: Quick Wins</div>
            <p className="text-blue-700">Public scraping for basic metrics (likes, comments, followers)</p>
          </div>
          <div>
            <div className="font-medium text-blue-800 mb-2">Phase 2: Deep Analytics</div>
            <p className="text-blue-700">API connections for detailed insights and historical data</p>
          </div>
          <div>
            <div className="font-medium text-blue-800 mb-2">Phase 3: Advanced</div>
            <p className="text-blue-700">PulseMetric integration for comprehensive analytics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom TikTok icon component
const TikTok: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 4 15.64a6.34 6.34 0 0 0 10.48 4.94 6.34 6.34 0 0 0 5.11-13.89z"/>
  </svg>
);

export default SocialMediaConnect;
// Last updated: Thu Aug 21 10:57:15 MST 2025
