function EmergencySection() {
  return (
    <section className='bg-gradient-to-br from-[#ed4040] to-[#ed4040] rounded-2xl text-white text-center p-6 mb-12'>
      <h2 className='text-2xl font-bold mb-2'><span className="text-2xl">🚨</span> Emergency Features</h2>
      <p className='mb-4'>
        In case of emergency during a meetup, these features are always
        available:
      </p>
      <button className='bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg mt-2 mb-4'>
        itswarframetime@gmail.com
      </button>
      <div className='text-sm space-y-1'>
        <p>• Quick access to local emergency services</p>
        <p>• Automatic location sharing with trusted contacts</p>
        <p>• One-tap panic button with GPS coordinates</p>
      </div>
    </section>
  );
}

export default EmergencySection;