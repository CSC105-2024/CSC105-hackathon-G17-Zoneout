import ProfileInfoCard from '@/components/Profile/ProfileInfoCard';
import ActivityHistoryCard from '@/components/Profile/ActivityHistoryCard';
import { user, userHistory } from '../services/data';

const MyProfile = () => (
  <div className='container mx-auto px-6 py-8 relative z-10'>
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
);

export default MyProfile;
