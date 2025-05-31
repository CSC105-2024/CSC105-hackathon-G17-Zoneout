import { Card } from '@/components/ui/card';
import { Calendar, User, MapPin } from 'lucide-react';

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

const ActivityHistoryCard = ({ history }: { history: any[] }) => (
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

export default ActivityHistoryCard;