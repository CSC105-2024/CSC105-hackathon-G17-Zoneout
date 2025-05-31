import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InteractiveMap from '@/components/App/InteractiveMap';
import ProfileModal from '@/components/App/ProfileModal';
import CreatePostModal from '@/components/App/CreatePostModal';
import PostModal from '@/components/App/PostModal';
import { postApi, CreatePostData } from '@/services/post';
import { toast } from 'sonner';

const samplePost = {
  title: 'Study Group: Calculus',
  author: 'Alice',
  description:
    "Let's study together for the upcoming calculus exam! Meet at the library at 5pm.",
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
  const [selectedPost, setSelectedPost] = useState(samplePost);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getPosts();
        if (response.success) {
          // Transform backend post format to frontend format
          const transformedPosts = response.data.map((post: any) => ({
            title: post.content.split('\n')[0], // First line as title
            description: post.content,
            category: post.category,
            location: `${post.latitude}, ${post.longitude}`,
            icon: 'Coffee', // Default icon, you can map categories to icons
          }));
          setPosts(transformedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (postData: CreatePostData) => {
    try {
      const response = await postApi.createPost(postData);
      if (response.success) {
        // Add the new post to the list
        setPosts((prev) => [...prev, {
          title: postData.title,
          description: postData.description,
          category: postData.category,
          location: postData.location,
          icon: postData.icon,
        }]);
        toast.success('Post created successfully!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative h-[calc(100vh-140px)] mx-6 mb-6 mt-4'>
        <Card className='h-full overflow-hidden border-4 border-white/50 shadow-2xl rounded-3xl transform hover:scale-[1.01] transition-transform duration-300'>
          <InteractiveMap posts={posts} />
        </Card>
      </div>
      <CreatePostButton onClick={() => setShowCreatePost(true)} />
      <PostsNearbyCounter count={posts.length} />
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
