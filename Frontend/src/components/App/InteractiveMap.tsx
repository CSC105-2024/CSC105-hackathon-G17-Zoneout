// import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
// import { useState, useEffect, useRef } from 'react';
// import { Coffee, Gamepad, Book, Dumbbell, LocateFixed } from 'lucide-react';

// // Define the icon paths manually or use a helper function
// const iconPaths: { [key: string]: string } = {
//   Coffee: 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3',
//   Gamepad: 'M6 11.5a2.5 2.5 0 0 1 2.5-2.5H10a2.5 2.5 0 0 1 0 5H8.5A2.5 2.5 0 0 1 6 11.5ZM14 9h4l-2 7h-4l2-7ZM6 9H2l2 7h4l-2-7Z',
//   Book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M8 7h8M8 11h8',
//   Dumbbell: 'M14.4 14.4 9.6 9.6M17.5 4.5l2 2L22 4l-2-2-2.5 2.5ZM9.5 14.5l-5 5-2-2 5-5 2 2ZM14.5 9.5l5-5 2 2-5 5-2-2ZM4.5 17.5l2 2L4 22l-2-2 2.5-2.5Z',
// };

// // Alternative: Get SVG content from rendered Lucide icons
// const getLucideIconSVG = (IconComponent: any): string => {
//   // Create a temporary div to render the icon
//   // const tempDiv = document.createElement('div');
//   // const iconElement = IconComponent({ size: 24 });
  
//   // For Lucide icons, we can extract the path data
//   // This is a more robust approach
//   switch (IconComponent.name || IconComponent.displayName) {
//     case 'Coffee':
//       return 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3';
//     case 'Gamepad':
//       return 'M6 11.5a2.5 2.5 0 0 1 2.5-2.5H10a2.5 2.5 0 0 1 0 5H8.5A2.5 2.5 0 0 1 6 11.5ZM14 9h4l-2 7h-4l2-7ZM6 9H2l2 7h4l-2-7Z';
//     case 'Book':
//       return 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M8 7h8M8 11h8';
//     case 'Dumbbell':
//       return 'M14.4 14.4 9.6 9.6M17.5 4.5l2 2L22 4l-2-2-2.5 2.5ZM9.5 14.5l-5 5-2-2 5-5 2 2ZM14.5 9.5l5-5 2 2-5 5-2-2ZM4.5 17.5l2 2L4 22l-2-2 2.5-2.5Z';
//     default:
//       return 'M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8ZM6 1v3M10 1v3M14 1v3';
//   }
// };

// const iconMap: { [key: string]: any } = {
//   Coffee,
//   Gamepad,
//   Book,
//   Dumbbell,
// };

// type Post = {
//   title: string;
//   category: string;
//   description: string;
//   location: string; // 'lat, lng'
//   icon: string;
// };

// type InteractiveMapProps = {
//   posts: Post[];
// };

// const InteractiveMap = ({ posts }: InteractiveMapProps) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
//   });
//   const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
//   const [zoom, setZoom] = useState(15);
//   const mapRef = useRef<google.maps.Map | null>(null);

//   // Track user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       const watchId = navigator.geolocation.watchPosition(
//         (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
//         (err) => console.error(err)
//       );
//       return () => navigator.geolocation.clearWatch(watchId);
//     }
//   }, []);

//   // Center map on user location when available
//   useEffect(() => {
//     if (userLocation && mapRef.current) {
//       mapRef.current.panTo(userLocation);
//     }
//   }, [userLocation]);

//   if (!isLoaded) {
//     return (
//       <div className='w-full h-full flex items-center justify-center text-gray-400 bg-white/50 rounded-2xl'>
//         Loading map...
//       </div>
//     );
//   }

//   // Helper to parse 'lat, lng' string
//   const parseLatLng = (loc: string) => {
//     const [lat, lng] = loc.split(',').map(Number);
//     return { lat, lng };
//   };

//   return (
//     <div className='relative w-full h-full'>
//       <GoogleMap
//         center={userLocation || { lat: 1.3521, lng: 103.8198 }}
//         zoom={zoom}
//         mapContainerClassName='w-full h-full rounded-2xl'
//         onLoad={map => { mapRef.current = map; }}
//         options={{ disableDefaultUI: true, zoomControl: false }}
//       >
//         {/* User location marker */}
//         {userLocation && (
//           <Marker
//             position={userLocation}
//             icon={{
//               url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
//                 <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="15" cy="15" r="12" fill="#4285f4" stroke="#ffffff" stroke-width="3"/>
//                   <circle cx="15" cy="15" r="4" fill="#ffffff"/>
//                 </svg>
//               `),
//               scaledSize: new window.google.maps.Size(30, 30),
//               anchor: new window.google.maps.Point(15, 15),
//             }}
//           />
//         )}
        
