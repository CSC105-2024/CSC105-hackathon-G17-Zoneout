function SafetyCard({ card }: { card: (typeof safetyCards)[0] }) {
  return (
    <div className='bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transition hover:shadow-xl hover:-translate-y-1'>
      <div className='w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mb-4'>
        {card.icon}
      </div>
      <h3 className='text-white text-xl font-bold mb-2'>{card.title}</h3>
      <p className='text-white/90 leading-relaxed text-sm'>
        {card.description}
      </p>
      <ul className='list-none mt-4 space-y-2 text-white/90 text-sm'>
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