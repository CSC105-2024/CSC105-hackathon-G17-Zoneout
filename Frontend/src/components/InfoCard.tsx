import React from 'react';
import { Card } from '@/components/ui/card';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'center' | 'left';
  className?: string;
}

const InfoCard = ({
  icon,
  title,
  description,
  variant = 'center',
  className = '',
}: InfoCardProps) => {
  const isCenter = variant === 'center';
  return (
    <Card
      className={`p-8 bg-white/90 backdrop-blur-sm border-4 border-[var(--color-card-border,#fde68a)] rounded-3xl shadow-2xl ${
        isCenter ? 'text-center' : 'text-left flex items-start gap-6'
      } ${className}`}
      style={{
        background: 'var(--color-card-bg,rgba(255,255,255,0.90))',
        borderColor: 'var(--color-card-border,#fde68a)',
        color: 'var(--color-primary,#000)',
      }}
    >
      <div
        className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6 shadow-lg text-white ${
          isCenter ? 'mx-auto' : 'flex-shrink-0'
        }`}
      >
        {icon}
      </div>
      <div>
        <h4
          className='text-xl font-black mb-4'
          style={{ color: 'var(--color-accent-primary)' }}
        >
          {title}
        </h4>
        <p
          className='font-medium'
          style={{ color: 'var(--color-accent-secondary)' }}
        >
          {description}
        </p>
      </div>
    </Card>
  );
};

export default InfoCard;
