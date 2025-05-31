import React from 'react';
import { Button } from '@/components/ui/button';

const PostModal = ({ open, onClose, post, onViewProfile, onJoin }) => {
  if (!open || !post) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/40'>
      <div className='w-full  bg-white rounded-2xl shadow-2xl p-6 pb-8 mx-10 mb-10 relative animate-slide-up'>
        {/* max-w-md */}
        {/* Close button */}
        <button
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors'
          onClick={onClose}
          aria-label='Close'
          style={{ borderRadius: '50%' }}
        >
          <span className='text-2xl font-bold'>&times;</span>
        </button>

        <h2 className='text-2xl font-bold mb-2 text-[var(--color-primary)]'>
          {post.title}
        </h2>
        <div className='mb-2 text-gray-500 text-sm'>
          by{' '}
          <span className='font-semibold text-[var(--color-accent-primary)]'>
            {post.author}
          </span>
        </div>
        <div className='mb-6 text-[var(--color-primary)]'>
          {post.description}
        </div>
        <div className='flex gap-3'>
          <Button
            variant='outline'
            onClick={onViewProfile}
            style={{ borderRadius: 'var(--radius)' }}
          >
            View Profile
          </Button>
          <Button
            className='bg-[var(--color-accent)] text-white font-bold'
            onClick={onJoin}
            style={{ borderRadius: 'var(--radius)' }}
          >
            Join
          </Button>
        </div>
      </div>

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

export default PostModal;
