import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Heart, 
  Star, 
  MapPin, 
  Calendar,
  Send,
  Phone,
  Video,
  MoreVertical,
  Filter,
  Search,
  Users,
  DollarSign
} from 'lucide-react';
import { User, Match } from '../App';

interface MatchesProps {
  user: User;
}

const Matches = ({ user }: MatchesProps) => {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  // Mock matches data
  const matches: (Match & { profile: any })[] = [
    {
      id: '1',
      userId: '1',
      matchedUserId: '2',
      matchedUserName: 'Sarah Johnson',
      matchedUserType: 'influencer',
      matchedUserImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      score: 95,
      timestamp: new Date('2024-01-15'),
      profile: {
        followers: '125K',
        engagement: '8.5%',
        location: 'Los Angeles, CA',
        categories: ['Fitness', 'Wellness'],
        verified: true,
        lastActive: '2 hours ago'
      }
    },
    {
      id: '2',
      userId: '1',
      matchedUserId: '3',
      matchedUserName: 'Mike Chen',
      matchedUserType: 'influencer',
      matchedUserImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      score: 87,
      timestamp: new Date('2024-01-14'),
      profile: {
        followers: '89K',
        engagement: '7.1%',
        location: 'San Francisco, CA',
        categories: ['Technology', 'Gadgets'],
        verified: true,
        lastActive: '1 day ago'
      }
    },
    {
      id: '3',
      userId: '1',
      matchedUserId: '4',
      matchedUserName: 'Nike Sportswear',
      matchedUserType: 'brand',
      matchedUserImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100',
      score: 92,
      timestamp: new Date('2024-01-13'),
      profile: {
        followers: '2.1M',
        engagement: '6.2%',
        location: 'Beaverton, OR',
        categories: ['Sports', 'Athletics'],
        verified: true,
        lastActive: '3 hours ago'
      }
    }
  ];

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    if (filter === 'recent') return match.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (filter === 'high-score') return match.score >= 90;
    return true;
  });

  const selectedMatchData = selectedMatch ? matches.find(m => m.id === selectedMatch) : null;

  const sendMessage = () => {
    if (message.trim()) {
      // In real app, this would send to backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Matches
              </h1>
              <p className="text-gray-600">
                {filteredMatches.length} {user.type === 'brand' ? 'influencers' : 'brands'} matched
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field w-40"
              >
                <option value="all">All Matches</option>
                <option value="recent">Recent (7 days)</option>
                <option value="high-score">High Score (90+)</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Matches List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search matches..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => setSelectedMatch(match.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedMatch === match.id ? 'bg-primary-50 border-primary-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={match.matchedUserImage}
                          alt={match.matchedUserName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {match.profile.verified && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Star className="w-2 h-2 text-white fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {match.matchedUserName}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{match.score}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{match.profile.followers}</span>
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">{match.profile.engagement}</span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{match.profile.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat/Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            {selectedMatchData ? (
              <div className="card h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedMatchData.matchedUserImage}
                        alt={selectedMatchData.matchedUserName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {selectedMatchData.matchedUserName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {selectedMatchData.profile.lastActive}
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Video className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {/* Mock messages */}
                    <div className="flex justify-end">
                      <div className="bg-primary-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        <p>Hi! I loved your recent fitness content. Would you be interested in collaborating on our new product line?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg max-w-xs">
                        <p>Thank you! I'd love to learn more about your brand and products. What kind of collaboration are you thinking?</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <div className="bg-primary-600 text-white px-4 py-2 rounded-lg max-w-xs">
                        <p>We're launching a new line of sustainable workout gear. We'd love to send you some samples and discuss a partnership!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 input-field"
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Match
                  </h3>
                  <p className="text-gray-600">
                    Choose a match from the list to start chatting and collaborating
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        {selectedMatchData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="font-medium">Schedule Call</span>
                </button>
                
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <DollarSign className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="font-medium">Send Proposal</span>
                </button>
                
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <Heart className="w-5 h-5 text-primary-600 mr-2" />
                  <span className="font-medium">Favorite</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Matches; 