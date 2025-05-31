function SafetyContactSection() {
  return (
    <div className='text-center text-white mt-12'>
      <h2 className='text-2xl font-bold mb-2'>Questions or Concerns?</h2>
      <p className='text-white/80 mb-4'>Our safety team is here to help 24/7</p>
      <div className='flex flex-wrap gap-4 justify-center'>
        <button className='btn btn-primary'>Contact Safety Team</button>
        <button className='btn btn-secondary'>View Privacy Policy</button>
        <button className='btn btn-secondary'>Community Guidelines</button>
      </div>
    </div>
  );
}

export default SafetyContactSection;
