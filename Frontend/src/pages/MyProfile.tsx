import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  MapPin,
  Calendar,
  Star,
  Edit,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { user, userHistory } from '../services/data'; // Assuming you have a data file for user info

const getTypeColor = (type: string) => {
  switch (type) {
    case 'meetup':
      return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'activity':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'support':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

function ProfileInfoCard({ user }: { user: typeof user }) {
  return (
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
          <Button className='bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200'>
            <Edit className='w-5 h-5 mr-2' />
            Edit Profile
          </Button>
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
}

function ActivityHistoryCard({ history }: { history: typeof userHistory }) {
  return (
    <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-purple-300 rounded-3xl shadow-2xl'>
      <h3 className='text-3xl font-black text-purple-800 mb-6 text-center'>
        Recent Activities
      </h3>
      <div className='space-y-4'>
        {history.map((activity) => (
          <Card
            key={activity.id}
            className='p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 rounded-2xl bg-gradient-to-r from-white to-purple-50 transform hover:scale-[1.02]'
          >
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
              <div className='flex-1'>
                <h4 className='text-xl font-black text-purple-800 mb-2'>
                  {activity.title}
                </h4>
                <div className='flex flex-wrap items-center gap-4 text-sm'>
                  <span className='flex items-center gap-1 text-purple-600 font-medium'>
                    <Calendar className='w-4 h-4' />
                    {activity.date}
                  </span>
                  <span className='flex items-center gap-1 text-purple-600 font-medium'>
                    <User className='w-4 h-4' />
                    {activity.participants} participants
                  </span>
                  <span className='flex items-center gap-1 text-purple-600 font-medium'>
                    <MapPin className='w-4 h-4' />
                    {activity.location}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getTypeColor(
                    activity.type
                  )}`}
                >
                  {activity.type}
                </span>
                <span className='px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border-2 border-green-200'>
                  {activity.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

function ProfileActions() {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {/* <Button className='flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-xl py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
        View All Activities
      </Button>
      <Button className='flex-1 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold text-xl py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
        Privacy Settings
      </Button> */}
      {/* <Button className='flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold text-xl py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
        Account Settings
      </Button> */}
    </div>
  );
}

// --- Main Page ---

const MyProfile = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 relative overflow-hidden'>
      <div className='container mx-auto px-6 py-8 relative z-10'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <ProfileInfoCard user={user} />
          <ActivityHistoryCard history={userHistory} />
          <ProfileActions />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
