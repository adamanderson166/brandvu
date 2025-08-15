import React, { useState } from 'react';
import { BarChart3, TrendingUp, Music, Play, Pause, SkipBack, SkipForward, Volume2, Clock, Calendar, Target, Zap, Lock, ExternalLink, ArrowRight } from 'lucide-react';

interface PulseMetricData {
  spotify: {
    isConnected: boolean;
    tokenExpiry: number;
    currentTrack?: {
      name: string;
      artist: string;
      album: string;
      duration: number;
      progress: number;
      isPlaying: boolean;
    };
    recentTracks: Array<{
      name: string;
      artist: string;
      playedAt: number;
      duration: number;
    }>;
    topTracks: Array<{
      name: string;
      artist: string;
      playCount: number;
      image: string;
    }>;
  };
  appleMusic: {
    isConnected: boolean;
    tokenExpiry: number;
    currentTrack?: {
      name: string;
      artist: string;
      album: string;
      duration: number;
      progress: number;
      isPlaying: boolean;
    };
    recentTracks: Array<{
      name: string;
      artist: string;
      playedAt: number;
      duration: number;
    }>;
    topTracks: Array<{
      name: string;
      artist: string;
      playCount: number;
      image: string;
    }>;
  };
  youtube: {
    isConnected: boolean;
    tokenExpiry: number;
    watchHistory: Array<{
      title: string;
      channel: string;
      watchedAt: number;
      duration: number;
      thumbnail: string;
    }>;
    subscriptions: Array<{
      channel: string;
      subscriberCount: number;
      lastVideo: string;
      lastVideoDate: number;
    }>;
  };
}

