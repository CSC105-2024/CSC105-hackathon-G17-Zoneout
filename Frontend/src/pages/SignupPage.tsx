import AuthLayout from '@/components/Form/AuthLayout';
import SignupForm from '@/components/Auth/SignupForm';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '@/hooks/use-users';

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: signup,
    isLoading: isSignupLoading,
    error,
  } = useSignup();

  const handleSignup = async (data: any) => {
    // if (!data || !data.username || !data.password) {
    //   alert('Please fill in all fields.');
    //   return;
    // }
    // if (!password === confirmPassword) {
    //   alert('Passwords do not match.');
    //   return;
    // }
    try {
      await signup(data);
      // If signup is successful, redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      // Handle error (e.g., show a notification)
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <h2 className='text-2xl font-bold mb-6 mx-auto'>Join Zoneout!</h2>
      <SignupForm onSubmit={handleSignup} loading={isSignupLoading} />
      {error && (
        <p className='text-red-600 text-center mt-2'>
          {error.message || 'Signup failed. Please try again.'}
        </p>
      )}
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
