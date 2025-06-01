import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { Button } from '@/components/ui/button';
import { useLogout, useUpdateProfile, useCurrentUser } from '@/hooks/use-users';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getUserPosts } from '@/api/post';

const MyProfile = () => {
  const { data: user, isLoading, error } = useCurrentUser();
  const { mutateAsync: logout, isLoading: isLogoutLoading } = useLogout();
  const { mutateAsync: updateProfile } = useUpdateProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user's posts for activity history
  const userId = user?.data?.id;
  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });

  const handleUpdateProfile = async (data: {
    name: string;
    phone: string;
    profileEmoji: string;
  }) => {
    await updateProfile({ ...data, userId: user.data.id });
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    queryClient.invalidateQueries({ queryKey: ['userPosts', userId] });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !user?.data) return <div>Error: Failed to fetch user data</div>;

  console.log('post dat', postsData);

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
            user={user.data}
            editable
            onUpdateProfile={handleUpdateProfile}
          />
          <ActivityHistoryCard
            history={isPostsLoading ? [] : postsData?.data || []}
          />
          <Button
            className='bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer'
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
