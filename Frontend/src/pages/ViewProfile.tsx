import { useParams } from 'react-router-dom';
import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/user';
import { getUserPosts } from '@/api/post';
import { Card } from '@/components/ui/card';

const ViewProfile = () => {
  const { userId } = useParams();
  
  if (!userId) {
    return (
      <div className='min-h-screen py-12 flex items-center justify-center' style={{ background: 'var(--main-bg-gradient)' }}>
        <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-pink-300 rounded-3xl shadow-2xl'>
          <h2 className='text-2xl font-bold text-red-500'>Invalid user ID</h2>
        </Card>
      </div>
    );
  }

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId,
  });

  const { data: postsData, isLoading: isPostsLoading } = useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });

  if (isUserLoading || isPostsLoading) {
    return (
      <div className='min-h-screen py-12 flex items-center justify-center' style={{ background: 'var(--main-bg-gradient)' }}>
        <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-pink-300 rounded-3xl shadow-2xl'>
          <div className='animate-pulse'>
            <div className='h-8 w-32 bg-gray-200 rounded mb-4'></div>
            <div className='h-4 w-48 bg-gray-200 rounded'></div>
          </div>
        </Card>
      </div>
    );
  }

  if (!userData?.data) {
    return (
      <div className='min-h-screen py-12 flex items-center justify-center' style={{ background: 'var(--main-bg-gradient)' }}>
        <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-pink-300 rounded-3xl shadow-2xl'>
          <h2 className='text-2xl font-bold text-red-500'>User not found</h2>
        </Card>
      </div>
    );
  }

  const user = {
    ...userData.data,
    posts: postsData?.data?.length || 0,
    memberSince: new Date(userData.data.createdAt).toLocaleDateString(),
  };

  return (
    <div className='min-h-screen py-12' style={{ background: 'var(--main-bg-gradient)' }}>
      <div className='container mx-auto px-6 relative z-10'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <ProfileInfoCard user={user} />
          <ActivityHistoryCard history={postsData?.data || []} />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
