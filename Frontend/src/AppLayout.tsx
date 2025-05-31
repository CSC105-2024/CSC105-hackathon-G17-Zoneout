import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import NavBar from '@/components/App/NavBar';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

const AppLayout = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {/* <NavBar /> Dynamic navigation bar layout based on route and auth state */}
    <Outlet />
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default AppLayout;
