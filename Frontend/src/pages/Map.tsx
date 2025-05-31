import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from '@/components/App/InteractiveMap';
import ProfileModal from '@/components/App/ProfileModal';
import CreatePostModal from '@/components/App/CreatePostModal';

function MapCard() {
  return (
    <div className='relative h-[calc(100vh-140px)] mx-6 mb-6 mt-4'>
      <Card className='h-full overflow-hidden border-4 border-white/50 shadow-2xl rounded-3xl transform hover:scale-[1.01] transition-transform duration-300'>
        <InteractiveMap />
      </Card>
    </div>
  );
}

function CreatePostButton({ onClick }: { onClick: () => void }) {
  return (
    <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
      <Button
        onClick={onClick}
        className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-full shadow-2xl text-xl font-black transform hover:scale-110 transition-all duration-300 border-4 border-white/60 animate-pulse'
      >
        <Plus className='w-6 h-6 mr-3' />
        CREATE NEW POST
      </Button>
    </div>
  );
}

function PostsNearbyCounter({ count = 5 }: { count?: number }) {
  return (
    <div className='fixed bottom-8 right-8 z-20'>
      <Card className='bg-gradient-to-r from-yellow-300 to-orange-400 backdrop-blur-sm border-4 border-white/60 px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
        <span className='text-white font-black text-lg drop-shadow-md'>
          🎯 {count} POSTS NEARBY!
        </span>
      </Card>
    </div>
  );
}

// --- Main Page ---

const MapPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  // const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 relative overflow-hidden'>
      <MapCard />
      <CreatePostButton onClick={() => setShowCreatePost(true)} />
      <PostsNearbyCounter count={5} />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
      <CreatePostModal open={showCreatePost} onOpenChange={setShowCreatePost} />
    </div>
  );
};

export default MapPage;
