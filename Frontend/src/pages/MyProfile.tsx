import { useEffect, useState } from 'react';
import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { userApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { useLogout } from '@/hooks/use-users';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: logout, isLoading: isLogoutLoading } = useLogout();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getCurrentUser();
        setUser(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div
      className='min-h-screen py-12'
      style={{
        background: 'var(--main-bg-gradient)',
        color: 'var(--color-primary)',
      }}
    >
      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <ProfileInfoCard
            user={user}
            editable
            onEdit={() => {
              /* edit logic */
              console.log('edit');
            }}
          />
          <ActivityHistoryCard history={[]} />
          <Button
            className='bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200'
            onClick={async () => {
              await logout();
              queryClient.invalidateQueries({ queryKey: ['currentUser'] });
              navigate('/login');
            }}
            disabled={isLogoutLoading}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
