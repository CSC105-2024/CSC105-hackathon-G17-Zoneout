import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'event':
      return 'bg-pink-100 text-pink-700 border-pink-200';
    case 'activity':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'support':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString() +
    ' ' +
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
}

const ActivityHistoryCard = ({ history }: { history: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayHistory = showAll ? history : history.slice(0, 5);

  return (
    <Card className='p-8 bg-white/90 backdrop-blur-sm border-4 border-purple-300 rounded-3xl shadow-2xl'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-3xl font-black text-purple-800 text-center'>
          Recent Activities
        </h3>
        {history.length > 5 && (
          <button
            className='text-purple-600 underline font-medium text-sm'
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Show Less' : 'View More'}
          </button>
        )}
      </div>
      <div className='space-y-4'>
        {displayHistory.length === 0 && (
          <div className='text-center text-purple-400'>No activity yet.</div>
        )}
        {displayHistory.map((activity) => {
          const isExpired = new Date(activity.expiresAt) < new Date();
          return (
            <Card
              key={activity.id}
              className='p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 rounded-2xl bg-gradient-to-r from-white to-purple-50 transform hover:scale-[1.02]'
            >
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div className='flex-1'>
                  <h4 className='text-xl font-black text-purple-800 mb-2'>
                    {activity.content}
                  </h4>
                  <div className='flex flex-wrap items-center gap-4 text-sm'>
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      <Calendar className='w-4 h-4' />
                      {formatDate(activity.createdAt)}
                    </span>
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      <MapPin className='w-4 h-4' />
                      {activity.latitude.toFixed(4)},{' '}
                      {activity.longitude.toFixed(4)}
                    </span>
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      Expires: {formatDate(activity.expiresAt)}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold border-2 ${getTypeColor(
                      activity.category
                    )}`}
                  >
                    {activity.category}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      isExpired
                        ? 'bg-gray-200 text-gray-600 border-2 border-gray-300'
                        : 'bg-green-100 text-green-700 border-2 border-green-200'
                    }`}
                  >
                    {isExpired ? 'Expired' : 'Active'}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityHistoryCard;
