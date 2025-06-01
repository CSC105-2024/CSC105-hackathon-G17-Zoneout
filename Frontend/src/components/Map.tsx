import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styled from 'styled-components';
import CreatePostModal from '@/components/App/CreatePostModal';
import { userApi } from '@/services/api';

type MarkerType = 'social' | 'activities' | 'study' | 'entertainment';

interface MarkerData {
id: string;
lat: number;
lng: number;
type: MarkerType;
title?: string;
description?: string;
category?: string;
icon?: string;
}

const containerStyle = {
width: '100%',
height: '100vh'
};

const center = {
lat: 47.6062,
lng: -122.3321
};

const MapContainer = styled.div`
position: relative;
width: 100vw;
height: 100vh;
overflow: hidden;
`;

const GradientOverlay = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: linear-gradient(
  180deg, 
  rgba(216, 191, 216, 0.2) 0%,
  rgba(224, 246, 255, 0.15) 30%,
  rgba(240, 248, 255, 0.1) 60%,
  rgba(232, 248, 232, 0.15) 100%
);
pointer-events: none;
z-index: 1;
`;

const MapLegend = styled.div`
position: absolute;
top: 20px;
left: 20px;
background: rgba(255, 255, 255, 0.95);
padding: 20px;
border-radius: 15px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
z-index: 2;
backdrop-filter: blur(10px);
`;

const LegendTitle = styled.div`
font-weight: bold;
color: #8a2be2;
margin-bottom: 15px;
display: flex;
align-items: center;
gap: 8px;
`;

const LegendItem = styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 8px;
color: #8a2be2;
font-weight: 500;
`;

const LegendColor = styled.div<{ color: string }>`
width: 12px;
height: 12px;
border-radius: 50%;
background-color: ${props => props.color};
`;

const LegendNote = styled.div`
font-style: italic;
color: #9370db;
margin-top: 10px;
font-size: 12px;
`;

const CustomControls = styled.div`
position: absolute;
top: 20px;
right: 20px;
z-index: 2;
display: flex;
flex-direction: column;
gap: 10px;
`;

const ControlButton = styled.button`
width: 40px;
height: 40px;
border: none;
border-radius: 50%;
background: rgba(255, 255, 255, 0.9);
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
font-size: 18px;
color: #8a2be2;
transition: all 0.3s ease;

&:hover {
  background: white;
  transform: scale(1.1);
}
`;

const ActionBar = styled.div`
position: absolute;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
z-index: 2;
display: flex;
gap: 15px;
`;

const ActionButton = styled.button<{ variant: 'create' | 'posts' }>`
padding: 12px 24px;
border: none;
border-radius: 25px;
font-weight: bold;
cursor: pointer;
transition: all 0.3s ease;
background: ${props => props.variant === 'create' 
  ? 'linear-gradient(45deg, #98fb98, #87ceeb)'
  : 'linear-gradient(45deg, #ffd700, #ffa500)'};
color: white;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
`;

const sampleMarkers: MarkerData[] = [
{ id: '1', lat: 47.6062, lng: -122.3321, type: 'social', title: 'Coffee Meetup', category: 'Social' },
{ id: '2', lat: 47.6205, lng: -122.3493, type: 'activities', title: 'Basketball Game', category: 'Activities' },
{ id: '3', lat: 47.5951, lng: -122.3326, type: 'study', title: 'Study Group', category: 'Study' },
{ id: '4', lat: 47.6097, lng: -122.3331, type: 'entertainment', title: 'Movie Night', category: 'Entertainment' },
{ id: '5', lat: 47.6145, lng: -122.3426, type: 'activities', title: 'Yoga Class', category: 'Activities' }
];

// Simplified marker icon creation function using solid colors
const createMarkerIcon = (type: MarkerType): google.maps.Icon => {
const colors = {
  social: '#ff6b9d',
  activities: '#4ecdc4',
  study: '#ffa726',
  entertainment: '#ab47bc'
};

// Create a very simple SVG - just a colored circle with white border
const svgString = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="${colors[type]}" stroke="white" stroke-width="2"/></svg>`;

return {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgString)}`,
  scaledSize: new google.maps.Size(24, 24),
  anchor: new google.maps.Point(12, 12)
};
};

// Alternative approach using Canvas-based icons
const createCanvasMarkerIcon = (type: MarkerType): google.maps.Icon => {
const colors = {
  social: '#ff6b9d',
  activities: '#4ecdc4',  
  study: '#ffa726',
  entertainment: '#ab47bc'
};

const canvas = document.createElement('canvas');
canvas.width = 32;
canvas.height = 32;
const ctx = canvas.getContext('2d');

if (ctx) {
  // Draw circle background
  ctx.beginPath();
  ctx.arc(16, 16, 14, 0, 2 * Math.PI);
  ctx.fillStyle = colors[type];
  ctx.fill();
  
  // Draw white border
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add simple text/emoji based on type
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const symbols = {
    social: '👥',
    activities: '🏃',
    study: '📚',
    entertainment: '🎮'
  };
  
  ctx.fillText(symbols[type], 16, 16);
}

return {
  url: canvas.toDataURL(),
  scaledSize: new google.maps.Size(32, 32),
  anchor: new google.maps.Point(16, 16)
};
};

