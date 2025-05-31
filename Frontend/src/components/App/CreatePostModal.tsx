import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, X, Coffee, Gamepad, Book, Dumbbell, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { createPost } from '@/api/post';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const categories = ['Study Group', 'Food', 'Event', 'Lost & Found', 'Other'];

const iconOptions = [
  { name: 'Coffee', icon: Coffee },
  { name: 'Gamepad', icon: Gamepad },
  { name: 'Book', icon: Book },
  { name: 'Dumbbell', icon: Dumbbell },
];

type CreatePostModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePost: (post: any) => void;
};

// Memoize the icon buttons to prevent unnecessary re-renders
const IconButton = memo(({ name, icon: Icon, selected, onClick }: { name: string; icon: any; selected: boolean; onClick: () => void }) => (
  <button
    type='button'
    className={`p-2 rounded-full border-2 ${selected ? 'border-[var(--color-accent-primary)] bg-white shadow-lg' : 'border-transparent bg-white/70'} transition`}
    onClick={onClick}
    aria-label={name}
  >
    <Icon className='w-7 h-7' />
  </button>
));

const CreatePostModal = ({ open, onOpenChange, onCreatePost }: CreatePostModalProps) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places', 'geometry']
  });

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    icon: '',
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Default location for Thailand (Bangkok)
  const DEFAULT_LOCATION = { lat: 13.7563, lng: 100.5018 };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // Initialize Places Autocomplete
  useEffect(() => {
    if (!isLoaded || !searchInputRef.current) return;

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'th' },
        fields: ['geometry', 'formatted_address', 'name']
      });

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        if (place?.geometry?.location) {
          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          
          setSelectedLocation(newLocation);
          setForm(prev => ({
            ...prev,
            location: `${newLocation.lat}, ${newLocation.lng}`
          }));
          
          if (mapRef) {
            mapRef.panTo(newLocation);
            mapRef.setZoom(17);
          }
        }
      });
    } catch (error) {
      console.error('Error initializing Places Autocomplete:', error);
      toast.error('Failed to initialize location search. Please try again.');
    }
  }, [isLoaded, mapRef]);

  // Initialize current location when modal opens
  useEffect(() => {
    if (!isLoaded || !open || form.location) return;

    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setSelectedLocation(newLocation);
          setForm((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
          if (mapRef) {
            mapRef.panTo(newLocation);
            mapRef.setZoom(15);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          // If geolocation fails, use Thailand default
          setSelectedLocation(DEFAULT_LOCATION);
          setForm((prev) => ({
            ...prev,
            location: `${DEFAULT_LOCATION.lat}, ${DEFAULT_LOCATION.lng}`,
          }));
        },
        options
      );
    }
  }, [isLoaded, open, form.location, mapRef]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setSelectedLocation(newLocation);
      setForm(prev => ({
        ...prev,
        location: `${newLocation.lat}, ${newLocation.lng}`
      }));
      // Clear search input when manually selecting location
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
      setSearchQuery('');
    }
  }, []);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoadingLocation(true);
    
    const timeoutId = setTimeout(() => {
      setLoadingLocation(false);
      toast.error('Location request timed out. Please try again or select on map.');
    }, 5000);

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = pos.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setSelectedLocation(newLocation);
        setForm((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
        }));
        if (mapRef) {
          mapRef.panTo(newLocation);
          mapRef.setZoom(15);
        }
        setLoadingLocation(false);
        toast.success('Location set successfully!');
      },
      (error) => {
        clearTimeout(timeoutId);
        setLoadingLocation(false);
        let errorMessage = 'Failed to get location. Please select on map.';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please select location on map.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please select on map.';
            break;
        }
        
        toast.error(errorMessage);
        console.error('Geolocation error:', error);
      },
      options
    );
  }, [mapRef]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await createPost(form);
      if (response.success) {
        await onCreatePost(form);
        onOpenChange(false);
        toast.success('Post created successfully!');
      } else {
        toast.error(response.msg || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onCreatePost, onOpenChange]);

  // Show error if map fails to load
  if (loadError) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          Error loading map. Please refresh the page.
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
        <div className='bg-white p-4 rounded-lg shadow-lg'>
          Loading map...
        </div>
      </div>
    );
  }

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <form
        className='w-full max-w-md rounded-2xl shadow-2xl p-0 relative animate-slide-up text-[var(--color-primary)]'
        style={{
          background: 'linear-gradient(to bottom right, #fde68a, #f9a8d4, #a78bfa)',
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.4)',
            borderRadius: '1rem',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <div className='flex items-center justify-between p-8 pb-4'>
            <h2 className='text-2xl font-bold'>Create New Post</h2>
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className='hover:text-gray-700 transition-colors'
              aria-label='Close'
              style={{ borderRadius: '50%' }}
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          <Separator className='bg-[var(--color-accent-primary)] mb-4' />

          <div
            className='flex flex-col gap-4 px-8 py-2'
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            <div>
              <label htmlFor='post-title' className='block font-medium mb-1'>
                Title
              </label>
              <Input
                id='post-title'
                name='title'
                placeholder='Title'
                value={form.title}
                onChange={handleChange}
                required
                style={{
                  borderRadius: 'var(--radius)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              />
            </div>
            <div>
              <label htmlFor='post-category' className='block font-medium mb-1'>
                Category
              </label>
              <select
                id='post-category'
                name='category'
                value={form.category}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border rounded-md focus:outline-none'
                style={{
                  borderRadius: 'var(--radius)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              >
                <option value=''>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor='post-description' className='block font-medium mb-1'>
                Description
              </label>
              <Textarea
                id='post-description'
                name='description'
                placeholder='Description'
                value={form.description}
                onChange={handleChange}
                rows={4}
                required
                style={{
                  borderRadius: 'var(--radius)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              />
            </div>
            <div>
              <label className='block font-medium mb-1'>
                Location
              </label>
              <div className='relative mb-2'>
                <div className='flex gap-2 items-center mb-2'>
                  <div className='relative flex-1'>
                    <Input
                      ref={searchInputRef}
                      type='text'
                      placeholder='Search for a location'
                      style={{
                        borderRadius: 'var(--radius)',
                        background: 'rgba(255,255,255,0.95)',
                        paddingLeft: '2.5rem',
                      }}
                    />
                    <Search className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                  </div>
                  <Button
                    type='button'
                    onClick={handleUseCurrentLocation}
                    disabled={loadingLocation}
                    className='flex items-center gap-1 px-3 py-2'
                    style={{
                      borderRadius: 'var(--radius)',
                      background: 'var(--color-accent-primary)',
                      color: '#fff',
                    }}
                  >
                    <MapPin className='w-4 h-4' />
                    {loadingLocation ? '...' : 'Use Current'}
                  </Button>
                </div>

                <div className='h-48 rounded-lg overflow-hidden relative'>
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={selectedLocation || DEFAULT_LOCATION}
                    zoom={15}
                    onClick={handleMapClick}
                    onLoad={handleMapLoad}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                      mapTypeControl: false,
                      streetViewControl: false,
                      fullscreenControl: false,
                      gestureHandling: 'greedy'
                    }}
                  >
                    {selectedLocation && (
                      <Marker
                        position={selectedLocation}
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
                  </GoogleMap>
                  {!selectedLocation && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none'>
                      <div className='bg-white/90 px-4 py-2 rounded-full flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-blue-600' />
                        <span className='text-sm font-medium'>Search or click to set location</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <Input
                  id='post-location'
                  name='location'
                  placeholder='Location coordinates'
                  value={form.location}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: 'var(--radius)',
                    background: 'rgba(255,255,255,0.95)',
                  }}
                />
              </div>
            </div>
            <div>
              <label className='block font-medium mb-1'>Icon</label>
              <div className='flex gap-4 mb-2'>
                {iconOptions.map(({ name, icon: Icon }) => (
                  <IconButton
                    key={name}
                    name={name}
                    icon={Icon}
                    selected={form.icon === name}
                    onClick={() => setForm((prev) => ({ ...prev, icon: name }))}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-2 mt-4 px-8 pb-8'>
            <Button
              type='submit'
              className='font-bold'
              disabled={isSubmitting}
              style={{
                borderRadius: 'var(--radius)',
                background: 'var(--color-accent-primary)',
                color: '#fff',
              }}
              
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
      <style>
        {`
          .animate-slide-up {
            animation: slideUp 0.25s cubic-bezier(.4,0,.2,1);
          }
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default memo(CreatePostModal);
