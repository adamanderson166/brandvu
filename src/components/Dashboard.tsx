import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  ArrowRight, 
  Calendar,
  Star,
  Eye,
  Heart,
  MessageCircle,
  Plus,
  BarChart3
} from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const isBrand = user.type === 'brand';

  const stats = isBrand ? [
    { label: 'Active Campaigns', value: '12', icon: <Target className="w-5 h-5" />, change: '+15%', color: 'text-blue-600' },
    { label: 'Total Influencers', value: '47', icon: <Users className="w-5 h-5" />, change: '+8%', color: 'text-green-600' },
    { label: 'Total Spend', value: '$12.4K', icon: <DollarSign className="w-5 h-5" />, change: '+23%', color: 'text-purple-600' },
    { label: 'Avg. Engagement', value: '8.2%', icon: <TrendingUp className="w-5 h-5" />, change: '+5%', color: 'text-orange-600' }
  ] : [
    { label: 'Active Collaborations', value: '8', icon: <Target className="w-5 h-5" />, change: '+12%', color: 'text-blue-600' },
    { label: 'Total Followers', value: '24.5K', icon: <Users className="w-5 h-5" />, change: '+18%', color: 'text-green-600' },
    { label: 'Monthly Earnings', value: '$3.2K', icon: <DollarSign className="w-5 h-5" />, change: '+25%', color: 'text-purple-600' },
    { label: 'Avg. Engagement', value: '6.8%', icon: <TrendingUp className="w-5 h-5" />, change: '+7%', color: 'text-orange-600' }
  ];

  const recentActivity = [
    { type: 'match', message: 'New match with Nike Sportswear', time: '2 hours ago', icon: <Heart className="w-4 h-4" /> },
    { type: 'campaign', message: 'Campaign "Summer Collection" launched', time: '4 hours ago', icon: <Target className="w-4 h-4" /> },
    { type: 'message', message: 'Message from @fitness_guru', time: '6 hours ago', icon: <MessageCircle className="w-4 h-4" /> },
    { type: 'analytics', message: 'Weekly report available', time: '1 day ago', icon: <BarChart3 className="w-4 h-4" /> }
  ];

  const quickActions = isBrand ? [
    { title: 'Create Campaign', description: 'Launch a new influencer campaign', icon: <Plus className="w-5 h-5" />, link: '/swipe' },
    { title: 'View Analytics', description: 'Check performance metrics', icon: <BarChart3 className="w-5 h-5" />, link: '/analytics' },
    { title: 'Browse Influencers', description: 'Discover new talent', icon: <Users className="w-5 h-5" />, link: '/swipe' }
  ] : [
    { title: 'Find Brands', description: 'Discover new opportunities', icon: <Target className="w-5 h-5" />, link: '/swipe' },
    { title: 'View Matches', description: 'Check your matches', icon: <Heart className="w-5 h-5" />, link: '/matches' },
    { title: 'Performance', description: 'Track your analytics', icon: <BarChart3 className="w-5 h-5" />, link: '/analytics' }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your {isBrand ? 'brand campaigns' : 'influencer profile'} today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')} bg-opacity-10`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-3 group-hover:bg-primary-200 transition-colors">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{action.title}</div>
                      <div className="text-sm text-gray-600">{action.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <Link to="/matches" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mr-3">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </div>
                      <div className="text-xs text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Performance Overview
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Last 30 days</span>
                <Link to="/analytics" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {isBrand ? '47' : '24.5K'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {isBrand ? 'Active Influencers' : 'Total Followers'}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  +12% from last month
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {isBrand ? '$12.4K' : '$3.2K'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {isBrand ? 'Total Spend' : 'Monthly Earnings'}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  +18% from last month
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {isBrand ? '8.2%' : '6.8%'}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Average Engagement
                </div>
                <div className="text-xs text-green-600 font-medium">
                  +5% from last month
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 