import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Eye, 
  EyeOff, 
  Building2, 
  User, 
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { User as UserType } from '../App';

interface AuthPageProps {
  onLogin: (user: UserType) => void;
}

const AuthPage = ({ onLogin }: AuthPageProps) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'brand' | 'influencer'>('brand');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Test mode: allow "test" credentials for both user types
    if (formData.email === 'test' && formData.password === 'test') {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create test user data based on selected user type
      const testUser: UserType = {
        id: userType === 'brand' ? 'brand-1' : 'influencer-1',
        type: userType,
        name: userType === 'brand' ? 'Test Brand Company' : 'Test Influencer',
        email: 'test@example.com',
        profileComplete: false,
        subscription: 'free'
      };

      onLogin(testUser);
      navigate('/profile-setup');
      return;
    }

    // Regular authentication flow (for demo purposes, accept any valid email/password)
    if (formData.email && formData.password) {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser: UserType = {
        id: '1',
        type: userType,
        name: formData.name || (userType === 'brand' ? 'Demo Brand' : 'Demo Influencer'),
        email: formData.email,
        profileComplete: false,
        subscription: 'free'
      };

      onLogin(mockUser);
      navigate('/profile-setup');
    }
  };

  const quickTest = async (type: 'brand' | 'influencer') => {
    setUserType(type);
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const testUser: UserType = {
      id: type === 'brand' ? 'brand-1' : 'influencer-1',
      type: type,
      name: type === 'brand' ? 'Test Brand Company' : 'Test Influencer',
      email: 'test@example.com',
      profileComplete: false,
      subscription: 'free'
    };

    onLogin(testUser);
    navigate('/profile-setup');
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-brand-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-brand-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-brand-600 bg-clip-text text-transparent">
              BrandVu
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Join BrandVu'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </motion.div>

        {/* Quick Test Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-3">Quick Test (No Login Required)</p>
            <div className="flex space-x-3">
              <button
                onClick={() => quickTest('brand')}
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
              >
                <Building2 className="w-4 h-4 mr-2 inline" />
                Test Brand
              </button>
              <button
                onClick={() => quickTest('influencer')}
                disabled={isLoading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
              >
                <User className="w-4 h-4 mr-2 inline" />
                Test Influencer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Test Mode Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl"
        >
          <div className="flex items-center mb-2">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">Test Mode</span>
          </div>
          <p className="text-sm text-blue-700">
            Or enter <strong>"test"</strong> for both email and password to test the {userType} experience.
          </p>
        </motion.div>

        {/* User Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I am a...
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUserType('brand')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                userType === 'brand'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2" />
              <span className="font-medium">Brand</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('influencer')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                userType === 'influencer'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <User className="w-6 h-6 mx-auto mb-2" />
              <span className="font-medium">Influencer</span>
            </button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {userType === 'brand' ? 'Company Name' : 'Full Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder={userType === 'brand' ? 'Enter company name' : 'Enter your full name'}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter your email (or 'test' for demo)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field pr-12"
                placeholder="Enter your password (or 'test' for demo)"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Confirm your password"
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-primary-600 hover:text-primary-700">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </motion.form>

        {/* Toggle Auth Mode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="ml-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-primary-50 rounded-xl"
        >
          <h3 className="font-semibold text-primary-900 mb-2">
            {userType === 'brand' ? 'Why brands choose BrandVu:' : 'Why influencers choose BrandVu:'}
          </h3>
          <ul className="space-y-1 text-sm text-primary-700">
            {userType === 'brand' ? (
              <>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Access to verified influencers
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  AI-powered matching algorithm
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Performance analytics & ROI tracking
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Connect with top brands
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Higher commission rates (up to 20%)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Real-time performance insights
                </li>
              </>
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage; 