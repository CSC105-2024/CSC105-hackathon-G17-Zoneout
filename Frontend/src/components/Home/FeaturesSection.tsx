import SectionCard from './SectionCard';
import InfoCard from '../InfoCard';
import {  Footprints,Ghost, Calendar, Heart } from 'lucide-react';

const features = [
  {
    icon: <Ghost className='w-8 h-8' />,
    title: 'Find Friends Nearby',
    description:
      'Anti-loneliness GPS! Detects fellow humans suffering from the "surrounded by people but still lonely" syndrome within a 5km radius.',
  },
  {
    icon: <Footprints className='w-8 h-8' />,
    title: 'Join Fun Activities',
    description:
      'Cure your existential dread with strangers who get it! From silent co-working to loud karaoke - whatever your social battery needs.',
  },
  {
    icon: <Calendar className='w-8 h-8' />,
    title: 'Create Events',
    description:
      'Host gatherings for people who are tired of feeling invisible in crowds. Small groups, big vibes, zero awkward silence!',
  },
  {
    icon: <Heart className='w-8 h-8' />,
    title: 'Build Connections',
    description:
      'Solving the "alone together" paradox one meaningful conversation at a time. Because Wi-Fi connections ≠ human connections!',
  },
];

function FeaturesSection() {
  return (
    <SectionCard>
      <div className='max-w-6xl mx-auto'>
        <h3 className='text-4xl font-black text-white text-center mb-12 drop-shadow-lg'>
          Why You'll Love Zoneout!
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, idx) => (
            <InfoCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export default FeaturesSection;
