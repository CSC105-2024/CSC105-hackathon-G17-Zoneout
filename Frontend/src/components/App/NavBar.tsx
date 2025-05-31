import { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Home,
  MapPin,
  User,
  Shield,
  LogIn,
  UserPlus,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = null; // Replace with useAuth hook
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Login', icon: <LogIn className='w-5 h-5 mr-2' />, to: '/login' },
    {
      label: 'Sign Up',
      icon: <UserPlus className='w-5 h-5 mr-2' />,
      to: '/signup',
    },
    { label: 'Map', icon: <MapPin className='w-5 h-5 mr-2' />, to: '/map' },
    {
      label: 'Safety & Privacy',
      icon: <Shield className='w-5 h-5 mr-2' />,
      to: '/safety-privacy',
    },
    {
      label: 'Profile',
      icon: <User className='w-5 h-5 mr-2' />,
      to: '/my-profile',
    },
  ];

  const handleNav = (to) => {
    setMobileOpen(false);
    navigate(to);
  };

  // Drawer JSX
  const drawer = (
    <div className='fixed inset-0 z-[9999] bg-black/40 flex justify-end md:hidden'>
      <div className='w-64 bg-white h-full shadow-lg flex flex-col p-6 gap-2 animate-slide-in-right relative'>
        <button
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors'
          onClick={() => setMobileOpen(false)}
          aria-label='Close menu'
        >
          <X className='w-7 h-7' />
        </button>
        <div className='flex items-center gap-3 mb-8 mt-2'>
          <div className='w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg rotate-12'>
            <MapPin className='w-6 h-6 text-white' />
          </div>
          <span className='text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent'>
            ZONEOUT
          </span>
        </div>
        {navLinks.map((link) => (
          <Button
            key={link.label}
            onClick={() => handleNav(link.to)}
            variant='ghost'
            className='justify-start rounded-xl w-full text-lg text-purple-800 hover:bg-[var(--nav-bg-color)]'
          >
            {link.icon}
            {link.label}
          </Button>
        ))}
      </div>
      <style>
        {`
          .animate-slide-in-right {
            animation: slideInRight 0.2s cubic-bezier(.4,0,.2,1);
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );

  return (
    <nav
      className='w-full flex items-center justify-between p-6 border-b-4 border-white/30 shadow-lg backdrop-blur-md'
      style={{ background: 'var(--nav-bg-color)' }}
    >
      {/* LOGO */}
      <div className='flex items-center gap-3' onClick={() => navigate('/')}>
        <div className='w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg rotate-12'>
          <MapPin className='w-8 h-8 text-white' />
        </div>
        <h1 className='text-4xl font-black text-white drop-shadow-lg -skew-x-6 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent'>
          ZONEOUT
        </h1>
      </div>

      {/* Desktop Nav */}
      <div className='hidden md:flex items-center gap-3 text-purple-800'>
        {navLinks.map((link) => (
          <Button
            key={link.label}
            onClick={() => navigate(link.to)}
            variant='ghost'
            className='rounded-xl hover:bg-[var(--nav-bg-color)]'
          >
            {link.icon}
            {link.label}
          </Button>
        ))}
      </div>

      {/* Mobile Hamburger */}
      <button
        className='md:hidden p-2 rounded-lg text-purple-800 hover:bg-white/20 transition'
        onClick={() => setMobileOpen((v) => !v)}
        aria-label='Open menu'
      >
        {mobileOpen ? <X className='w-7 h-7' /> : <Menu className='w-7 h-7' />}
      </button>

      {/* Mobile Drawer in Portal */}
      {mobileOpen &&
        createPortal(drawer, document.getElementById('nav-drawer-root')!)}
    </nav>
  );
};

export default NavBar;
