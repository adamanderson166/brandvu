import React from 'react';
import { Link } from 'react-router-dom';
import { flags } from '../../config/flags';

const Overview: React.FC = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">BrandView</h1>
      <p className="text-gray-600 mb-6">End-to-end creator-brand matching, analytics, and learning — MVP.</p>

      {flags.MOCK_MODE_DEFAULT && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-900">
          Using sample metrics. Connect platforms in Learn → or Onboarding to switch later.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/brandview/onboarding" className="card p-4 hover:shadow-xl transition">
          <div className="text-lg font-semibold">Onboarding</div>
          <div className="text-gray-600">Pick a role and set up basics, niches, socials</div>
        </Link>
        <Link to="/brandview/dashboard/creator" className="card p-4 hover:shadow-xl transition">
          <div className="text-lg font-semibold">Creator Dashboard</div>
          <div className="text-gray-600">View normalized metrics, progress score and suggestions</div>
        </Link>
        <Link to="/brandview/dashboard/brand" className="card p-4 hover:shadow-xl transition">
          <div className="text-lg font-semibold">Brand Dashboard</div>
          <div className="text-gray-600">Filter, browse/swipe, shortlist, and chat placeholder</div>
        </Link>
        <Link to="/brandview/learn" className="card p-4 hover:shadow-xl transition">
          <div className="text-lg font-semibold">Learn</div>
          <div className="text-gray-600">Curriculum stubs and recommended modules</div>
        </Link>
      </div>
    </div>
  );
};

export default Overview;

