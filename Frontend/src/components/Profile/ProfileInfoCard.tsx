import { User, MapPin, Edit, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ProfileInfoCard = ({
  user,
  editable = false,
  onEdit,
}: {
  user: any;
  editable?: boolean;
  onEdit?: () => void;
}) => (
  <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-orange-300 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300'>
    <div className='flex flex-col md:flex-row items-center gap-6'>
      <div className='w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl transform rotate-3'>
        <User className='w-16 h-16 text-white' />
      </div>
      <div className='flex-1 text-center md:text-left'>
        <h2 className='text-4xl font-black text-orange-800 mb-2'>
          {user.name}
        </h2>
        <p className='text-xl text-orange-600 mb-3'>
          Community Explorer since {user.memberSince}
        </p>
        <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
          <MapPin className='w-5 h-5 text-orange-500' />
          <span className='text-lg text-orange-700 font-medium'>
            {user.location}
          </span>
        </div>
        {editable && (
          <Button
            className='bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200'
            onClick={onEdit}
          >
            <Edit className='w-5 h-5 mr-2' />
            Edit Profile
          </Button>
        )}
      </div>
    </div>
    {/* Stats */}
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t-4 border-orange-200'>
      <div className='text-center p-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl border-2 border-orange-200'>
        <div className='text-4xl font-black text-orange-800 mb-2'>
          {user.posts}
        </div>
        <div className='text-lg text-orange-600 font-bold'>Posts Created</div>
      </div>
      <div className='text-center p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-200'>
        <div className='text-4xl font-black text-purple-800 mb-2'>
          {user.events}
        </div>
        <div className='text-lg text-purple-600 font-bold'>Events Joined</div>
      </div>
      <div className='text-center p-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl border-2 border-blue-200'>
        <div className='text-4xl font-black text-blue-800 mb-2'>
          {user.rating}
        </div>
        <div className='text-lg text-blue-600 font-bold flex items-center justify-center gap-1'>
          <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
          Rating
        </div>
      </div>
    </div>
  </Card>
);

export default ProfileInfoCard;
