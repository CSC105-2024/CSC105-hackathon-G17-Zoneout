import { User, MapPin, Edit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { userApi } from '@/services/api';

interface UserData {
  id?: string;  // Optional since mock data doesn't have it
  name: string;
  memberSince: string;
  location: string;
  posts: number;
  events?: number;
  rating?: number;
}

const ProfileInfoCard = ({
  user,
  editable = false,
  onEdit,
}: {
  user: UserData;
  editable?: boolean;
  onEdit?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateUsername = async (newName: string) => {
    if (!user.id) {
      console.error('Cannot update username: No user ID available');
      return;
    }

    try {
      setIsLoading(true);
      await userApi.updateName(user.id, newName);
      
      if (onEdit) {
        onEdit();
      }
    } catch (error) {
      console.error('Error updating username:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-pink-300 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300'>
      <div className='flex flex-col md:flex-row items-center gap-6'>
        <div className='w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl transform'>
          <User className='w-16 h-16 text-white' />
        </div>
        <div className='flex-1 text-center md:text-left'>
          <h2 className='text-4xl font-black text-purple-800 mb-2'>
            {user.name}
          </h2>
          <p className='text-xl text-purple-600 mb-3'>
            Community Explorer since {user.memberSince}
          </p>
          <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
            <MapPin className='w-5 h-5 text-purple-500' />
            <span className='text-lg text-purple-600 font-medium'>
              {user.location}
            </span>
          </div>
          {editable && (
            <Button
              className='bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200'
              onClick={async () => {
                const newName = prompt('Enter new username:', user.name);
                if (newName && newName !== user.name) {
                  await updateUsername(newName);
                }
              }}
              disabled={isLoading}
            >
              <Edit className='w-5 h-5 mr-1' />
              {isLoading ? 'Updating...' : 'Edit Profile'}
            </Button>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-8 pt-8 border-t-4 border-pink-200'>
        <div className='text-center p-4 bg-gradient-to-br from-yellow-100/50 to-orange-200/50 rounded-2xl border-2 border-orange-200 px-20 w-full md:w-auto'>
          <div className='text-4xl font-black text-orange-800 mb-2'>
            {user.posts}
          </div>
          <div className='text-lg text-orange-600 font-bold'>Posts Created</div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileInfoCard;