const Map: React.FC = () => {
const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: 'AIzaSyAQmuJNjF54qXWO6uNMEKcU0qgo7AOPicA',
  mapIds: ['4985c5491722dc8331c61a50']
});

const [map, setMap] = useState<google.maps.Map | null>(null);
const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
const [markers, setMarkers] = useState<MarkerData[]>(sampleMarkers);
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number } | null>(null);
const [nearbyPostsCount, setNearbyPostsCount] = useState(5);
const [useCanvasIcons, setUseCanvasIcons] = useState(false);
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await userApi.getCurrentUser();
      setUser(response.data.data);
      setError(null);
    } catch (err) {
      setError('This Post is belong to others.');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

const onLoad = useCallback((map: google.maps.Map) => {
  setMap(map);
}, []);

const onUnmount = useCallback(() => {
  setMap(null);
}, []);

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        if (map) {
          map.setCenter(location);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        if (map) {
          map.setCenter(center);
        }
        setCurrentLocation(null);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    if (map) {
      map.setCenter(center);
    }
    setCurrentLocation(null);
  }
};

const centerMap = () => {
  getCurrentLocation();
};

const handleCreateNewPost = () => {
  // Get map center as default location for new post
  if (map) {
    const center = map.getCenter();
    if (center) {
      setPendingLocation({ lat: center.lat(), lng: center.lng() });
    }
  } else {
    setPendingLocation(center);
  }
  setIsCreateModalOpen(true);
};

const zoomIn = () => {
  if (map) {
    const currentZoom = map.getZoom() || 12;
    map.setZoom(currentZoom + 1);
  }
};

const zoomOut = () => {
  if (map) {
    const currentZoom = map.getZoom() || 12;
    map.setZoom(currentZoom - 1);
  }
};

const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
  if (event.latLng) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPendingLocation({ lat, lng });
    setIsCreateModalOpen(true);
  }
}, []);

const handleCreatePost = useCallback(async (postData: any) => {
  if (!pendingLocation) return;

  // Map form categories to marker types
  const categoryToType: Record<string, MarkerType> = {
    'Study Group': 'study',
    'Food': 'social',
    'Event': 'entertainment',
    'Lost & Found': 'activities',
    'Other': 'social'
  };

  const newMarker: MarkerData = {
    id: Date.now().toString(),
    lat: pendingLocation.lat,
    lng: pendingLocation.lng,
    type: categoryToType[postData.category] || 'social',
    title: postData.title,
    description: postData.description,
    category: postData.category,
    icon: postData.icon
  };

  setMarkers(prev => [...prev, newMarker]);
  setNearbyPostsCount(prev => prev + 1);
  setPendingLocation(null);
  
  // Here you would typically also send to your backend API
  console.log('Created new post:', newMarker);
}, [pendingLocation]);

const mapOptions: google.maps.MapOptions = {
  mapId: '4985c5491722dc8331c61a50',
  disableDefaultUI: true,
  gestureHandling: 'greedy',
  styles: [
    {
      elementType: 'geometry',
      stylers: [{ color: '#f8f9fa' }]
    },
    {
      elementType: 'labels',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#e3f2fd' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'on' }]
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [{ color: '#f5f5f5' }]
    }
  ]
};

if (!isLoaded) return <div>Loading...</div>;

return (
  <MapContainer>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onMapClick}
      options={mapOptions}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={createMarkerIcon(marker.type)}
          title={marker.title}
        />
      ))}
      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={{
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#4285F4" stroke="white" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="white"/></svg>')}`,
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 12)
          }}
        />
      )}
    </GoogleMap>
    
    <GradientOverlay />
    
    <MapLegend>
      <LegendTitle><span className="text-xl">🗺️</span> MAP LEGEND</LegendTitle>
      {user && (
        <div style={{ marginBottom: '10px', color: '#8a2be2' }}>
          Welcome, {user.name}!
        </div>
      )}
      <LegendItem>
        <LegendColor color="#ff6b9d" />
        <span><span className="text-xl">👥</span> Social Meetups</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#4ecdc4" />
        <span><span className="text-xl">🏃</span> Activities</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#ffa726" />
        <span><span className="text-xl">📚</span> Study & Support</span>
      </LegendItem>
      <LegendItem>
        <LegendColor color="#ab47bc" />
        <span><span className="text-xl">🎮</span> Entertainment</span>
      </LegendItem>
      <LegendNote>Click any marker to join the fun! <span className="text-xl">🎉</span></LegendNote>
    </MapLegend>

    <CustomControls>
      <ControlButton onClick={zoomIn}>+</ControlButton>
      <ControlButton onClick={zoomOut}>−</ControlButton>
      <ControlButton onClick={centerMap}><span className="text-xl">📍</span></ControlButton>
      <ControlButton onClick={() => setUseCanvasIcons(!useCanvasIcons)}>
        {useCanvasIcons ? <span className="text-xl">🖼️</span> : <span className="text-xl">📐</span>}
      </ControlButton>
    </CustomControls>

    <ActionBar>
      <ActionButton variant="create">+ CREATE NEW POST</ActionButton>
      <ActionButton variant="posts"><span className="text-xl">😊</span> 5 POSTS NEARBY!</ActionButton>
    </ActionBar>
  </MapContainer>
);
};

export default Map;