import SectionCard from './SectionCard';
import InfoCard from '../InfoCard';
import { Calendar, Heart, MapPin, Users } from 'lucide-react';

const features = [
  {
    icon: <MapPin className='w-8 h-8' />,
    title: 'Find Friends Nearby',
    description:
      'Discover awesome people in your area who share your interests!',
  },
  {
    icon: <Users className='w-8 h-8' />,
    title: 'Join Fun Activities',
    description:
      "Coffee dates, study groups, hiking adventures - there's something for everyone!",
  },
  {
    icon: <Calendar className='w-8 h-8' />,
    title: 'Create Events',
    description: 'Start your own meetups and bring your community together!',
  },
  {
    icon: <Heart className='w-8 h-8' />,
    title: 'Build Connections',
    description: 'Make meaningful friendships and create lasting memories!',
  },
];

function FeaturesSection() {
  return (
    <SectionCard>
      <div className='max-w-6xl mx-auto'>
        <h3 className='text-4xl font-black text-white text-center mb-12 drop-shadow-lg'>
          Why You'll Love ConnectMap!
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
