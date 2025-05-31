import { ReactNode } from 'react';
// import your theme provider and logo if you have them

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div
    className='min-h-screen flex items-center justify-center '
    style={{ color: 'var(--color-accent-primary)' }}
  >
    <div className='w-full max-w-md p-8 bg-white rounded-xl shadow-lg'>
      {children}
    </div>
  </div>
);

export default AuthLayout;
