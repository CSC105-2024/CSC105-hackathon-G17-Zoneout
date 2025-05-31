import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import InteractiveMap from '@/components/App/InteractiveMap';
import ProfileModal from '@/components/App/ProfileModal';
import CreatePostModal from '@/components/App/CreatePostModal';
import PostModal from '@/components/App/PostModal';

interface Post {
  title: string;
  author: string;
  description: string;
}

const samplePost: Post = {
  title: 'Study Group: Calculus',
  author: 'Alice',
  description:
    "Let's study together for the upcoming calculus exam! Meet at the library at 5pm.",
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px'
};

interface LatLng {
  lat: number;
  lng: number;
}

const defaultCenter: LatLng = {
  lat: 0,
  lng: 0
};

function MapCard() {
  const [position, setPosition] = useState<LatLng>(defaultCenter);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        console.error('Error getting location:', err);
      }
    );
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (error: Error) => {
    setLoadError(error.message);
    console.error('Error loading Google Maps:', error);
  };

  if (loadError) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Error loading map: {loadError}</p>
      </div>
    );
  }

  return (
    <div className='relative h-[calc(100vh-140px)] mx-6 mb-6 mt-4'>
      <Card className='h-full overflow-hidden border-4 border-white/50 shadow-2xl rounded-3xl transform hover:scale-[1.01] transition-transform duration-300'>
        <div className='w-full h-full relative z-0'>
          <LoadScript 
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
            onLoad={handleLoad}
            onError={handleError}
          >
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={13}
                options={{
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }]
                    }
                  ],
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: true,
                  mapTypeControl: true,
                  fullscreenControl: true
                }}
              >
                <Marker 
                  position={position}
                />
              </GoogleMap>
            )}
          </LoadScript>
        </div>
      </Card>
    </div>
  );
}

function CreatePostButton({ onClick }: { onClick: () => void }) {
  return (
    <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50'>
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
    <div className='fixed bottom-8 right-8 z-50'>
      <Card className='bg-gradient-to-r from-yellow-300 to-orange-400 backdrop-blur-sm border-4 border-white/60 px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200'>
        <span className='text-white font-black text-lg drop-shadow-md'>
          🎯 {count} POSTS NEARBY!  
        </span>
      </Card>
      {/* </Card> */}
    </div>
  );
}

const MapPage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(samplePost);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <MapCard />
      <CreatePostButton onClick={() => setShowCreatePost(true)} />
      <PostsNearbyCounter count={5} />
      <div className="z-50">
        <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
        <CreatePostModal open={showCreatePost} onOpenChange={setShowCreatePost} />
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
    </div>
  );
};

//getting error here
export default MapPage;
