import { MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

function CTASection({ onMap }: { onMap: () => void }) {
  return (
    <section className='relative z-10 container mx-auto px-6 pb-16'>
      <Card className='max-w-4xl mx-auto p-12 bg-gradient-to-r from-white/80 to-purple-100/80 backdrop-blur-sm border-4 border-purple-300 rounded-3xl shadow-2xl text-center'>
        <h3 className='text-4xl font-black text-purple-800 mb-6'>
          Ready to Make New Friends? 🎉
        </h3>
        <p className='text-xl text-purple-600 mb-8 font-bold'>
          Join thousands of amazing people who are already connecting and having
          fun!
        </p>
        <Button
          onClick={onMap}
          className='bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-12 py-6 rounded-full shadow-2xl text-2xl font-black transform hover:scale-110 transition-all duration-300 border-4 border-white/60'
        >
          <MapPin className='w-8 h-8 mr-4' />
          Open the Map Now!
        </Button>
      </Card>
    </section>
  );
}
export default CTASection;
