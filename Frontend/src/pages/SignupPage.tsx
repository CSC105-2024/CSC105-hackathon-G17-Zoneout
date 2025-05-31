import AuthLayout from '@/components/Form/AuthLayout';
import SignupForm from '@/components/Auth/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: any) => {
    // Call your signup API here
    // If success:
    navigate('/login');
  };

  return (
    <AuthLayout>
      <h2 className='text-2xl font-bold mb-6 mx-auto'>Join Zoneout!</h2>
      <SignupForm onSubmit={handleSignup} />
      <p className='mt-4 text-center'>
        Already have an account?{' '}
        <a href='/login' className='text-purple-600 underline'>
          Log In
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
