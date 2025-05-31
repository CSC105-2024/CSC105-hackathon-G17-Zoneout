import { useEffect, useState } from 'react';
import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { userApi } from '@/services/api';

const MyProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
