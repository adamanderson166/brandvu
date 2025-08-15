import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Star, Phone, Mail, Globe, Camera, Palette, Scissors, Car, Utensils, Building, Heart, Share2, Navigation } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  type: VendorType;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string;
  email?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  priceRange: 'budget' | 'moderate' | 'premium' | 'luxury';
  specialties: string[];
  description: string;
  photos: string[];
  isVerified: boolean;
  distance: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

type VendorType = 'photographer' | 'videographer' | 'makeup_artist' | 'hair_stylist' | 'stylist' | 'location' | 'catering' | 'transportation' | 'other';

const LocalServices: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<VendorType | 'all'>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'price'>('distance');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Mock data - in real implementation, this would come from Google Places API
  useEffect(() => {
    const mockVendors: Vendor[] = [
      {
        id: '1',
        name: 'Elite Photography Studio',
        type: 'photographer',
        address: '123 Main Street',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        phone: '(555) 123-4567',
        email: 'hello@elitephotography.com',
        website: 'https://elitephotography.com',
        rating: 4.8,
        reviewCount: 127,
        priceRange: 'premium',
        specialties: ['Portrait', 'Fashion', 'Commercial'],
        description: 'Professional photography studio specializing in high-end portrait and fashion photography. State-of-the-art equipment and experienced photographers.',
        photos: ['https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Studio+1', 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Studio+2'],
        isVerified: true,
        distance: 0.8,
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      {
        id: '2',
        name: 'Creative Lens Media',
        type: 'videographer',
        address: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90211',
        phone: '(555) 987-6543',
        email: 'info@creativelens.com',
        website: 'https://creativelens.com',
        rating: 4.6,
        reviewCount: 89,
        priceRange: 'moderate',
        specialties: ['Wedding', 'Corporate', 'Music Videos'],
        description: 'Creative video production company with a passion for storytelling. Specializing in weddings, corporate events, and music videos.',
        photos: ['https://via.placeholder.com/300x200/059669/FFFFFF?text=Video+1', 'https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Video+2'],
        isVerified: true,
        distance: 1.2,
        coordinates: { lat: 34.0622, lng: -118.2537 }
      },
      {
        id: '3',
        name: 'Glamour Makeup Artistry',
        type: 'makeup_artist',
        address: '789 Sunset Boulevard',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90212',
        phone: '(555) 456-7890',
        email: 'glamour@makeup.com',
        website: 'https://glamourmakeup.com',
        rating: 4.9,
        reviewCount: 203,
        priceRange: 'premium',
        specialties: ['Bridal', 'Editorial', 'Special Effects'],
        description: 'Award-winning makeup artist with over 10 years of experience in bridal, editorial, and special effects makeup.',
        photos: ['https://via.placeholder.com/300x200/DB2777/FFFFFF?text=Makeup+1', 'https://via.placeholder.com/300x200/EA580C/FFFFFF?text=Makeup+2'],
        isVerified: true,
        distance: 1.8,
        coordinates: { lat: 34.0722, lng: -118.2637 }
      },
      {
        id: '4',
        name: 'Urban Hair Studio',
        type: 'hair_stylist',
        address: '321 Melrose Place',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90213',
        phone: '(555) 321-0987',
        email: 'urban@hairstudio.com',
        website: 'https://urbanhairstudio.com',
        rating: 4.7,
        reviewCount: 156,
        priceRange: 'moderate',
        specialties: ['Color', 'Styling', 'Extensions'],
        description: 'Modern hair salon specializing in trendy cuts, color, and styling. Expert stylists with the latest techniques.',
        photos: ['https://via.placeholder.com/300x200/0891B2/FFFFFF?text=Hair+1', 'https://via.placeholder.com/300x200/7C2D12/FFFFFF?text=Hair+2'],
        isVerified: true,
        distance: 2.1,
        coordinates: { lat: 34.0822, lng: -118.2737 }
      },
      {
        id: '5',
        name: 'Luxe Event Space',
        type: 'location',
        address: '654 Rodeo Drive',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90214',
        phone: '(555) 654-3210',
        email: 'events@luxespace.com',
        website: 'https://luxespace.com',
        rating: 4.5,
        reviewCount: 78,
        priceRange: 'luxury',
        specialties: ['Weddings', 'Corporate', 'Parties'],
        description: 'Elegant event space perfect for weddings, corporate events, and special celebrations. Multiple rooms available.',
        photos: ['https://via.placeholder.com/300x200/1F2937/FFFFFF?text=Venue+1', 'https://via.placeholder.com/300x200/374151/FFFFFF?text=Venue+2'],
        isVerified: true,
        distance: 2.5,
        coordinates: { lat: 34.0922, lng: -118.2837 }
      }
    ];
    
    setVendors(mockVendors);
    setFilteredVendors(mockVendors);
  }, []);

  useEffect(() => {
    let filtered = vendors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(vendor => vendor.type === selectedType);
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(vendor => vendor.priceRange === selectedPriceRange);
    }

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(vendor => vendor.rating >= selectedRating);
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return a.distance - b.distance;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          const priceOrder = { budget: 1, moderate: 2, premium: 3, luxury: 4 };
          return priceOrder[a.priceRange] - priceOrder[b.priceRange];
        default:
          return 0;
      }
    });

    setFilteredVendors(filtered);
  }, [vendors, searchTerm, selectedType, selectedPriceRange, selectedRating, sortBy]);

  const vendorTypes = [
    { id: 'photographer', name: 'Photographer', icon: Camera, color: 'bg-blue-100 text-blue-800' },
    { id: 'videographer', name: 'Videographer', icon: Camera, color: 'bg-purple-100 text-purple-800' },
    { id: 'makeup_artist', name: 'Makeup Artist', icon: Palette, color: 'bg-pink-100 text-pink-800' },
    { id: 'hair_stylist', name: 'Hair Stylist', icon: Scissors, color: 'bg-green-100 text-green-800' },
    { id: 'stylist', name: 'Fashion Stylist', icon: Palette, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'location', name: 'Event Space', icon: Building, color: 'bg-gray-100 text-gray-800' },
    { id: 'catering', name: 'Catering', icon: Utensils, color: 'bg-red-100 text-red-800' },
    { id: 'transportation', name: 'Transportation', icon: Car, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const priceRanges = [
    { id: 'budget', name: 'Budget', description: '$' },
    { id: 'moderate', name: 'Moderate', description: '$$' },
    { id: 'premium', name: 'Premium', description: '$$$' },
    { id: 'luxury', name: 'Luxury', description: '$$$$' }
  ];

  const getVendorTypeIcon = (type: VendorType) => {
    const vendorType = vendorTypes.find(vt => vt.id === type);
    return vendorType ? React.createElement(vendorType.icon, { className: "w-4 h-4" }) : null;
  };

  const getVendorTypeColor = (type: VendorType) => {
    const vendorType = vendorTypes.find(vt => vt.id === type);
    return vendorType?.color || 'bg-gray-100 text-gray-800';
  };

  const getPriceRangeDescription = (priceRange: string) => {
    const range = priceRanges.find(pr => pr.id === priceRange);
    return range?.description || '';
  };

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const openDirections = (vendor: Vendor) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${vendor.coordinates.lat},${vendor.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const shareVendor = (vendor: Vendor) => {
    if (navigator.share) {
      navigator.share({
        title: vendor.name,
        text: `Check out ${vendor.name} - ${vendor.description}`,
        url: vendor.website || window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${vendor.name} - ${vendor.website || 'No website available'}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Local Services</h2>
        <p className="text-gray-600">Find local photographers, vendors, and service providers for your next project or event.</p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as VendorType | 'all')}
              className="input-field"
            >
              <option value="all">All Services</option>
              {vendorTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="input-field"
            >
              <option value="all">All Prices</option>
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name} ({range.description})</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'price')}
              className="input-field"
            >
              <option value="distance">Distance</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-gray-600">{selectedRating}+ stars</span>
            </label>
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Found {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
          {searchTerm && ` for "${searchTerm}"`}
        </p>
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedType('all');
            setSelectedPriceRange('all');
            setSelectedRating(0);
          }}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear Filters
        </button>
      </div>

      {/* Vendor Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="card p-6 hover:shadow-xl transition-shadow duration-200">
            {/* Vendor Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getVendorTypeColor(vendor.type)}`}>
                    {getVendorTypeIcon(vendor.type)}
                    <span className="ml-1">{vendorTypes.find(vt => vt.id === vendor.type)?.name}</span>
                  </div>
                  {vendor.isVerified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{vendor.distance} mi away</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-sm text-gray-500">({vendor.reviewCount})</span>
                </div>
                <div className="text-sm text-gray-600">{getPriceRangeDescription(vendor.priceRange)}</div>
              </div>
            </div>

            {/* Vendor Photos */}
            {vendor.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {vendor.photos.slice(0, 2).map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`${vendor.name} photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Vendor Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">{vendor.description}</p>

            {/* Vendor Specialties */}
            <div className="flex flex-wrap gap-2 mb-4">
              {vendor.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {specialty}
                </span>
              ))}
              {vendor.specialties.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{vendor.specialties.length - 3} more
                </span>
              )}
            </div>

            {/* Vendor Contact Info */}
            <div className="space-y-2 mb-4">
              {vendor.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{vendor.phone}</span>
                </div>
              )}
              {vendor.email && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{vendor.email}</span>
                </div>
              )}
              {vendor.website && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                    Visit Website
                  </a>
                </div>
              )}
            </div>

            {/* Vendor Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedVendor(vendor)}
                className="btn-primary flex-1 text-sm py-2"
              >
                View Details
              </button>
              <button
                onClick={() => openDirections(vendor)}
                className="btn-secondary text-sm py-2 px-3"
                title="Get Directions"
              >
                <Navigation className="w-4 h-4" />
              </button>
              <button
                onClick={() => shareVendor(vendor)}
                className="btn-secondary text-sm py-2 px-3"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredVendors.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or expanding your search area.</p>
        </div>
      )}

      {/* Vendor Detail Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getVendorTypeColor(selectedVendor.type)}`}>
                      {getVendorTypeIcon(selectedVendor.type)}
                      <span className="ml-1">{vendorTypes.find(vt => vt.id === selectedVendor.type)?.name}</span>
                    </div>
                    {selectedVendor.isVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Vendor Photos */}
              {selectedVendor.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {selectedVendor.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${selectedVendor.name} photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Vendor Info Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium">{selectedVendor.address}</div>
                        <div className="text-sm text-gray-600">{selectedVendor.city}, {selectedVendor.state} {selectedVendor.zipCode}</div>
                      </div>
                    </div>
                    {selectedVendor.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span>{selectedVendor.phone}</span>
                      </div>
                    )}
                    {selectedVendor.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>{selectedVendor.email}</span>
                      </div>
                    )}
                    {selectedVendor.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <a href={selectedVendor.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedVendor.rating}</span>
                        <span className="text-sm text-gray-500">({selectedVendor.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Price Range:</span>
                      <span className="font-medium">{getPriceRangeDescription(selectedVendor.priceRange)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium">{selectedVendor.distance} miles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">About</h3>
                <p className="text-gray-700">{selectedVendor.description}</p>
              </div>

              {/* Vendor Specialties */}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedVendor.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => openDirections(selectedVendor)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </button>
                <button
                  onClick={() => shareVendor(selectedVendor)}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="btn-secondary flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-brand-50 border-primary-200">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2 text-primary-900">Are you a service provider?</h3>
          <p className="text-primary-800 mb-4">Join BrandView to get discovered by brands and influencers looking for your services.</p>
          <button className="btn-primary">
            List Your Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocalServices;
