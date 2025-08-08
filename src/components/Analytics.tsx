import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Heart, 
  MessageCircle,
  DollarSign,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Target,
  Star,
  Activity
} from 'lucide-react';
import { User } from '../App';

interface AnalyticsProps {
  user: User;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const isBrand = user.type === 'brand';

  const metrics = isBrand ? [
    { label: 'Total Reach', value: '2.4M', change: '+15%', trend: 'up', icon: <Eye className="w-5 h-5" /> },
    { label: 'Engagement Rate', value: '8.2%', change: '+5%', trend: 'up', icon: <Heart className="w-5 h-5" /> },
    { label: 'Active Influencers', value: '47', change: '+8%', trend: 'up', icon: <Users className="w-5 h-5" /> },
    { label: 'Total Spend', value: '$12.4K', change: '+23%', trend: 'up', icon: <DollarSign className="w-5 h-5" /> }
  ] : [
    { label: 'Total Followers', value: '24.5K', change: '+18%', trend: 'up', icon: <Users className="w-5 h-5" /> },
    { label: 'Engagement Rate', value: '6.8%', change: '+7%', trend: 'up', icon: <Heart className="w-5 h-5" /> },
    { label: 'Monthly Earnings', value: '$3.2K', change: '+25%', trend: 'up', icon: <DollarSign className="w-5 h-5" /> },
    { label: 'Active Collaborations', value: '8', change: '+12%', trend: 'up', icon: <Target className="w-5 h-5" /> }
  ];

  const pulseMetrics = [
    { name: 'Content Quality', score: 85, color: 'bg-green-500' },
    { name: 'Audience Authenticity', score: 92, color: 'bg-blue-500' },
    { name: 'Engagement Consistency', score: 78, color: 'bg-yellow-500' },
    { name: 'Brand Safety', score: 95, color: 'bg-purple-500' },
    { name: 'Conversion Potential', score: 88, color: 'bg-red-500' }
  ];

  const recentPosts = [
    { id: 1, title: 'Summer Collection Launch', engagement: '8.5%', reach: '125K', date: '2 days ago' },
    { id: 2, title: 'Fitness Challenge', engagement: '7.2%', reach: '98K', date: '5 days ago' },
    { id: 3, title: 'Product Review', engagement: '9.1%', reach: '156K', date: '1 week ago' }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', followers: '125K', engagement: '8.5%', rating: 4.8 },
    { name: 'Mike Chen', followers: '89K', engagement: '7.1%', rating: 4.6 },
    { name: 'Emma Wilson', followers: '203K', engagement: '6.8%', rating: 4.7 }
  ];

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
                Analytics Dashboard
              </h1>
              <p className="text-gray-600">
                Track your {isBrand ? 'campaign' : 'content'} performance and insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field w-32"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="btn-secondary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <div className="text-primary-600">
                    {metric.icon}
                  </div>
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pulsemetric Score */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Pulsemetric Score
                </h2>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">87</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {pulseMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                      <span className="text-sm font-bold text-gray-900">{metric.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Performance Overview
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMetric('engagement')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedMetric === 'engagement'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Engagement
                  </button>
                  <button
                    onClick={() => setSelectedMetric('reach')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedMetric === 'reach'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Reach
                  </button>
                </div>
              </div>
              
              {/* Mock Chart */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive chart would be displayed here</p>
                  <p className="text-sm text-gray-500">Showing {selectedMetric} data for the last {timeRange}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Posts Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Posts Performance
              </h2>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600">{post.engagement} engagement</span>
                        <span className="text-sm text-gray-600">{post.reach} reach</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isBrand ? 'Top Performing Influencers' : 'Top Performing Content'}
              </h2>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{performer.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-600">{performer.followers} followers</span>
                          <span className="text-sm text-gray-600">•</span>
                          <span className="text-sm text-gray-600">{performer.engagement} engagement</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{performer.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              AI Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                  <span className="font-medium text-green-800">Positive Trend</span>
                </div>
                <p className="text-sm text-green-700">
                  Your engagement rate has increased by 15% this month. Keep creating content in the fitness category.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">Opportunity</span>
                </div>
                <p className="text-sm text-blue-700">
                  Consider collaborating with wellness brands. Your audience shows high interest in this category.
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-800">Recommendation</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Post more content on weekends. Your engagement is 25% higher during these times.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics; 