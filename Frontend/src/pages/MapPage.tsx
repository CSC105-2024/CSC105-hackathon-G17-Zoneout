import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InteractiveMap from '@/components/App/InteractiveMap';
import ProfileModal from '@/components/App/ProfileModal';
import CreatePostModal from '@/components/App/CreatePostModal';
import PostModal from '@/components/App/PostModal';
import { createPost, getPosts, CreatePostData } from '@/api/post';
import { toast } from 'sonner';

type Post = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  icon: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
};

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

function PostsNearbyCounter({ count }: { count: number }) {
  return (
    <div className='fixed top-8 right-8 z-20'>
      <div className='bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200'>
        <span className='text-gray-700 font-medium'>
          {count} {count === 1 ? 'Post' : 'Posts'} Nearby
        </span>
      </div>
    </div>
  );
}

// --- Main Page ---

const MapPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreatePost = async (postData: CreatePostData) => {
    try {
      setLoading(true);
      const response = await createPost(postData);
      if (response.success) {
        // Immediately increment refresh trigger
        setRefreshTrigger(prev => prev + 1);
        toast.success('Post created successfully!');
        setShowCreatePost(false);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative h-[calc(100vh-140px)] mx-6 mb-6 mt-4'>
        <Card className='h-full overflow-hidden border-4 border-white/50 shadow-2xl rounded-3xl transform hover:scale-[1.01] transition-transform duration-300'>
          <InteractiveMap 
            refreshTrigger={refreshTrigger}
            onMarkerClick={(post) => setSelectedPost(post)} 
          />
        </Card>
      </div>
      <CreatePostButton onClick={() => setShowCreatePost(true)} />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
      <CreatePostModal
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
        onCreatePost={handleCreatePost}
      />
      <PostModal
        open={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onViewProfile={() => {
          alert('View Profile clicked!');
        }}
        onJoin={() => {
          alert('Join clicked!');
        }}
      />
    </div>
  );
};

export default MapPage;
