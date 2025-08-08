import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  X, 
  Check, 
  ArrowRight,
  Building2,
  User,
  MapPin,
  Globe,
  DollarSign
} from 'lucide-react';
import { User as UserType } from '../App';

interface ProfileSetupProps {
  user: UserType;
  onUpdate: (updates: Partial<UserType>) => void;
}

const ProfileSetup = ({ user, onUpdate }: ProfileSetupProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    categories: [] as string[],
    photos: [] as string[],
    followers: '',
    price: '',
    interests: [] as string[]
  });

  const categories = [
    'Fitness', 'Wellness', 'Lifestyle', 'Sports', 'Athletics', 'Fashion',
    'Technology', 'Gadgets', 'Reviews', 'Food', 'Travel', 'Beauty',
    'Gaming', 'Education', 'Business', 'Finance', 'Health', 'Parenting'
  ];

  const interests = [
    'Sustainable Living', 'Mental Health', 'Personal Development', 'Cooking',
    'Photography', 'Music', 'Art', 'Reading', 'Outdoor Activities', 'Yoga',
    'Running', 'Weight Training', 'Meditation', 'Journaling', 'Learning'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleCategoryToggle = (category: string) => {
    const updated = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    handleInputChange('categories', updated);
  };

  const handleInterestToggle = (interest: string) => {
    const updated = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    handleInputChange('interests', updated);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      handleInputChange('photos', [...formData.photos, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    const updated = formData.photos.filter((_, i) => i !== index);
    handleInputChange('photos', updated);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete profile setup
      onUpdate({ profileComplete: true });
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Tell us about yourself' },
    { number: 2, title: 'Photos', description: 'Add your best photos' },
    { number: 3, title: 'Categories', description: 'Choose your interests' },
    { number: 4, title: 'Pricing', description: 'Set your rates' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            Let's get you set up to start connecting with {user.type === 'brand' ? 'influencers' : 'brands'}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step.number ? 'bg-primary-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card p-8"
        >
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input-field h-32 resize-none"
                  placeholder={`Tell us about your ${user.type === 'brand' ? 'company' : 'content'}...`}
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="input-field pl-10"
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="input-field pl-10"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {user.type === 'influencer' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follower Count
                  </label>
                  <input
                    type="text"
                    value={formData.followers}
                    onChange={(e) => handleInputChange('followers', e.target.value)}
                    className="input-field"
                    placeholder="e.g., 50K, 100K, 1M"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Photos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Upload Photos (Max 6)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {formData.photos.length < 6 && (
                    <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors">
                      <Camera className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Add Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Categories (Choose up to 5)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryToggle(category)}
                      disabled={formData.categories.length >= 5 && !formData.categories.includes(category)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.categories.includes(category)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : formData.categories.length >= 5
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Personal Interests (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {user.type === 'brand' ? 'Campaign Budget Range' : 'Rate per Post'}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="input-field pl-10"
                    placeholder={user.type === 'brand' ? 'e.g., $5,000 - $15,000' : 'e.g., $500 - $2,000'}
                  />
                </div>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">
                  Profile Completion
                </h3>
                <div className="space-y-2 text-sm text-primary-700">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Basic information added
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    {formData.photos.length} photos uploaded
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    {formData.categories.length} categories selected
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 mr-2" />
                    Pricing information set
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={nextStep}
            className="btn-primary inline-flex items-center"
          >
            {currentStep === 4 ? 'Complete Setup' : 'Next Step'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup; 