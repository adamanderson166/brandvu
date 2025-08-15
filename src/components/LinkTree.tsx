import React, { useState } from 'react';
import { Plus, Link, BarChart3, Edit3, Trash2, Copy, ExternalLink, Eye, MousePointer, TrendingUp } from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  isActive: boolean;
  order: number;
  analytics: {
    clicks: number;
    uniqueClicks: number;
    conversions: number;
    lastClicked: number | null;
  };
}

interface Category {
  id: string;
  name: string;
  color: string;
}

const LinkTree: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>([
    {
      id: '1',
      title: 'Latest YouTube Video',
      url: 'https://youtube.com/watch?v=abc123',
      description: 'Check out my newest workout routine',
      category: 'content',
      isActive: true,
      order: 1,
      analytics: { clicks: 1247, uniqueClicks: 1189, conversions: 23, lastClicked: Date.now() - 3600000 }
    },
    {
      id: '2',
      title: 'Fitness Coaching',
      url: 'https://calendly.com/fitness-alex',
      description: 'Book a 1-on-1 session',
      category: 'services',
      isActive: true,
      order: 2,
      analytics: { clicks: 892, uniqueClicks: 856, conversions: 45, lastClicked: Date.now() - 7200000 }
    },
    {
      id: '3',
      title: 'Instagram',
      url: 'https://instagram.com/fitness_alex',
      description: 'Daily fitness inspiration',
      category: 'social',
      isActive: true,
      order: 3,
      analytics: { clicks: 2156, uniqueClicks: 1987, conversions: 0, lastClicked: Date.now() - 1800000 }
    },
    {
      id: '4',
      title: 'Meal Plan Ebook',
      url: 'https://gumroad.com/fitness-alex-ebook',
      description: 'Get your free meal planning guide',
      category: 'content',
      isActive: true,
      order: 4,
      analytics: { clicks: 567, uniqueClicks: 534, conversions: 89, lastClicked: Date.now() - 86400000 }
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: 'content', name: 'Content', color: 'bg-blue-100 text-blue-800' },
    { id: 'services', name: 'Services', color: 'bg-green-100 text-green-800' },
    { id: 'social', name: 'Social', color: 'bg-purple-100 text-purple-800' },
    { id: 'products', name: 'Products', color: 'bg-orange-100 text-orange-800' }
  ]);

  const [isAddingLink, setIsAddingLink] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const addLink = (link: Omit<LinkItem, 'id' | 'analytics' | 'order'>) => {
    const newLink: LinkItem = {
      ...link,
      id: Date.now().toString(),
      order: links.length + 1,
      analytics: { clicks: 0, uniqueClicks: 0, conversions: 0, lastClicked: null }
    };
    setLinks(prev => [...prev, newLink]);
    setIsAddingLink(false);
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
    setEditingLink(null);
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  const toggleLinkActive = (id: string) => {
    setLinks(prev => prev.map(link => 
      link.id === id ? { ...link, isActive: !link.isActive } : link
    ));
  };

  const reorderLinks = (id: string, direction: 'up' | 'down') => {
    setLinks(prev => {
      const currentIndex = prev.findIndex(link => link.id === id);
      if (currentIndex === -1) return prev;
      
      const newLinks = [...prev];
      if (direction === 'up' && currentIndex > 0) {
        [newLinks[currentIndex], newLinks[currentIndex - 1]] = [newLinks[currentIndex - 1], newLinks[currentIndex]];
      } else if (direction === 'down' && currentIndex < newLinks.length - 1) {
        [newLinks[currentIndex], newLinks[currentIndex + 1]] = [newLinks[currentIndex + 1], newLinks[currentIndex]];
      }
      
      return newLinks.map((link, index) => ({ ...link, order: index + 1 }));
    });
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add a toast notification here
  };

  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || 'bg-gray-100 text-gray-800';
  };

  const totalClicks = links.reduce((sum, link) => sum + link.analytics.clicks, 0);
  const totalConversions = links.reduce((sum, link) => sum + link.analytics.conversions, 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">LinkTree Manager</h2>
          <p className="text-gray-600">Create and organize your links to track engagement and conversions.</p>
        </div>
        <button
          onClick={() => setIsAddingLink(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {/* Analytics Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalClicks.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Clicks</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{totalConversions.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Conversions</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{conversionRate}%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{links.filter(l => l.isActive).length}</div>
          <div className="text-sm text-gray-600">Active Links</div>
        </div>
      </div>

      {/* Links List */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Your Links</h3>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="btn-secondary text-sm py-2 px-3 flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            {showAnalytics ? 'Hide' : 'Show'} Analytics
          </button>
        </div>

        <div className="space-y-3">
          {links
            .sort((a, b) => a.order - b.order)
            .map((link) => (
              <div key={link.id} className={`border rounded-lg p-4 ${link.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(link.category)}`}>
                        {categories.find(cat => cat.id === link.category)?.name}
                      </div>
                      <h4 className="font-medium">{link.title}</h4>
                      {!link.isActive && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">Inactive</span>
                      )}
                    </div>
                    
                    {link.description && (
                      <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Link className="w-4 h-4" />
                      <span className="font-mono">{link.url}</span>
                    </div>

                    {showAnalytics && (
                      <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{link.analytics.clicks.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Clicks</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{link.analytics.uniqueClicks.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Unique</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{link.analytics.conversions.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Conversions</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">
                            {link.analytics.lastClicked 
                              ? new Date(link.analytics.lastClicked).toLocaleDateString()
                              : 'Never'
                            }
                          </div>
                          <div className="text-xs text-gray-500">Last Click</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => reorderLinks(link.id, 'up')}
                      disabled={link.order === 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => reorderLinks(link.id, 'down')}
                      disabled={link.order === links.length}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => copyLink(link.url)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(link.url, '_blank')}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded"
                      title="Open Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingLink(link)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded"
                      title="Edit Link"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleLinkActive(link.id)}
                      className={`p-2 rounded ${link.isActive ? 'text-green-600 hover:text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
                      title={link.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 text-red-400 hover:text-red-600 rounded"
                      title="Delete Link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Link Modal */}
      {isAddingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Add New Link</h3>
            <AddLinkForm
              categories={categories}
              onSubmit={addLink}
              onCancel={() => setIsAddingLink(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Link Modal */}
      {editingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Edit Link</h3>
            <EditLinkForm
              link={editingLink}
              categories={categories}
              onSubmit={(updates) => updateLink(editingLink.id, updates)}
              onCancel={() => setEditingLink(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Add Link Form Component
const AddLinkForm: React.FC<{
  categories: Category[];
  onSubmit: (link: Omit<LinkItem, 'id' | 'analytics' | 'order'>) => void;
  onCancel: () => void;
}> = ({ categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'content',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="input-field"
          placeholder="e.g., Latest YouTube Video"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          className="input-field"
          placeholder="https://example.com"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="input-field"
          placeholder="Brief description of the link"
          rows={2}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="input-field"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="rounded border-gray-300"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Add Link
        </button>
      </div>
    </form>
  );
};

// Edit Link Form Component
const EditLinkForm: React.FC<{
  link: LinkItem;
  categories: Category[];
  onSubmit: (updates: Partial<LinkItem>) => void;
  onCancel: () => void;
}> = ({ link, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: link.title,
    url: link.url,
    description: link.description || '',
    category: link.category,
    isActive: link.isActive
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
        <input
          type="url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="input-field"
          rows={2}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="input-field"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="editIsActive"
          checked={formData.isActive}
          onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
          className="rounded border-gray-300"
        />
        <label htmlFor="editIsActive" className="text-sm text-gray-700">Active</label>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Update Link
        </button>
      </div>
    </form>
  );
};

export default LinkTree;
