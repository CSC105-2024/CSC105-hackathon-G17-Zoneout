import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

type MarkerType = 'social' | 'activities' | 'study' | 'entertainment';

interface MarkerData {
  lat: number;
  lng: number;
  type: MarkerType;
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
    rgba(216, 191, 216, 0.2) 0%,     /* Reduced opacity */
    rgba(224, 246, 255, 0.15) 30%,    /* Reduced opacity */
    rgba(240, 248, 255, 0.1) 60%,     /* Reduced opacity */
    rgba(232, 248, 232, 0.15) 100%    /* Reduced opacity */
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
  { lat: 47.6062, lng: -122.3321, type: 'social' },
  { lat: 47.6205, lng: -122.3493, type: 'activities' },
  { lat: 47.5951, lng: -122.3326, type: 'study' },
  { lat: 47.6097, lng: -122.3331, type: 'entertainment' },
  { lat: 47.6145, lng: -122.3426, type: 'activities' }
];

const createMarkerIcon = (type: MarkerType) => {
  const svgString = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="${type === 'social' ? '#ff6b9d' : 
        type === 'activities' ? '#4ecdc4' : 
        type === 'study' ? '#ffa726' : 
        '#ab47bc'}" />
      ${type === 'social' ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/>' :
        type === 'activities' ? '<path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" fill="white"/>' :
        type === 'study' ? '<path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" fill="white"/>' :
        '<path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>'}
    </svg>
  `;

  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`,
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20)
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
          // Fallback to default center if geolocation fails
          if (map) {
            map.setCenter(center);
          }
          setCurrentLocation(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to default center if geolocation is not supported
      if (map) {
        map.setCenter(center);
      }
      setCurrentLocation(null);
    }
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

  const centerMap = () => {
    getCurrentLocation();
  };

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
        options={mapOptions}
      >
        {sampleMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={createMarkerIcon(marker.type)}
          />
        ))}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={{
              url: `data:image/svg+xml;utf8,${encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#4285F4" />
                  <circle cx="12" cy="12" r="6" fill="white" />
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20)
            }}
          />
        )}
      </GoogleMap>
      
      <GradientOverlay />
      
      <MapLegend>
        <LegendTitle>🗺️ MAP LEGEND</LegendTitle>
        <LegendItem>
          <LegendColor color="#ff6b9d" />
          <span>👥 Social Meetups</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#4ecdc4" />
          <span>🏃 Activities</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#ffa726" />
          <span>📚 Study & Support</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color="#ab47bc" />
          <span>🎮 Entertainment</span>
        </LegendItem>
        <LegendNote>Click any marker to join the fun! 🎉</LegendNote>
      </MapLegend>

      <CustomControls>
        <ControlButton onClick={zoomIn}>+</ControlButton>
        <ControlButton onClick={zoomOut}>−</ControlButton>
        <ControlButton onClick={centerMap}>📍</ControlButton>
      </CustomControls>

      <ActionBar>
        <ActionButton variant="create">+ CREATE NEW POST</ActionButton>
        <ActionButton variant="posts">😊 5 POSTS NEARBY!</ActionButton>
      </ActionBar>
    </MapContainer>
  );
};

export default Map; 