import { guidelines } from '../../services/data';

function GuidelinesSection() {
  return (
    <section className='bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-12'>
      <h2 className='text-white text-2xl text-center font-bold mb-6'>
        Community Safety Guidelines
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {guidelines.map((item) => (
          <div
            key={item.title}
            className='bg-white/10 border-l-4 border-purple-600 rounded-xl p-4'
          >
            <h3 className='text-white font-semibold mb-1'>{item.title}</h3>
            <p className='text-white/80 text-sm'>{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default GuidelinesSection;
