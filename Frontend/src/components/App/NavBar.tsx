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
import { useCurrentUser } from '@/hooks/use-users';
import logo from '@/assets/logo.png';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', icon: 
      <Home className='w-5 h-5' />
    , to: '/' },
    { label: 'Map', icon: <MapPin className='w-5 h-5 mr-2 rounded-full border-solid border-2 border-white-800' />, to: '/map' },
    {
      label: 'Safety & Privacy',
      icon: <Shield className='w-5 h-5 mr-2' />,
      to: '/safety-privacy',
    },
    // Only show if logged in
    ...(user
      ? [
          {
            label: 'Profile',
            icon: <User className='w-5 h-5 mr-2' />,
            to: '/my-profile',
          },
        ]
      : [
          {
            label: 'Login',
            icon: <LogIn className='w-5 h-5 mr-2' />,
            to: '/login',
          },
          {
            label: 'Sign Up',
            icon: <UserPlus className='w-5 h-5 mr-2' />,
            to: '/signup',
          },
        ]),
  ];

  const handleNav = (to: string) => {
    setMobileOpen(false);
    navigate(to);
  };

  const drawer = (
    <div className='fixed inset-0 z-50 md:hidden'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/20 backdrop-blur-sm'
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div className='fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl'>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-semibold'>Menu</h2>
            <button
              className='p-2 rounded-lg hover:bg-gray-100'
              onClick={() => setMobileOpen(false)}
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          {/* Links */}
          <div className='flex-1 overflow-y-auto p-4'>
            <div className='flex flex-col gap-2'>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  onClick={() => handleNav(link.to)}
                  variant='ghost'
                  className='justify-start'
                >
                  {link.icon}
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav
      className='w-full flex items-center justify-between p-6 border-b-4 border-white/30 shadow-lg backdrop-blur-md'
      style={{ background: 'var(--nav-bg-color)' }}
    >
      {/* LOGO */}
      <div className='flex items-center gap-3' onClick={() => navigate('/')}>
        <div className='w-14 h-14 rounded-full flex items-center justify-center shadow-lg overflow-hidden'>
          <img src={logo} alt="Zoneout Logo" className='w-full h-full object-cover' />
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
