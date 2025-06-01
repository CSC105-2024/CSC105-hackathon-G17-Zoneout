import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { editPost } from '@/api/post';
import { useCurrentUser } from '@/hooks/use-users';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const [showAll, setShowAll] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<any>({});
  const displayHistory = showAll ? history : history.slice(0, 5);

  // Dummy save handler, replace with API call
  const handleSave = async (activityId: number) => {
    try {
      const createdAt = new Date(editFields.createdAt);
      const expiresAt = new Date(editFields.expiresAt);

      if (createdAt >= expiresAt) {
        alert('Start time must be before the expiration time.');
        return;
      }

      const payload: any = {
        content: editFields.content,
        createdAt: editFields.createdAt,
        expiresAt: editFields.expiresAt,
      };

      await editPost(activityId, payload);
      setEditingId(null);
      queryClient.invalidateQueries(['currentUser']);
    } catch (e) {
      alert('Failed to update post');
    }
  };

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
          const isEditing = editingId === activity.id;

          return (
            <Card
              key={activity.id}
              className='p-6 border-2 border-purple-200 hover:border-purple-400 transition-all duration-200 rounded-2xl bg-gradient-to-r from-white to-purple-50 transform hover:scale-[1.02]'
            >
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                <div className='flex-1'>
                  {/* Editable Content */}
                  {isEditing ? (
                    <input
                      className='text-xl font-black text-purple-800 mb-2 w-full border-b'
                      value={editFields.content ?? activity.content}
                      onChange={(e) =>
                        setEditFields((f) => ({
                          ...f,
                          content: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <h4 className='text-xl font-black text-purple-800 mb-2'>
                      {activity.content}
                    </h4>
                  )}
                  <div className='flex flex-wrap items-center gap-4 text-sm'>
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      <Calendar className='w-4 h-4' />
                      {/* Editable Start Time */}
                      {isEditing ? (
                        <input
                          type='datetime-local'
                          className='border rounded px-1'
                          value={
                            editFields.createdAt ??
                            activity.createdAt.slice(0, 16)
                          }
                          onChange={(e) =>
                            setEditFields((f) => ({
                              ...f,
                              createdAt: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        formatDate(activity.createdAt)
                      )}
                    </span>
                    {/* Location (not editable) */}
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      <MapPin className='w-4 h-4' />
                      {activity.latitude.toFixed(4)},{' '}
                      {activity.longitude.toFixed(4)}
                    </span>
                    {/* Editable ExpiresAt */}
                    <span className='flex items-center gap-1 text-purple-600 font-medium'>
                      Expires:{' '}
                      {isEditing && !isExpired ? (
                        <input
                          type='datetime-local'
                          className='border rounded px-1'
                          value={
                            editFields.expiresAt ??
                            activity.expiresAt.slice(0, 16)
                          }
                          onChange={(e) =>
                            setEditFields((f) => ({
                              ...f,
                              expiresAt: e.target.value,
                            }))
                          }
                        />
                      ) : (
                        formatDate(activity.expiresAt)
                      )}
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={() => handleSave(activity.id)}
                        className=' hover:bg-green-800 text-white font-bold text-lg rounded-full px-6 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 bg-green-500 text-white cursor-pointer'
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        className='hover:bg-red-800 text-white font-bold text-lg rounded-full px-5 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 bg-red-500 text-white cursor-pointer'
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-600 hover:to-pink-500 text-white font-bold text-lg rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer'
                      onClick={() => {
                        setEditingId(activity.id);
                        setEditFields({
                          content: activity.content,
                          createdAt: activity.createdAt.slice(0, 16),
                          expiresAt: activity.expiresAt.slice(0, 16),
                        });
                      }}
                    >
                      Edit
                    </Button>
                  )}
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
