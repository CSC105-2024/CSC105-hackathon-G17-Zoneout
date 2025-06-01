import SectionCard from './SectionCard';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

function CTASection({ onMap }: { onMap: () => void }) {
  return (
    <SectionCard>
      <Card
        className='max-w-4xl mx-auto p-12 bg-gradient-to-r from-white/80 to-purple-100/80 backdrop-blur-sm border-4 border-purple-300 rounded-3xl shadow-2xl text-center flex flex-col items-center justify-center gap-10'
        style={{ color: 'var(--color-accent-primary)' }}
      >
        <h3 className='text-4xl font-black'>Ready to Make New Friends?</h3>
        <p
          className='text-xl font-bold'
          style={{ color: 'var(--color-accent-secondary)' }}
        >
          Join thousands of amazing people who are already connecting and having
          fun!
        </p>
        <Button
          onClick={onMap}
          className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-105 transition-all duration-300 border-4 max-w-2xl cursor-pointer'
        >
          <span className='flex items-center gap-2'>
            <MapPin className='inline' />
            Open the Map Now!
          </span>
        </Button>
      </Card>
    </SectionCard>
  );
}
export default CTASection;
