import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewProfile from './pages/ViewProfile';
import NotFound from './pages/NotFound';
import SafetyPrivacyPage from './pages/SafetyPrivacy';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import AppLayout from './AppLayout';
import MapPage from './pages/Map';
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Main layout component
    children: [
      { path: '', element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'profile', element: <ViewProfile /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'safety-privacy', element: <SafetyPrivacyPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
