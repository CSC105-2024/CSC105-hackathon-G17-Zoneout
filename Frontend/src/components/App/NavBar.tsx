import { Home, MapPin, User, Shield, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; // Or auth context/hook

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { user } = useAuth(); // null if not logged in
  const user = null; // Replace later with useAuth hook

  // Decide which links to show based on route and auth
  const isHome = location.pathname === '/';
  const isMap = location.pathname === '/map';

  return (
    <nav
      className='w-full flex items-center justify-between p-6 border-b-4 border-white/30 shadow-lg backdrop-blur-md'
      style={{ background: 'var(--nav-bg-color)' }}
    >
      {/* LOGO */}
      <div className='flex items-center gap-3'>
        <div className='w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg rotate-12'>
          <MapPin className='w-8 h-8 text-white' />
        </div>
        <h1 className='text-4xl font-black text-white drop-shadow-lg -skew-x-6 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent'>
          ZONEOUT
        </h1>
      </div>

      {/* NAVIGATION LINKS */}
      <div className='flex items-center gap-3'>
        {isHome && (
          <>
            {!user && (
              <>
                <Button onClick={() => navigate('/login')} variant='ghost'>
                  <LogIn className='w-5 h-5 mr-2' /> Login
                </Button>
                <Button onClick={() => navigate('/signup')} variant='ghost'>
                  <UserPlus className='w-5 h-5 mr-2' /> Sign Up
                </Button>
              </>
            )}
            <Button onClick={() => navigate('/map')} variant='ghost'>
              <MapPin className='w-5 h-5 mr-2' /> Map
            </Button>
            <Button onClick={() => navigate('/safety-privacy')} variant='ghost'>
              <Shield className='w-5 h-5 mr-2' /> Safety & Privacy
            </Button>
            {user && (
              <Button onClick={() => navigate('/profile')} variant='ghost'>
                <User className='w-5 h-5 mr-2' /> Profile
              </Button>
            )}
          </>
        )}
        {isMap && (
          <>
            <Button onClick={() => navigate('/')} variant='ghost'>
              <Home className='w-5 h-5 mr-2' /> Home
            </Button>
            <Button onClick={() => navigate('/safety-privacy')} variant='ghost'>
              <Shield className='w-5 h-5 mr-2' /> Safety & Privacy
            </Button>
            {!user && (
              <>
                <Button onClick={() => navigate('/login')} variant='ghost'>
                  <LogIn className='w-5 h-5 mr-2' /> Login
                </Button>
                <Button onClick={() => navigate('/signup')} variant='ghost'>
                  <UserPlus className='w-5 h-5 mr-2' /> Sign Up
                </Button>
              </>
            )}
            {user && (
              <Button onClick={() => navigate('/profile')} variant='ghost'>
                <User className='w-5 h-5 mr-2' /> Profile
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