//         {/* Post markers with Lucide icons */}
//         {posts.map((post, idx) => {
//           // const selectedIcon = iconMap[post.icon] || Coffee;
//           const pos = parseLatLng(post.location);
          
//           // Get the SVG path for the selected icon
//           const iconPath = getLucideIconSVG(iconMap[post.icon]) || iconPaths.Coffee;
          
//           return (
//             <Marker
//               key={idx}
//               position={pos}
//               icon={{
//                 url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
//                   <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
//                     <g transform="translate(12,12)">
//                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                         <path d="${iconPath}"/>
//                       </svg>
//                     </g>
//                   </svg>
//                 `),
//                 scaledSize: new window.google.maps.Size(48, 48),
//                 anchor: new window.google.maps.Point(24, 24),
//               }}
//             />
//           );
//         })}
//       </GoogleMap>
      
//       {/* Zoom and locate controls */}
//       <div className='absolute top-4 right-4 flex flex-col gap-2 z-10'>
//         <button
//           className='w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition'
//           onClick={() => setZoom(z => Math.min(z + 1, 21))}
//         >
//           +
//         </button>
//         <button
//           className='w-10 h-10 rounded-full bg-white/80 text-2xl font-bold shadow hover:bg-white transition'
//           onClick={() => setZoom(z => Math.max(z - 1, 1))}
//         >
//           -
//         </button>
//         <button
//           className='w-10 h-10 rounded-full bg-white/80 text-xl shadow hover:bg-white transition flex items-center justify-center'
//           title='Center on my location'
//           onClick={() => {
//             if (userLocation && mapRef.current) {
//               mapRef.current.panTo(userLocation);
//               setZoom(17);
//             }
//           }}
//         >
//           <LocateFixed className='w-6 h-6 text-blue-600' />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InteractiveMap;


import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';
import { Coffee, Gamepad, Book, Dumbbell, LocateFixed } from 'lucide-react';
import { createRoot } from 'react-dom/client';

// Helper function to convert React icon to SVG string
const iconToSVG = (IconComponent: any): Promise<string> => {
  return new Promise((resolve) => {
    // Create a temporary div
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.visibility = 'hidden';
    document.body.appendChild(tempDiv);

    // Create a root and render the icon
    const root = createRoot(tempDiv);
    root.render(
      <IconComponent 
        size={24} 
        strokeWidth={2} 
        stroke="currentColor" 
        fill="none"
      />
    );

    // Give React time to render, then extract the SVG
    setTimeout(() => {
      const svgElement = tempDiv.querySelector('svg');
      if (svgElement) {
        // Get the inner content (paths, circles, etc.) without the svg wrapper
        const innerHTML = svgElement.innerHTML;
        resolve(innerHTML);
      } else {
        // Fallback
        resolve('<circle cx="12" cy="12" r="8" />');
      }
      
      // Cleanup
      root.unmount();
      document.body.removeChild(tempDiv);
    }, 10);
  });
};

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
  const [iconSVGs, setIconSVGs] = useState<{ [key: string]: string }>({});

  // Pre-generate SVG strings for all icons
  useEffect(() => {
    const generateIconSVGs = async () => {
      const svgs: { [key: string]: string } = {};
      
      for (const [key, IconComponent] of Object.entries(iconMap)) {
        try {
          svgs[key] = await iconToSVG(IconComponent);
        } catch (error) {
          console.warn(`Failed to generate SVG for ${key}:`, error);
          svgs[key] = '<circle cx="12" cy="12" r="8" />'; // Fallback
        }
      }
      
      setIconSVGs(svgs);
    };

    if (isLoaded) {
      generateIconSVGs();
    }
  }, [isLoaded]);

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
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" fill="#4285f4" stroke="#ffffff" stroke-width="3"/>
                  <circle cx="15" cy="15" r="4" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(30, 30),
              anchor: new window.google.maps.Point(15, 15),
            }}
          />
        )}
        
        {/* Post markers with Lucide icons */}
        {posts.map((post, idx) => {
          const pos = parseLatLng(post.location);
          const iconContent = iconSVGs[post.icon] || iconSVGs.Coffee || '<circle cx="12" cy="12" r="8" />';
          
          function handleMarkerClick(post: Post): ((e: google.maps.MapMouseEvent) => void) | undefined {
            return (e: google.maps.MapMouseEvent) => {
              e.stop();
              console.log(post);
            };
          }
          return (
            <Marker
              onClick={handleMarkerClick(post)}
              key={idx}
              position={pos}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="22" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
                    <g transform="translate(12,12)">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${iconContent}
                      </svg>
                    </g>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 24),
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
              setZoom(17);
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