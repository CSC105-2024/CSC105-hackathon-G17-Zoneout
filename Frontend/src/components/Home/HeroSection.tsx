import { Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

function HeroSection({ onExplore }: { onExplore: () => void }) {
  return (
    <section className='relative z-10 container mx-auto px-6 py-16 text-center'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-6xl font-black text-white mb-6 drop-shadow-lg transform hover:scale-105 transition-transform duration-300'>
          Connect with Amazing People Near You! 🌟
        </h2>
        <p className='text-2xl text-white/90 mb-12 font-bold drop-shadow-md'>
          Join the most fun and friendly community platform where making friends
          is an adventure!
        </p>
        <div className='flex flex-col sm:flex-row gap-6 justify-center mb-16'>
          <Button
            onClick={onExplore}
            className='bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-110 transition-all duration-300 border-4 border-white/60'
          >
            <Sparkles className='w-8 h-8 mr-4' />
            Start Exploring!
          </Button>
          <Button
            variant='outline'
            className='bg-white/20 backdrop-blur-sm border-4 border-white/60 text-white hover:bg-white/30 px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-105 transition-all duration-300'
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
