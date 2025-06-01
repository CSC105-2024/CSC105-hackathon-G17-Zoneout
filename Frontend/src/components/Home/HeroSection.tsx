import SectionCard from './SectionCard';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

function HeroSection({ onMap }: { onMap: () => void }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/map');
  };

  return (
    <SectionCard className='py-20 text-center'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-6xl font-black text-white mb-6 drop-shadow-lg transform hover:scale-105 transition-transform duration-300'>
          Connect with Amazing People Near You!
        </h2>
        <p className='text-2xl text-white/90 mb-12 font-bold drop-shadow-md'>
          Join the most fun and friendly community platform where making friends
          is an adventure!
        </p>
        <div className='flex flex-col sm:flex-row gap-6 justify-center '>
          <Button 
            onClick={handleExplore}
            className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-105 transition-all duration-300 border-4 border-white/60 max-w-2xl  '
          >
            <span className='flex items-center gap-2'>
              <Sparkles className='inline' />
              Open The Map Now!
            </span>
          </Button>
          {/* <Button
            variant='outline'
            className='bg-white/20 backdrop-blur-sm border-4 border-white/60 text-white hover:bg-purple-800/30 px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-105 transition-all duration-300'
          >
            Learn More
          </Button> */}
        </div>
      </div>
    </SectionCard>
  );
}

export default HeroSection;
