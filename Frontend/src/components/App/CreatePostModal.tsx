import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, X } from 'lucide-react';

const categories = ['Study Group', 'Food', 'Event', 'Lost & Found', 'Other'];

const CreatePostModal = ({ open, onOpenChange }) => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
  });
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({
          ...prev,
          location: `${latitude}, ${longitude}`,
        }));
        setLoadingLocation(false);
      },
      () => setLoadingLocation(false)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit logic here
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <form
        className='bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-5 relative'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center justify-between items-center mb-2'>
          <h2 className='text-2xl font-bold  text-[var(--color-primary)]'>
            Create New Post
          </h2>
          {/* Close Button */}
          <button
            type='button'
            onClick={() => onOpenChange(false)}
            className=' text-gray-400 hover:text-gray-700 transition-colors'
            aria-label='Close'
            style={{ borderRadius: '50%' }}
          >
            <X className='w-6 h-6' />
          </button>
        </div>
        <div>
          <label
            htmlFor='post-title'
            className='block font-medium mb-1 text-[var(--color-primary)]'
          >
            Title
          </label>
          <Input
            id='post-title'
            name='title'
            placeholder='Title'
            value={form.title}
            onChange={handleChange}
            required
            style={{ borderRadius: 'var(--radius)' }}
          />
        </div>

        <div>
          <label
            htmlFor='post-category'
            className='block font-medium mb-1 text-[var(--color-primary)]'
          >
            Category
          </label>
          <select
            id='post-category'
            name='category'
            value={form.category}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border rounded-md focus:outline-none'
            style={{ borderRadius: 'var(--radius)' }}
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
          <label
            htmlFor='post-description'
            className='block font-medium mb-1 text-[var(--color-primary)]'
          >
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
            style={{ borderRadius: 'var(--radius)' }}
          />
        </div>

        <div>
          <label
            htmlFor='post-location'
            className='block font-medium mb-1 text-[var(--color-primary)]'
          >
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
              style={{ borderRadius: 'var(--radius)' }}
            />
            <Button
              type='button'
              onClick={handleUseCurrentLocation}
              disabled={loadingLocation}
              className='flex items-center gap-1 px-3 py-2'
              style={{ borderRadius: 'var(--radius)' }}
            >
              <MapPin className='w-4 h-4' />
              {loadingLocation ? '...' : 'Use Current'}
            </Button>
          </div>
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button
            type='submit'
            className='bg-[var(--color-accent)] text-white font-bold'
            style={{ borderRadius: 'var(--radius)' }}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostModal;
