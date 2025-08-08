import React from 'react';
import { Navigate } from 'react-router-dom';
import { flags } from '../config/flags';

import BrandViewOverview from './screens/Overview';
import BrandViewOnboarding from './screens/Onboarding';
import CreatorDashboard from './screens/CreatorDashboard';
import BrandDashboard from './screens/BrandDashboard';
import Matches from './screens/Matches';
import Learn from './screens/Learn';
import EmailMVP from './screens/EmailMVP';
import { RoleGuard } from './guards';

export const brandViewRoutes = [
  {
    path: '/brandview',
    element: flags.BRANDVIEW_MVP ? <BrandViewOverview /> : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/onboarding',
    element: flags.BRANDVIEW_MVP ? <BrandViewOnboarding /> : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/dashboard/creator',
    element: flags.BRANDVIEW_MVP ? (
      <RoleGuard required="creator"><CreatorDashboard /></RoleGuard>
    ) : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/dashboard/brand',
    element: flags.BRANDVIEW_MVP ? (
      <RoleGuard required="brand"><BrandDashboard /></RoleGuard>
    ) : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/matches',
    element: flags.BRANDVIEW_MVP ? (
      <RoleGuard><Matches /></RoleGuard>
    ) : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/learn',
    element: flags.BRANDVIEW_MVP ? (
      <RoleGuard><Learn /></RoleGuard>
    ) : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/email',
    element: flags.BRANDVIEW_MVP && flags.BRANDVIEW_EMAIL_MVP ? (
      <RoleGuard required="brand"><EmailMVP /></RoleGuard>
    ) : <Navigate to="/" replace />,
  },
];
