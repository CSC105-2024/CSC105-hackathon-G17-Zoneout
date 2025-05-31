import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NavBar from '@/components/App/NavBar';
import { Outlet } from 'react-router-dom';
import DecorativeBackground from './components/DecorativeBackground';

const queryClient = new QueryClient();

const AppLayout = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <div
      className='relative overflow-hidden min-h-screen'
      style={{ background: 'var(--main-bg-gradient)' }}
    >
      <DecorativeBackground />
      <NavBar />
      {/* Dynamic navigation bar layout based on route and auth state */}
      <Outlet />
      <ReactQueryDevtools />
    </div>
  </QueryClientProvider>
);

export default AppLayout;