const PulseMetricIntegration: React.FC = () => {
  const [pulseData, setPulseData] = useState<PulseMetricData>({
    spotify: {
      isConnected: false,
      tokenExpiry: 0,
      recentTracks: [],
      topTracks: []
    },
    appleMusic: {
      isConnected: false,
      tokenExpiry: 0,
      recentTracks: [],
      topTracks: []
    },
    youtube: {
      isConnected: false,
      tokenExpiry: 0,
      watchHistory: [],
      subscriptions: []
    }
  });

  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'spotify' | 'appleMusic' | 'youtube'>('overview');

  const platforms = {
    spotify: {
      name: 'Spotify',
      icon: Music,
      color: 'from-green-500 to-green-600',
      description: 'Connect your Spotify account to analyze listening patterns and music preferences.',
      features: ['Listening history', 'Top tracks analysis', 'Playlist insights', 'Genre preferences']
    },
    appleMusic: {
      name: 'Apple Music',
      icon: Music,
      color: 'from-pink-500 to-pink-600',
      description: 'Connect your Apple Music account for comprehensive music analytics and insights.',
      features: ['Play history', 'Favorite tracks', 'Library analysis', 'Recommendation insights']
    },
    youtube: {
      name: 'YouTube',
      icon: Play,
      color: 'from-red-500 to-red-600',
      description: 'Connect your YouTube account to analyze viewing patterns and content preferences.',
      features: ['Watch history', 'Subscription insights', 'Content preferences', 'Engagement metrics']
    }
  };

  const connectPlatform = async (platform: keyof PulseMetricData) => {
    setIsConnecting(platform);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPulseData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        isConnected: true,
        tokenExpiry: Date.now() + (90 * 24 * 60 * 60 * 1000) // 90 days
      }
    }));
    
    setIsConnecting(null);
  };

  const disconnectPlatform = (platform: keyof PulseMetricData) => {
    setPulseData(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        isConnected: false,
        tokenExpiry: 0
      }
    }));
  };

  const getTokenStatus = (platform: keyof PulseMetricData) => {
    const data = pulseData[platform];
    if (!data.isConnected) return 'Not Connected';
    
    const now = Date.now();
    const daysLeft = Math.ceil((data.tokenExpiry - now) / (24 * 60 * 60 * 1000));
    
    if (daysLeft <= 0) return 'Expired';
    if (daysLeft <= 7) return `Expires in ${daysLeft} days`;
    if (daysLeft <= 30) return `Expires in ${daysLeft} days`;
    return `Valid for ${daysLeft} days`;
  };

  const getTokenStatusColor = (platform: keyof PulseMetricData) => {
    const status = getTokenStatus(platform);
    if (status === 'Not Connected') return 'text-gray-500';
    if (status === 'Expired') return 'text-red-500';
    if (status.includes('7 days')) return 'text-yellow-500';
    if (status.includes('30 days')) return 'text-orange-500';
    return 'text-green-500';
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">PulseMetric Analytics</h2>
        <p className="text-gray-600">Advanced analytics integration for comprehensive insights across your digital platforms.</p>
      </div>

      {/* Status Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(platforms).map(([key, platform]) => {
          const IconComponent = platform.icon;
          const data = pulseData[key as keyof PulseMetricData];
          const isConnected = data.isConnected;
          
          return (
            <div key={key} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </div>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

              <div className="space-y-3 mb-4">
                {platform.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {isConnected ? (
                <div className="space-y-3">
                  <div className="text-xs text-gray-500">
                    Token Status: <span className={getTokenStatusColor(key as keyof PulseMetricData)}>
                      {getTokenStatus(key as keyof PulseMetricData)}
                    </span>
                  </div>
                  <button
                    onClick={() => disconnectPlatform(key as keyof PulseMetricData)}
                    className="btn-secondary w-full text-sm py-2"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => connectPlatform(key as keyof PulseMetricData)}
                  disabled={isConnecting === key}
                  className="btn-primary w-full text-sm py-2"
                >
                  {isConnecting === key ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="card p-4">
        <div className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'spotify', label: 'Spotify', icon: Music },
            { id: 'appleMusic', label: 'Apple Music', icon: Music },
            { id: 'youtube', label: 'YouTube', icon: Play }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="card p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Analytics Overview</h3>
              <p className="text-gray-600 mb-6">
                PulseMetric provides advanced analytics across your connected platforms. Connect your accounts to unlock comprehensive insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Music Analytics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Listening Patterns</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Genre Analysis</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Mood Tracking</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Content Analytics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Viewing Habits</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Content Preferences</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Engagement Metrics</span>
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Advanced Analytics Features</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Cross-platform data correlation</li>
                    <li>• Predictive content recommendations</li>
                    <li>• Behavioral pattern analysis</li>
                    <li>• Custom dashboard creation</li>
                    <li>• Export and reporting tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spotify' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Spotify Analytics</h3>
              {pulseData.spotify.isConnected && (
                <div className="text-xs text-gray-500">
                  Token expires: {formatDate(pulseData.spotify.tokenExpiry)}
                </div>
              )}
            </div>

            {!pulseData.spotify.isConnected ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Connect Spotify</h4>
                <p className="text-gray-600 mb-6">Connect your Spotify account to start analyzing your music listening patterns.</p>
                <button
                  onClick={() => connectPlatform('spotify')}
                  disabled={isConnecting === 'spotify'}
                  className="btn-primary"
                >
                  {isConnecting === 'spotify' ? 'Connecting...' : 'Connect Spotify'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Current Track */}
                {pulseData.spotify.currentTrack && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-3">Currently Playing</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center">
                        <Music className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{pulseData.spotify.currentTrack.name}</div>
                        <div className="text-sm text-gray-600">{pulseData.spotify.currentTrack.artist}</div>
                        <div className="text-sm text-gray-500">{pulseData.spotify.currentTrack.album}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {formatDuration(pulseData.spotify.currentTrack.progress)} / {formatDuration(pulseData.spotify.currentTrack.duration)}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            <SkipBack className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            {pulseData.spotify.currentTrack.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            <SkipForward className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Tracks */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Tracks</h4>
                  <div className="space-y-2">
                    {pulseData.spotify.recentTracks.length > 0 ? (
                      pulseData.spotify.recentTracks.slice(0, 5).map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{track.name}</div>
                            <div className="text-xs text-gray-600">{track.artist}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{formatDate(track.playedAt)}</div>
                            <div className="text-xs text-gray-500">{formatDuration(track.duration)}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Music className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No recent tracks available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Tracks */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Top Tracks</h4>
                  <div className="space-y-2">
                    {pulseData.spotify.topTracks.length > 0 ? (
                      pulseData.spotify.topTracks.slice(0, 5).map((track, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Music className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{track.name}</div>
                            <div className="text-xs text-gray-600">{track.artist}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{track.playCount}</div>
                            <div className="text-xs text-gray-500">plays</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No top tracks available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appleMusic' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Apple Music Analytics</h3>
              {pulseData.appleMusic.isConnected && (
                <div className="text-xs text-gray-500">
                  Token expires: {formatDate(pulseData.appleMusic.tokenExpiry)}
                </div>
              )}
            </div>

            {!pulseData.appleMusic.isConnected ? (
              <div className="text-center py-12">
                <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Connect Apple Music</h4>
                <p className="text-gray-600 mb-6">Connect your Apple Music account to start analyzing your music listening patterns.</p>
                <button
                  onClick={() => connectPlatform('appleMusic')}
                  disabled={isConnecting === 'appleMusic'}
                  className="btn-primary"
                >
                  {isConnecting === 'appleMusic' ? 'Connecting...' : 'Connect Apple Music'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Current Track */}
                {pulseData.appleMusic.currentTrack && (
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4">
                    <h4 className="font-medium text-pink-900 mb-3">Currently Playing</h4>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-pink-200 rounded-lg flex items-center justify-center">
                        <Music className="w-8 h-8 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{pulseData.appleMusic.currentTrack.name}</div>
                        <div className="text-sm text-gray-600">{pulseData.appleMusic.currentTrack.artist}</div>
                        <div className="text-sm text-gray-500">{pulseData.appleMusic.currentTrack.album}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {formatDuration(pulseData.appleMusic.currentTrack.progress)} / {formatDuration(pulseData.appleMusic.currentTrack.duration)}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="p-2 text-pink-600 hover:bg-pink-100 rounded-full">
                            <SkipBack className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-pink-600 hover:bg-pink-100 rounded-full">
                            {pulseData.appleMusic.currentTrack.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button className="p-2 text-pink-600 hover:bg-pink-100 rounded-full">
                            <SkipForward className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recent Tracks */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Tracks</h4>
                  <div className="space-y-2">
                    {pulseData.appleMusic.recentTracks.length > 0 ? (
                      pulseData.appleMusic.recentTracks.slice(0, 5).map((track, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{track.name}</div>
                            <div className="text-xs text-gray-600">{track.artist}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{formatDate(track.playedAt)}</div>
                            <div className="text-xs text-gray-500">{formatDuration(track.duration)}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Music className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No recent tracks available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Tracks */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Top Tracks</h4>
                  <div className="space-y-2">
                    {pulseData.appleMusic.topTracks.length > 0 ? (
                      pulseData.appleMusic.topTracks.slice(0, 5).map((track, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Music className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{track.name}</div>
                            <div className="text-xs text-gray-600">{track.artist}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{track.playCount}</div>
                            <div className="text-xs text-gray-500">plays</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No top tracks available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'youtube' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">YouTube Analytics</h3>
              {pulseData.youtube.isConnected && (
                <div className="text-xs text-gray-500">
                  Token expires: {formatDate(pulseData.youtube.tokenExpiry)}
                </div>
              )}
            </div>

            {!pulseData.youtube.isConnected ? (
              <div className="text-center py-12">
                <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Connect YouTube</h4>
                <p className="text-gray-600 mb-6">Connect your YouTube account to start analyzing your viewing patterns and content preferences.</p>
                <button
                  onClick={() => connectPlatform('youtube')}
                  disabled={isConnecting === 'youtube'}
                  className="btn-primary"
                >
                  {isConnecting === 'youtube' ? 'Connecting...' : 'Connect YouTube'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Watch History */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recent Watch History</h4>
                  <div className="space-y-2">
                    {pulseData.youtube.watchHistory.length > 0 ? (
                      pulseData.youtube.watchHistory.slice(0, 5).map((video, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <Play className="w-6 h-6 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{video.title}</div>
                            <div className="text-xs text-gray-600">{video.channel}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{formatDate(video.watchedAt)}</div>
                            <div className="text-xs text-gray-500">{formatDuration(video.duration)}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Play className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No watch history available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subscriptions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Subscriptions</h4>
                  <div className="space-y-2">
                    {pulseData.youtube.subscriptions.length > 0 ? (
                      pulseData.youtube.subscriptions.slice(0, 5).map((subscription, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{subscription.channel}</div>
                            <div className="text-xs text-gray-600">{subscription.subscriberCount.toLocaleString()} subscribers</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Last video: {formatDate(subscription.lastVideoDate)}</div>
                            <div className="text-xs text-gray-500 truncate max-w-32">{subscription.lastVideo}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>No subscriptions available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Coming Soon Notice */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <div className="flex items-start gap-3">
          <Zap className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-purple-900">Advanced Analytics Coming Soon</h3>
            <p className="text-purple-800 mb-3">
              PulseMetric is currently in development. Once fully integrated, you'll have access to:
            </p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Cross-platform data correlation and insights</li>
              <li>• AI-powered content recommendations</li>
              <li>• Advanced behavioral pattern analysis</li>
              <li>• Custom dashboard creation</li>
              <li>• Comprehensive reporting and analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* External Link */}
      <div className="card p-6 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2">Learn More About PulseMetric</h3>
          <p className="text-gray-600 mb-4">
            Discover how PulseMetric can revolutionize your content strategy with advanced analytics and insights.
          </p>
          <a
            href="https://pulsemetric.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            Visit PulseMetric
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PulseMetricIntegration;
