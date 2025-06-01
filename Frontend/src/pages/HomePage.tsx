import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import CTASection from '@/components/Home/CTASection';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection onMap={() => navigate('/safety-privacy')} />
      <FeaturesSection />
      <CTASection onMap={() => navigate('/map')} />
    </div>
  );
};

export default HomePage;
