import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Users, Calendar, Heart, Sparkles, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/App/NavBar';
import HeroSection from '@/components/Home/HeroSection';
import FeaturesSection from '@/components/Home/FeaturesSection';
import CTASection from '@/components/Home/CTASection';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection onExplore={() => navigate('/map')} />
      <FeaturesSection />
      <CTASection onMap={() => navigate('/map')} />
    </div>
  );
};

export default HomePage;
