import AuthLayout from '@/components/Form/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    // Call your login API here
    // If success:
    navigate('/map');
  };

  return (
    <AuthLayout>
      <h2 className='text-2xl font-bold mb-6'>Welcome Back!</h2>
      <LoginForm onSubmit={handleLogin} />
      <p className='mt-4 text-center'>
        Don't have an account?{' '}
        <a href='/signup' className='text-purple-600 underline'>
          Sign Up
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
