import React, { useState, useEffect, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, X, Coffee, Gamepad, Book, Dumbbell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

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
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    icon: 'Coffee',
  });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoadingLocation(true);
    
    // Set a timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      setLoadingLocation(false);
      toast.error('Location request timed out. Please try again or enter manually.');
    }, 5000); // 5 second timeout

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(timeoutId);
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
        }));
        setLoadingLocation(false);
        toast.success('Location set successfully!');
      },
      (error) => {
        clearTimeout(timeoutId);
        setLoadingLocation(false);
        let errorMessage = 'Failed to get location. Please enter manually.';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        
        toast.error(errorMessage);
        console.error('Geolocation error:', error);
      },
      options
    );
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onCreatePost(form);
      onOpenChange(false);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onCreatePost, onOpenChange]);

  useEffect(() => {
    if (open && !form.location && navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setForm((prev) => ({
            ...prev,
            location: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        options
      );
    }
  }, [open, form.location]);

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
              <label htmlFor='post-location' className='block font-medium mb-1'>
                Location
              </label>
              <div className='flex gap-2 items-center'>
                <Input
                  id='post-location'
                  name='location'
                  placeholder='Location'
                  value={form.location}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: 'var(--radius)',
                    background: 'rgba(255,255,255,0.95)',
                  }}
                />
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
