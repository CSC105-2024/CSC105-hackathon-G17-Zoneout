import React from 'react';

const DecorativeBackground = () => (
  <div className='fixed inset-0 z-[-1] pointer-events-none bg-hidden'>
    <div className='absolute top-10 left-10 w-20 h-20 bg-orange-400 rounded-full opacity-30 animate-bounce'></div>
    <div className='absolute top-32 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-40 animate-pulse'></div>
    <div className='absolute bottom-20 left-32 w-12 h-12 bg-yellow-400 rounded-full opacity-50'></div>
    <div className='absolute bottom-40 right-10 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-bounce'></div>
  </div>
);

export default DecorativeBackground;
