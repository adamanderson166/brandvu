import React from 'react';
import { Navigate } from 'react-router-dom';
import { flags } from '../config/flags';

// Lazy-loadable component placeholders. Implemented in MVP using mock data
const BrandViewOverview = React.lazy(() => import('./screens/Overview'));
const BrandViewOnboarding = React.lazy(() => import('./screens/Onboarding'));
const CreatorDashboard = React.lazy(() => import('./screens/CreatorDashboard'));
const BrandDashboard = React.lazy(() => import('./screens/BrandDashboard'));
const Matches = React.lazy(() => import('./screens/Matches'));
const Learn = React.lazy(() => import('./screens/Learn'));

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
    element: flags.BRANDVIEW_MVP ? <CreatorDashboard /> : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/dashboard/brand',
    element: flags.BRANDVIEW_MVP ? <BrandDashboard /> : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/matches',
    element: flags.BRANDVIEW_MVP ? <Matches /> : <Navigate to="/" replace />,
  },
  {
    path: '/brandview/learn',
    element: flags.BRANDVIEW_MVP ? <Learn /> : <Navigate to="/" replace />,
  },
];
