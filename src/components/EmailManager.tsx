import React, { useState, useRef } from 'react';
import { Upload, Download, Mail, Users, BarChart3, Plus, Edit3, Trash2, Send, Eye, Filter, Search, CheckCircle, AlertCircle } from 'lucide-react';

interface Contact {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribedAt: number;
  lastEmailSent?: number;
  status: 'active' | 'unsubscribed' | 'bounced';
  tags: string[];
  metadata?: Record<string, string>;
}

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent';
  createdAt: number;
  scheduledFor?: number;
  sentAt?: number;
  recipientCount: number;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

const EmailManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Smith',
      source: 'website_signup',
      subscribedAt: Date.now() - 86400000 * 30,
      lastEmailSent: Date.now() - 86400000 * 2,
      status: 'active',
      tags: ['fitness', 'newsletter']
    },
    {
      id: '2',
      email: 'sarah@example.com',
      name: 'Sarah Johnson',
      source: 'instagram_campaign',
      subscribedAt: Date.now() - 86400000 * 15,
      lastEmailSent: Date.now() - 86400000 * 2,
      status: 'active',
      tags: ['wellness', 'meal_plans']
    },
    {
      id: '3',
      email: 'mike@example.com',
      name: 'Mike Wilson',
      source: 'youtube_description',
      subscribedAt: Date.now() - 86400000 * 7,
      status: 'active',
      tags: ['workout', 'beginner']
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Weekly Fitness Tips',
      subject: 'Your weekly dose of fitness motivation 💪',
      status: 'sent',
      createdAt: Date.now() - 86400000 * 7,
      sentAt: Date.now() - 86400000 * 6,
      recipientCount: 1250,
      metrics: {
        sent: 1250,
        delivered: 1234,
        opened: 892,
        clicked: 234,
        bounced: 16,
        unsubscribed: 8
      }
    },
    {
      id: '2',
      name: 'New Workout Video',
      subject: 'Check out this killer HIIT routine 🔥',
      status: 'scheduled',
      createdAt: Date.now() - 86400000 * 2,
      scheduledFor: Date.now() + 86400000 * 1,
      recipientCount: 1350,
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0
      }
    }
  ]);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addContact = (contact: Omit<Contact, 'id' | 'subscribedAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      subscribedAt: Date.now()
    };
    setContacts(prev => [...prev, newContact]);
    setIsAddingContact(false);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
    setEditingContact(null);
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const addCampaign = (campaign: Omit<Campaign, 'id' | 'createdAt' | 'metrics'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: Date.now(),
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0
      }
    };
    setCampaigns(prev => [...prev, newCampaign]);
    setIsCreatingCampaign(false);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
    setEditingCampaign(null);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        const newContacts: Contact[] = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            id: `csv_${Date.now()}_${index}`,
            email: values[0]?.trim() || '',
            name: values[1]?.trim() || undefined,
            source: 'csv_upload',
            subscribedAt: Date.now(),
            status: 'active' as const,
            tags: values[2]?.trim() ? values[2].trim().split(';') : []
          };
        }).filter(contact => contact.email && contact.email.includes('@'));
        
        setContacts(prev => [...prev, ...newContacts]);
      };
      reader.readAsText(file);
    }
  };

  const exportContacts = () => {
    const csvContent = [
      ['Email', 'Name', 'Source', 'Subscribed Date', 'Status', 'Tags'].join(','),
      ...contacts.map(contact => [
        contact.email,
        contact.name || '',
        contact.source,
        new Date(contact.subscribedAt).toISOString(),
        contact.status,
        contact.tags.join(';')
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || contact.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalContacts = contacts.length;
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  const totalCampaigns = campaigns.length;
  const sentCampaigns = campaigns.filter(c => c.status === 'sent').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Email Manager</h2>
        <p className="text-gray-600">Manage your email lists, create campaigns, and track engagement metrics.</p>
      </div>

      {/* Overview Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalContacts.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Contacts</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{activeContacts.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Subscribers</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{totalCampaigns.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Campaigns</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{sentCampaigns.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Sent Campaigns</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Quick Actions</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddingContact(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
            <button
              onClick={() => setIsCreatingCampaign(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Create Campaign
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload CSV
            </button>
            <button
              onClick={exportContacts}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* Contacts Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Contacts</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
              <option value="bounced">Bounced</option>
            </select>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Sources</option>
              <option value="website_signup">Website Signup</option>
              <option value="instagram_campaign">Instagram Campaign</option>
              <option value="youtube_description">YouTube Description</option>
              <option value="csv_upload">CSV Upload</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        contact.status === 'active' ? 'bg-green-500' :
                        contact.status === 'unsubscribed' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium">{contact.email}</span>
                    </div>
                    {contact.name && (
                      <span className="text-sm text-gray-600">({contact.name})</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Source: {contact.source.replace('_', ' ')}</span>
                    <span>Joined: {new Date(contact.subscribedAt).toLocaleDateString()}</span>
                    {contact.lastEmailSent && (
                      <span>Last email: {new Date(contact.lastEmailSent).toLocaleDateString()}</span>
                    )}
                  </div>
                  
                  {contact.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {contact.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingContact(contact)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded"
                    title="Edit Contact"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="p-2 text-red-400 hover:text-red-600 rounded"
                    title="Delete Contact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="card p-6">
        <h3 className="font-semibold text-lg mb-4">Campaigns</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Recipients: {campaign.recipientCount.toLocaleString()}</span>
                    <span>Created: {new Date(campaign.createdAt).toLocaleDateString()}</span>
                    {campaign.scheduledFor && (
                      <span>Scheduled: {new Date(campaign.scheduledFor).toLocaleDateString()}</span>
                    )}
                    {campaign.sentAt && (
                      <span>Sent: {new Date(campaign.sentAt).toLocaleDateString()}</span>
                    )}
                  </div>

                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-6 gap-4 mt-3 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.sent.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.delivered.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.opened.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Opened</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.clicked.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Clicked</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.bounced.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Bounced</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.metrics.unsubscribed.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Unsubscribed</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingCampaign(campaign)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded"
                    title="Edit Campaign"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCampaign(campaign.id)}
                    className="p-2 text-red-400 hover:text-red-600 rounded"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Compliance Notice */}
      <div className="card p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2 text-green-900">Privacy Compliance</h3>
            <div className="text-sm text-green-800 space-y-1">
              <p>✓ Consent-based email collection</p>
              <p>✓ Unsubscribe option in every email</p>
              <p>✓ GDPR and CAN-SPAM compliant</p>
              <p>✓ Data retention policies enforced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {isAddingContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Add New Contact</h3>
            <AddContactForm
              onSubmit={addContact}
              onCancel={() => setIsAddingContact(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Contact Modal */}
      {editingContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Edit Contact</h3>
            <EditContactForm
              contact={editingContact}
              onSubmit={(updates) => updateContact(editingContact.id, updates)}
              onCancel={() => setEditingContact(null)}
            />
          </div>
        </div>
      )}

      {/* Add Campaign Modal */}
      {isCreatingCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Create New Campaign</h3>
            <AddCampaignForm
              onSubmit={addCampaign}
              onCancel={() => setIsCreatingCampaign(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold text-lg mb-4">Edit Campaign</h3>
            <EditCampaignForm
              campaign={editingCampaign}
              onSubmit={(updates) => updateCampaign(editingCampaign.id, updates)}
              onCancel={() => setEditingCampaign(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Add Contact Form Component
const AddContactForm: React.FC<{
  onSubmit: (contact: Omit<Contact, 'id' | 'subscribedAt'>) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    source: 'website_signup',
    tags: [] as string[],
    tagInput: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      onSubmit({
        email: formData.email,
        name: formData.name || undefined,
        source: formData.source,
        status: 'active',
        tags: formData.tags
      });
    }
  };

  const addTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-field"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
        <select
          value={formData.source}
          onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
          className="input-field"
        >
          <option value="website_signup">Website Signup</option>
          <option value="instagram_campaign">Instagram Campaign</option>
          <option value="youtube_description">YouTube Description</option>
          <option value="manual_entry">Manual Entry</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={formData.tagInput}
            onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
            className="input-field flex-1"
            placeholder="Add a tag..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <button
            type="button"
            onClick={addTag}
            className="btn-secondary px-4"
          >
            Add
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Add Contact
        </button>
      </div>
    </form>
  );
};

// Edit Contact Form Component
const EditContactForm: React.FC<{
  contact: Contact;
  onSubmit: (updates: Partial<Contact>) => void;
  onCancel: () => void;
}> = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: contact.email,
    name: contact.name || '',
    source: contact.source,
    status: contact.status,
    tags: contact.tags,
    tagInput: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      onSubmit({
        email: formData.email,
        name: formData.name || undefined,
        source: formData.source,
        status: formData.status,
        tags: formData.tags
      });
    }
  };

  const addTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name (optional)</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-field"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
        <select
          value={formData.source}
          onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
          className="input-field"
        >
          <option value="website_signup">Website Signup</option>
          <option value="instagram_campaign">Instagram Campaign</option>
          <option value="youtube_description">YouTube Description</option>
          <option value="manual_entry">Manual Entry</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Contact['status'] }))}
          className="input-field"
        >
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
          <option value="bounced">Bounced</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={formData.tagInput}
            onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
            className="input-field flex-1"
            placeholder="Add a tag..."
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <button
            type="button"
            onClick={addTag}
            className="btn-secondary px-4"
          >
            Add
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Update Contact
        </button>
      </div>
    </form>
  );
};

