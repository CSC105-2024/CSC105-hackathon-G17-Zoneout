import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

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

const sampleMarkers = [
  { lat: 47.6062, lng: -122.3321, type: 'social', icon: '☕' },
  { lat: 47.6205, lng: -122.3493, type: 'activities', icon: '🏃' },
  { lat: 47.5951, lng: -122.3326, type: 'study', icon: '📚' },
  { lat: 47.6097, lng: -122.3331, type: 'entertainment', icon: '🎮' },
  { lat: 47.6145, lng: -122.3426, type: 'activities', icon: '⚽' }
];

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAQmuJNjF54qXWO6uNMEKcU0qgo7AOPicA',
    mapIds: ['4985c5491722dc8331c61a50']
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

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
    if (map) {
      map.setCenter(center);
    }
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
            label={marker.icon}
          />
        ))}
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