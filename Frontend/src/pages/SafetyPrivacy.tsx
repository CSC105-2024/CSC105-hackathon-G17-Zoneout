import React from 'react';
import { safetyCards, guidelines } from '../services/data';
import EmergencySection from '@/components/Safety/EmergencySection';
import GuidelinesSection from '@/components/Safety/GuidelinesSection';
import SafetyContactSection from '@/components/Safety/SafetyContactSection';
import InfoCard from '@/components/InfoCard';

export default function SafetyPrivacyPage() {
  return (
    <div
      className='min-h-screen font-sans text-gray-800'
      style={{ background: 'linear-gradient(to bottom right, #fde68a, #f9a8d4, #a78bfa)' }}
    >
      <main className='max-w-6xl mx-auto p-6 py-15'>
        <section className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl text-gray-800 font-bold mb-4 drop-shadow-md'>
            Your Safety is Our Priority
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            ConnectMap is built with comprehensive safety and privacy features
            to ensure you can explore, connect, and create meaningful
            relationships with complete peace of mind.
          </p>
        </section>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {safetyCards.map((card) => {
            const Icon = card.icon;
            return (
              <InfoCard
                key={card.title}
                icon={<Icon size={32} />}
                title={card.title}
                description={card.description}
                variant={'left'}
              />
            );
          })}
        </div>

        <EmergencySection />
        <GuidelinesSection />
        <SafetyContactSection />
      </main>
    </div>
  );
}
