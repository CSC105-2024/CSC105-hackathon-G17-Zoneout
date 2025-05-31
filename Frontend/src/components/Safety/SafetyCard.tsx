function SafetyCard({ card }: { card: (typeof safetyCards)[0] }) {
  return (
    <div
      className='p-8 rounded-3xl shadow-2xl border-4'
      style={{
        background: 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)',
        color: 'var(--color-primary)',
      }}
    >
      <div className='w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-4'>
        {card.icon}
      </div>
      <h3
        className='text-xl font-bold mb-2'
        style={{ color: 'var(--color-accent-primary)' }}
      >
        {card.title}
      </h3>
      <p
        className='leading-relaxed text-sm mb-2'
        style={{ color: 'var(--color-accent-secondary)' }}
      >
        {card.description}
      </p>
      <ul className='list-none mt-4 space-y-2 text-sm'>
        {card.features.map((feature, idx) => (
          <li key={idx} className='pl-6 relative'>
            <span className='absolute left-0 text-green-400 font-bold'>✓</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SafetyCard;
