import { User, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const PROFILE_EMOJIS = ['😄', '🤗', '😜', '🤩', '😁', '😎', '🕺', '🥳'];

interface UserData {
  id?: string;
  name: string;
  phone?: string;
  memberSince: string;
  location: string;
  posts: number;
  events?: number;
  rating?: number;
  profileEmoji?: string;
}

const ProfileInfoCard = ({
  user,
  editable = false,
  onUpdateProfile,
}: {
  user: UserData;
  editable?: boolean;
  onUpdateProfile?: (data: {
    name: string;
    phone: string;
    profileEmoji: string;
  }) => Promise<void>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone || '');
  const [editEmoji, setEditEmoji] = useState(user.profileEmoji || '👤');
  const [editError, setEditError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEdit = () => {
    setEditName(user.name);
    setEditPhone(user.phone || '');
    setEditEmoji(user.profileEmoji || '👤');
    setEditError('');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditPhone(user.phone || '');
    setEditEmoji(user.profileEmoji || '👤');
    setEditError('');
    setIsEditing(false);
    setShowEmojiPicker(false);
  };

  const handleSave = async () => {
    setEditError('');
    setIsLoading(true);
    try {
      if (onUpdateProfile) {
        await onUpdateProfile({
          name: editName,
          phone: editPhone,
          profileEmoji: editEmoji,
        });
      }
      setIsEditing(false);
      setShowEmojiPicker(false);
    } catch (e) {
      setEditError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-pink-300 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300'>
      <div className='flex flex-col md:flex-row items-center gap-6'>
        <div className='relative'>
          <div
            className='w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl transform cursor-pointer'
            onClick={() => isEditing && setShowEmojiPicker(!showEmojiPicker)}
          >
            <span className='text-6xl'>{editEmoji}</span>
            {isEditing && (
              <div className='absolute -top-2 -right-2 bg-pink-500 rounded-full p-1'>
                <Edit className='w-4 h-4 text-white' />
              </div>
            )}
          </div>
          {showEmojiPicker && (
            <div className='absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-lg shadow-lg p-8 z-10 border-2 border-pink-300 min-w-[280px]'>
              <div className='grid grid-cols-4 gap-6'>
                {PROFILE_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    className='text-3xl hover:scale-125 transition-transform p-4 bg-gray-50 rounded-lg hover:bg-pink-50 flex items-center justify-center w-12 h-12'
                    onClick={() => {
                      setEditEmoji(emoji);
                      setShowEmojiPicker(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='flex-1 text-center md:text-left'>
          {/* Name */}
          {isEditing ? (
            <input
              className='text-4xl font-black text-purple-800 mb-2 w-full border rounded px-3 py-2'
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              disabled={isLoading}
            />
          ) : (
            <h2 className='text-4xl font-black text-purple-800 mb-2'>
              {user.name}
            </h2>
          )}
          {/* Member Since */}
          {/* <p className='text-xl text-purple-600 mb-3'>
            Community Explorer since {user.memberSince}
          </p> */}
          {/* Location */}
          {/* <div className='flex items-center justify-center md:justify-start gap-2 mb-4'>
            <MapPin className='w-5 h-5 text-purple-500' />
            <span className='text-lg text-purple-600 font-medium'>
              {user.location}
            </span>
          </div> */}
          {/* Phone */}
          <div className='mb-4'>
            <span className='font-semibold text-purple-700 mr-2'>Phone:</span>
            {isEditing ? (
              <input
                className='border rounded px-2 py-1'
                value={editPhone}
                onChange={(e) => {
                  // Only allow digits
                  const value = e.target.value.replace(/\D/g, '');
                  setEditPhone(value);
                }}
                disabled={isLoading}
                type='tel'
                inputMode='numeric'
                pattern='[0-9]*'
                maxLength={15} // optional: limit length
              />
            ) : (
              <span>{user.phone || '-'}</span>
            )}
          </div>
          {/* Edit/Save Buttons */}
          {editable && !isEditing && (
            <Button
              className='bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200'
              onClick={handleEdit}
              disabled={isLoading}
            >
              <Edit className='w-5 h-5 mr-1' />
              Edit Profile
            </Button>
          )}
          {editable && isEditing && (
            <div className='flex gap-2 mt-2'>
              <Button
                onClick={handleSave}
                disabled={isLoading || !editName || !editPhone}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant='outline'
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          )}
          {editError && (
            <div className='text-red-500 text-sm mt-2'>{editError}</div>
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
