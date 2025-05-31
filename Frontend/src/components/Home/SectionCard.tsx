const SectionCard = ({ children, className = '' }) => (
  <section
    className={`relative z-10 container mx-auto px-6 pb-16 ${className}`}
    style={{ borderRadius: 'var(--radius)' }}
  >
    {children}
  </section>
);

export default SectionCard;