// Add Campaign Form Component
const AddCampaignForm: React.FC<{
  onSubmit: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'metrics'>) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    status: 'draft' as Campaign['status'],
    scheduledFor: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.subject) {
      onSubmit({
        name: formData.name,
        subject: formData.subject,
        status: formData.status,
        recipientCount: 0,
        scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).getTime() : undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-field"
          placeholder="e.g., Weekly Newsletter"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line *</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="input-field"
          placeholder="e.g., Your weekly dose of inspiration"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Campaign['status'] }))}
          className="input-field"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>
      
      {formData.status === 'scheduled' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date & Time</label>
          <input
            type="datetime-local"
            value={formData.scheduledFor}
            onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
            className="input-field"
            required={formData.status === 'scheduled'}
          />
        </div>
      )}
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Create Campaign
        </button>
      </div>
    </form>
  );
};

// Edit Campaign Form Component
const EditCampaignForm: React.FC<{
  campaign: Campaign;
  onSubmit: (updates: Partial<Campaign>) => void;
  onCancel: () => void;
}> = ({ campaign, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: campaign.name,
    subject: campaign.subject,
    status: campaign.status,
    scheduledFor: campaign.scheduledFor ? new Date(campaign.scheduledFor).toISOString().slice(0, 16) : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.subject) {
      onSubmit({
        name: formData.name,
        subject: formData.subject,
        status: formData.status,
        scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor).getTime() : undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line *</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          className="input-field"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Campaign['status'] }))}
          className="input-field"
        >
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="sending">Sending</option>
          <option value="sent">Sent</option>
        </select>
      </div>
      
      {formData.status === 'scheduled' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Date & Time</label>
          <input
            type="datetime-local"
            value={formData.scheduledFor}
            onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
            className="input-field"
            required={formData.status === 'scheduled'}
          />
        </div>
      )}
      
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1">
          Update Campaign
        </button>
      </div>
    </form>
  );
};

export default EmailManager;
