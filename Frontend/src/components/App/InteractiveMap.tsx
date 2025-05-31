import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import { Coffee, Gamepad, Book, Dumbbell, LocateFixed } from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Coffee,
  Gamepad,
  Book,
  Dumbbell,
};

type Post = {
  title: string;
  category: string;
  description: string;
  location: string; // 'lat, lng'
  icon: string;
};

type InteractiveMapProps = {
  posts: Post[];
};

const InteractiveMap = ({ posts }: InteractiveMapProps) => {
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

  // Helper to parse 'lat, lng' string
  const parseLatLng = (loc: string) => {
    const [lat, lng] = loc.split(',').map(Number);
    return { lat, lng };
  };

  return (
    <div className='relative w-full h-full'>
      <GoogleMap
        center={userLocation || { lat: 1.3521, lng: 103.8198 }}
        zoom={zoom}
        mapContainerClassName='w-full h-full rounded-2xl'
        onLoad={map => { mapRef.current = map; }}
        options={{ disableDefaultUI: true, zoomControl: false }}
      >
        {/* User location as a Lucide marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="10" fill="#2563eb" fill-opacity="0.8"/><circle cx="20" cy="20" r="5" fill="#fff"/></svg>`),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
        {/* Post markers with Lucide icons */}
        {posts.map((post, idx) => {
          const Icon = iconMap[post.icon] || Coffee;
          const pos = parseLatLng(post.location);
          // Render Lucide icon as SVG marker
          const svg = encodeURIComponent(
            `<svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#fff" fill-opacity="0.9"/><g transform="translate(8,8)">${Icon.render ? Icon.render({ className: 'w-32 h-32' }).props.children : ''}</g></svg>`
          );
          return (
            <Marker
              key={idx}
              position={pos}
              icon={{
                url: 'data:image/svg+xml;utf8,' + svg,
                scaledSize: new window.google.maps.Size(48, 48),
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
          <LocateFixed className='w-6 h-6 text-blue-600' />
        </button>
      </div>
    </div>
  );
};

export default InteractiveMap;
