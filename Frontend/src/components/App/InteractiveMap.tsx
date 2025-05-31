import { useLoadScript, GoogleMap, Marker, Circle } from '@react-google-maps/api';
import { useState, useEffect, useMemo, useRef } from 'react';
import { Users, Activity, BookOpen, PartyPopper } from 'lucide-react';

// Sample post data (replace with your real data source)
const posts = [
  { id: 1, type: 'social', position: { lat: 1.353, lng: 103.819 } },
  { id: 2, type: 'activity', position: { lat: 1.352, lng: 103.818 } },
  { id: 3, type: 'study', position: { lat: 1.351, lng: 103.82 } },
  { id: 4, type: 'entertainment', position: { lat: 1.354, lng: 103.821 } },
];

const markerIcons: { [key: string]: React.ReactNode } = {
  social: <Users className="w-6 h-6 text-purple-600" />,
  activity: <Activity className="w-6 h-6 text-blue-600" />,
  study: <BookOpen className="w-6 h-6 text-green-600" />,
  entertainment: <PartyPopper className="w-6 h-6 text-orange-600" />,
};

const InteractiveMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [zoom, setZoom] = useState(15);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err)
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Center map on user location when available
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
    }
  }, [userLocation]);

  if (!isLoaded) {
    return (
      <div className='w-full h-full flex items-center justify-center text-gray-400 bg-white/50 rounded-2xl'>
        Loading map...
      </div>
    );
  }

  return (
    <div className='relative w-full h-full'>
      <GoogleMap
        center={userLocation || { lat: 1.3521, lng: 103.8198 }}
        zoom={zoom}
        mapContainerClassName='w-full h-full rounded-2xl'
        onLoad={map => { mapRef.current = map; }}
        options={{ disableDefaultUI: true, zoomControl: false }}
      >
        {/* User location as a circle */}
        {userLocation && (
          <Circle
            center={userLocation}
            radius={30}
            options={{
              fillColor: '#7C3AED',
              fillOpacity: 0.4,
              strokeColor: '#7C3AED',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}
        {/* Post markers */}
        {posts.map(post => {
          const icon = markerIcons[post.type];
          return (
            <Marker
              key={post.id}
              position={post.position}
              label={{
                text: icon ? '' : post.type.charAt(0).toUpperCase(),
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: post.type === 'social' ? '#9333EA' : 
                          post.type === 'activity' ? '#2563EB' :
                          post.type === 'study' ? '#16A34A' : '#EA580C',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />
          );
        })}
      </GoogleMap>
      {/* Zoom and locate controls */}
      <div className='absolute top-4 right-4 flex flex-col gap-2 z-10'>
        <button
          className='w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition'
          onClick={() => setZoom(z => Math.min(z + 1, 21))}
        >
          +
        </button>
        <button
          className='w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition'
          onClick={() => setZoom(z => Math.max(z - 1, 1))}
        >
          -
        </button>
        <button
          className='w-10 h-10 rounded-full bg-white/80 text-xl shadow hover:bg-white transition flex items-center justify-center'
          title='Center on my location'
          onClick={() => {
            if (userLocation && mapRef.current) {
              mapRef.current.panTo(userLocation);
              setZoom(17); // or your preferred zoom level
            }
          }}
        >
          <span role='img' aria-label='locate'>📍</span>
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
