import AuthLayout from '@/components/Form/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/use-users';

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: login, isPending: isLoginLoading, error } = useLogin();

  const handleLogin = async (data: any) => {
    try {
      await login(data);
      // If login is successful, redirect to the map page
      navigate('/map');
    } catch (err) {
      console.error('Login failed:', err);
      // Handle error (e.g., show a notification)
      alert('Login failed. Please try again.');
    }
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
