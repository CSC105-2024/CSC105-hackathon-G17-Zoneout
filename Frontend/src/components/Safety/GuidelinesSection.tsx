import { guidelines } from '../../services/data';

function GuidelinesSection() {
  return (
    <section className='rounded-2xl p-6 mb-12'>
      <h2
        className='text-2xl text-center font-bold mb-6'
        style={{ color: 'var(--color-secondary)' }}
      >
        Community Safety Guidelines
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {guidelines.map((item) => (
          <div
            key={item.title}
            className='rounded-xl p-4'
            style={{
              background: 'var(--color-card-bg)',
              borderLeft: '4px solid var(--color-accent-primary)',
              color: 'var(--color-primary)',
            }}
          >
            <h3
              className='font-semibold mb-5'
              style={{ color: 'var(--color-accent-primary)' }}
            >
              <span className="text-xl">{item.title}</span>
            </h3>
            <p
              className='text-sm'
              style={{ color: 'var(--color-accent-secondary)' }}
            >
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default GuidelinesSection;