import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { user, userHistory } from '../services/data';

const MyProfile = () => (
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
        <ActivityHistoryCard history={userHistory} />
      </div>
    </div>
  </div>
);

export default MyProfile;
