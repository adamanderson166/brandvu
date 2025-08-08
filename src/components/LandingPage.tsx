import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target, 
  ArrowRight, 
  Star,
  Zap,
  Shield
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered algorithm connects brands with the perfect influencers based on audience, engagement, and conversion data."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Verified Network",
      description: "Access to thousands of pre-vetted influencers with proven track records and authentic audiences."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Real-time insights and Pulsemetric scoring to optimize campaigns and maximize ROI."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Built-in escrow system ensures safe transactions and quality deliverables."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Influencers" },
    { number: "500+", label: "Brand Partners" },
    { number: "95%", label: "Success Rate" },
    { number: "$2M+", label: "Revenue Generated" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-brand-50">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-brand-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
              BrandVu
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link to="/auth" className="text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link to="/auth" className="btn-primary">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              The Future of Brand-Influencer Partnerships
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Connect Brands with
              <span className="block bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
                Perfect Influencers
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform that revolutionizes how brands discover and collaborate with influencers. 
              Powered by AI matching and real-time analytics for maximum impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth" className="btn-primary text-lg px-8 py-4">
                Start Matching Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose BrandVu?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most advanced platform for connecting brands with influencers, 
              backed by data science and proven results.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-brand-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Brand Partnerships?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of brands and influencers who are already using BrandVu 
              to create meaningful, profitable collaborations.
            </p>
            <Link to="/auth" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-brand-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BrandVu</span>
            </div>
            <div className="text-gray-400">
              © 2024 BrandVu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 