import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import SwipeInterface from './components/SwipeInterface';
import ProfileSetup from './components/ProfileSetup';
import Analytics from './components/Analytics';
import Matches from './components/Matches';
import Navigation from './components/Navigation';
import { brandViewRoutes } from './brandview/routes';

export interface User {
  id: string;
  type: 'brand' | 'influencer';
  name: string;
  email: string;
  profileComplete: boolean;
  subscription: 'free' | 'premium' | 'enterprise';
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedUserName: string;
  matchedUserType: 'brand' | 'influencer';
  matchedUserImage: string;
  score: number;
  timestamp: Date;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-white text-xl font-semibold">Loading BrandVu...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <LandingPage />
            } 
          />
          <Route 
            path="/auth" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <AuthPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/profile-setup" 
            element={
              user ? <ProfileSetup user={user} onUpdate={updateUser} /> : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? (
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <Dashboard user={user} />
                </>
              ) : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/swipe" 
            element={
              user ? (
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <SwipeInterface user={user} />
                </>
              ) : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              user ? (
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <Analytics user={user} />
                </>
              ) : <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/matches" 
            element={
              user ? (
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <Matches user={user} />
                </>
              ) : <Navigate to="/auth" replace />
            } 
          />

          {/* BrandView routes under feature flag and auth */}
          {user && brandViewRoutes.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={
                <>
                  <Navigation user={user} onLogout={handleLogout} />
                  <React.Suspense fallback={<div className="p-6">Loading…</div>}>
                    {r.element}
                  </React.Suspense>
                </>
              }
            />
          ))}

          {/* Fallback */}
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/'} replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App; 