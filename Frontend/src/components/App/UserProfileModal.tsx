import React from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type UserProfileModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    name: string;
    email: string;
    phone?: string;
  } | null;
};

const UserProfileModal = ({ open, onOpenChange, user }: UserProfileModalProps) => {
  if (!open || !user) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <Card className='w-full max-w-md rounded-2xl shadow-2xl p-0 relative animate-slide-up'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-2xl font-bold'>User Profile</h2>
            <button
              onClick={() => onOpenChange(false)}
              className='hover:text-gray-700 transition-colors'
              aria-label='Close'
            >
              <X className='w-6 h-6' />
            </button>
          </div>
          <Separator className='mb-6' />
          
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Name</h3>
              <p className='text-lg'>{user.name}</p>
            </div>
            
            <div>
              <h3 className='text-sm font-medium text-gray-500'>Email</h3>
              <p className='text-lg'>{user.email}</p>
            </div>
            
            {user.phone && (
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Phone</h3>
                <p className='text-lg'>{user.phone}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
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

export default UserProfileModal; 