import React from 'react';
import { Button } from '@/components/ui/button';

const PostModal = ({ open, onClose, post, onViewProfile, onJoin }) => {
  if (!open || !post) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/40'>
      <div
        className='w-full max-w-md rounded-2xl shadow-2xl p-6 pb-8 mx-4 mb-10 relative animate-slide-up bg-gradient-to-br from-pink-500 to-purple-600'
        style={{
          background:
            'linear-gradient(to bottom right, #fde68a, #f9a8d4, #a78bfa)', // matches your --main-bg-gradient
          position: 'relative',
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '1rem',
            zIndex: 0,
          }}
        />
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Close button */}
          <button
            className='absolute right-4 text-gray-400 hover:text-gray-700 transition-colors text-center px-2'
            onClick={onClose}
            aria-label='Close'
            style={{
              borderRadius: '50%',
              zIndex: 2,
              background: 'rgba(255,255,255,0.7)',
            }}
          >
            <span className='text-2xl font-bold'>x</span>
          </button>

          <h2
            className='text-2xl font-bold mb-2'
            style={{ color: 'var(--color-primary)' }}
          >
            {post.title}
          </h2>
          <div
            className='mb-2 text-sm'
            style={{ color: 'var(--color-accent-primary)' }}
          >
            by <span className='font-semibold'>{post.author}</span>
          </div>
          <div className='mb-6' style={{ color: 'var(--color-primary)' }}>
            {post.description}
          </div>
          <div className='flex gap-3'>
            <Button
              variant='outline'
              onClick={onViewProfile}
              style={{
                borderRadius: 'var(--radius)',
                background: 'rgba(255,255,255,0.95)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-accent-primary)',
              }}
            >
              View Profile
            </Button>
            <Button
              className='font-bold'
              onClick={onJoin}
              style={{
                borderRadius: 'var(--radius)',
                background: 'var(--color-accent-primary)',
                color: '#fff',
              }}
            >
              Join
            </Button>
          </div>
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
