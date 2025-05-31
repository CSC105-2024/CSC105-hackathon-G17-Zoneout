// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { MapPin, X } from 'lucide-react';

// const categories = ['Study Group', 'Food', 'Event', 'Lost & Found', 'Other'];

// const CreatePostModal = ({ open, onOpenChange }) => {
//   const [form, setForm] = useState({
//     title: '',
//     category: '',
//     description: '',
//     location: '',
//   });
//   const [loadingLocation, setLoadingLocation] = useState(false);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUseCurrentLocation = () => {
//     if (!navigator.geolocation) return;
//     setLoadingLocation(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setForm((prev) => ({
//           ...prev,
//           location: `${latitude}, ${longitude}`,
//         }));
//         setLoadingLocation(false);
//       },
//       () => setLoadingLocation(false)
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: submit logic here
//     onOpenChange(false);
//   };

//   if (!open) return null;

//   return (
//     <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
//       <form
//         className='bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-5 relative'
//         onSubmit={handleSubmit}
//       >
//         <div className='flex items-center justify-between items-center mb-2'>
//           <h2 className='text-2xl font-bold  text-[var(--color-primary)]'>
//             Create New Post
//           </h2>
//           {/* Close Button */}
//           <button
//             type='button'
//             onClick={() => onOpenChange(false)}
//             className=' text-gray-400 hover:text-gray-700 transition-colors'
//             aria-label='Close'
//             style={{ borderRadius: '50%' }}
//           >
//             <X className='w-6 h-6' />
//           </button>
//         </div>
//         <div>
//           <label
//             htmlFor='post-title'
//             className='block font-medium mb-1 text-[var(--color-primary)]'
//           >
//             Title
//           </label>
//           <Input
//             id='post-title'
//             name='title'
//             placeholder='Title'
//             value={form.title}
//             onChange={handleChange}
//             required
//             style={{ borderRadius: 'var(--radius)' }}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor='post-category'
//             className='block font-medium mb-1 text-[var(--color-primary)]'
//           >
//             Category
//           </label>
//           <select
//             id='post-category'
//             name='category'
//             value={form.category}
//             onChange={handleChange}
//             required
//             className='w-full px-3 py-2 border rounded-md focus:outline-none'
//             style={{ borderRadius: 'var(--radius)' }}
//           >
//             <option value=''>Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label
//             htmlFor='post-description'
//             className='block font-medium mb-1 text-[var(--color-primary)]'
//           >
//             Description
//           </label>
//           <Textarea
//             id='post-description'
//             name='description'
//             placeholder='Description'
//             value={form.description}
//             onChange={handleChange}
//             rows={4}
//             required
//             style={{ borderRadius: 'var(--radius)' }}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor='post-location'
//             className='block font-medium mb-1 text-[var(--color-primary)]'
//           >
//             Location
//           </label>
//           <div className='flex gap-2 items-center'>
//             <Input
//               id='post-location'
//               name='location'
//               placeholder='Location'
//               value={form.location}
//               onChange={handleChange}
//               required
//               style={{ borderRadius: 'var(--radius)' }}
//             />
//             <Button
//               type='button'
//               onClick={handleUseCurrentLocation}
//               disabled={loadingLocation}
//               className='flex items-center gap-1 px-3 py-2'
//               style={{ borderRadius: 'var(--radius)' }}
//             >
//               <MapPin className='w-4 h-4' />
//               {loadingLocation ? '...' : 'Use Current'}
//             </Button>
//           </div>
//         </div>

//         <div className='flex justify-end gap-2 mt-4'>
//           <Button
//             type='submit'
//             className='bg-[var(--color-accent-primary)] text-white font-bold'
//             style={{ borderRadius: 'var(--radius)' }}
//           >
//             Create
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreatePostModal;
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
        className='w-full max-w-md rounded-2xl shadow-2xl p-0 relative animate-slide-up text-[var(--color-primary)]'
        style={{
          background:
            'linear-gradient(to bottom right, #fde68a, #f9a8d4, #a78bfa)',
        }}
        onSubmit={handleSubmit}
      >
        {/* Overlay for readability */}
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
            <h2 className='text-2xl font-bold '>Create New Post</h2>
            {/* Close Button */}
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className=' hover:text-gray-700 transition-colors'
              aria-label='Close'
              style={{ borderRadius: '50%' }}
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          {/* Horizontal line */}
          {/* <hr className='border-t border-[var(--color-accent-primary,#6B21A8)] mx-8' /> */}
          <Separator className='bg-[var(--color-accent-primary)] mb-4' />

          {/* Scrollable form content */}
          <div
            className='flex flex-col gap-4 px-8 py-2'
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            <div>
              <label htmlFor='post-title' className='block font-medium mb-1 '>
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
              <label
                htmlFor='post-description'
                className='block font-medium mb-1 '
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
                style={{
                  borderRadius: 'var(--radius)',
                  background: 'rgba(255,255,255,0.95)',
                }}
              />
            </div>
            <div>
              <label
                htmlFor='post-location'
                className='block font-medium mb-1 '
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
          </div>
          <div className='flex justify-end gap-2 mt-4 px-8 pb-8'>
            <Button
              type='submit'
              className='font-bold'
              style={{
                borderRadius: 'var(--radius)',
                background: 'var(--color-accent-primary)',
                color: '#fff',
              }}
            >
              Create
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

export default CreatePostModal;
