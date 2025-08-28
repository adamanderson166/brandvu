import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export type BVRole = 'creator' | 'brand';

function getRole(): BVRole | undefined {
  const s: any = (window as any).BrandViewSession;
  return s?.role as BVRole | undefined;
}

export const RoleGuard: React.FC<{ required?: BVRole; children: React.ReactNode }> = ({ required, children }) => {
  const loc = useLocation();
  const role = getRole();

  // If no role yet and trying to access dashboards or matches/learn, send to onboarding
  const needsRole = loc.pathname.startsWith('/brandview/dashboard') || loc.pathname.startsWith('/brandview/matches') || loc.pathname.startsWith('/brandview/learn');
  if (!role && needsRole) {
    return <Navigate to="/brandview/onboarding" replace />;
  }

  if (required && role && role !== required) {
    // Redirect to correct dashboard when hitting the other role's dashboard
    return <Navigate to={role === 'brand' ? '/brandview/dashboard/brand' : '/brandview/dashboard/creator'} replace />;
  }

  return <>{children}</>;
};


