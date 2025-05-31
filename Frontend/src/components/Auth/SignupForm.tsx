import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../Form/FormInput';

const signupSchema = z
  .object({
    email: z.string().email('❌ Invalid Email Format'),
    username: z.string().min(3, '❌ Username must be at least 3 characters'),
    password: z
      .string()
      .min(8, '❌ Password must be at least 8 characters')
      .regex(/[A-Z]/, '❌ Must contain at least one uppercase letter')
      .regex(/[a-z]/, '❌ Must contain at least one lowercase letter')
      .regex(/[0-9]/, '❌ Must contain at least one number')
      .regex(
        /[@$!%*?&]/,
        '❌ Must contain at least one special character (@$!%*?&)'
      ),
    confirmPassword: z.string(),
    phone: z
      .string()
      .min(8, '❌ Phone number must be at least 8 digits')
      .max(15, '❌ Phone number too long')
      .regex(/^[0-9]+$/, '❌ Phone number must be digits only'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '❌ Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupInput = z.infer<typeof signupSchema>;

const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  return (
    <form className='flex flex-col gap-4 ' onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label='Email'
        type='email'
        placeholder='Enter your email'
        error={errors.email?.message}
        {...register('email')}
      />
      <FormInput
        label='Username'
        type='text'
        placeholder='Enter your username'
        error={errors.username?.message}
        {...register('username')}
      />
      <FormInput
        label='Password'
        type='password'
        placeholder='Create a password'
        error={errors.password?.message}
        {...register('password')}
      />
      <FormInput
        label='Confirm Password'
        type='password'
        placeholder='Confirm your password'
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <FormInput
        label='Phone Number'
        type='tel'
        placeholder='Enter your phone number'
        error={errors.phone?.message}
        {...register('phone')}
      />
      <button
        type='submit'
        className='w-full text-white py-2 mt-4'
        style={{
          background: 'var(--color-accent)',
          borderRadius: 'var(--radius)',
        }}
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
