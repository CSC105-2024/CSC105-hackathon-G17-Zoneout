import { Calendar, Heart, MapPin, Users } from 'lucide-react';
import { Card } from '../ui/card';

// --- Data ---
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
    <section className='relative z-10 container mx-auto px-6 pb-16'>
      <div className='max-w-6xl mx-auto'>
        <h3 className='text-4xl font-black text-white text-center mb-12 drop-shadow-lg'>
          Why You'll Love ConnectMap!
        </h3>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='p-8 bg-white/90 backdrop-blur-sm border-4 border-orange-300 rounded-3xl shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-6 text-white'>
                  {feature.icon}
                </div>
                <h4 className='text-xl font-black text-purple-800 mb-4'>
                  {feature.title}
                </h4>
                <p className='text-purple-600 font-medium'>
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
