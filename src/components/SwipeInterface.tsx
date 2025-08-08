import React, { useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { 
  Heart, 
  X, 
  Star, 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar,
  ArrowLeft,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { User } from '../App';

interface SwipeInterfaceProps {
  user: User;
}

interface Profile {
  id: string;
  name: string;
  type: 'brand' | 'influencer';
  images: string[];
  bio: string;
  location: string;
  followers: string;
  engagement: string;
  categories: string[];
  rating: number;
  price: string;
  verified: boolean;
}

const SwipeInterface = ({ user }: SwipeInterfaceProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [swipedProfiles, setSwipedProfiles] = useState<string[]>([]);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Mock data - in real app this would come from API
  const profiles: Profile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'influencer',
      images: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
      bio: 'Fitness & wellness content creator. Helping people live healthier lives through sustainable habits and positive mindset.',
      location: 'Los Angeles, CA',
      followers: '125K',
      engagement: '8.5%',
      categories: ['Fitness', 'Wellness', 'Lifestyle'],
      rating: 4.8,
      price: '$2,500',
      verified: true
    },
    {
      id: '2',
      name: 'Nike Sportswear',
      type: 'brand',
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
      bio: 'Global leader in athletic footwear and apparel. Empowering athletes worldwide with innovative performance gear.',
      location: 'Beaverton, OR',
      followers: '2.1M',
      engagement: '6.2%',
      categories: ['Sports', 'Athletics', 'Fashion'],
      rating: 4.9,
      price: '$15,000',
      verified: true
    },
    {
      id: '3',
      name: 'Mike Chen',
      type: 'influencer',
      images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
      bio: 'Tech reviewer and gadget enthusiast. Sharing the latest in technology and helping you make informed decisions.',
      location: 'San Francisco, CA',
      followers: '89K',
      engagement: '7.1%',
      categories: ['Technology', 'Gadgets', 'Reviews'],
      rating: 4.6,
      price: '$1,800',
      verified: true
    }
  ];

  const categories = ['Fitness', 'Wellness', 'Lifestyle', 'Sports', 'Athletics', 'Fashion', 'Technology', 'Gadgets', 'Reviews', 'Food', 'Travel', 'Beauty'];

  const handleDragEnd = (event: any, info: PanInfo) => {
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold) {
      // Swipe right - like
      handleLike();
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left - pass
      handlePass();
    }
  };

  const handleLike = () => {
    if (currentIndex < profiles.length) {
      setSwipedProfiles([...swipedProfiles, profiles[currentIndex].id]);
      setCurrentIndex(currentIndex + 1);
      x.set(0);
    }
  };

  const handlePass = () => {
    if (currentIndex < profiles.length) {
      setSwipedProfiles([...swipedProfiles, profiles[currentIndex].id]);
      setCurrentIndex(currentIndex + 1);
      x.set(0);
    }
  };

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No More Profiles</h2>
          <p className="text-gray-600 mb-6">
            You've seen all available {user.type === 'brand' ? 'influencers' : 'brands'} for now.
          </p>
          <button 
            onClick={() => setCurrentIndex(0)}
            className="btn-primary"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Discover {user.type === 'brand' ? 'Influencers' : 'Brands'}
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card p-4 mb-6"
          >
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    } else {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Profile Card */}
        <div className="relative h-[600px] mb-6">
          <motion.div
            style={{ x, rotate, opacity }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="swipe-card"
          >
            {/* Main Image */}
            <div className="relative h-3/4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-2xl overflow-hidden">
              <img
                src={currentProfile.images[0]}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />
              {currentProfile.verified && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h2 className="text-white text-2xl font-bold mb-1">{currentProfile.name}</h2>
                <div className="flex items-center text-white/90 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentProfile.location}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{currentProfile.followers}</div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{currentProfile.engagement}</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{currentProfile.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary-600">{currentProfile.price}</div>
                  <div className="text-xs text-gray-600">per post</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{currentProfile.bio}</p>

              <div className="flex flex-wrap gap-2">
                {currentProfile.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all duration-200 shadow-lg"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>
          
          <button
            onClick={handleLike}
            className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-green-400 hover:bg-green-50 transition-all duration-200 shadow-lg"
          >
            <Heart className="w-8 h-8 text-gray-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">
            {currentIndex + 1} of {profiles.length} profiles
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / profiles.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeInterface; 