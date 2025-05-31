import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../Form/FormInput';

const signupSchema = z
  .object({
    email: z.string().email('❌ Invalid Email Format'),
    name: z.string().min(3, '❌ Name must be at least 3 characters'),
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
    terms: z.literal(true, {
      errorMap: () => ({
        message: '❌ You must accept the terms and conditions',
      }),
    }),
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
        label='Name'
        type='text'
        placeholder='Enter your name (or username)'
        error={errors.name?.message}
        {...register('name')}
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
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='terms'
          {...register('terms')}
          className='accent-[var(--color-accent-primary)]'
        />
        <label htmlFor='terms' className='text-sm'>
          I accept the{' '}
          <a
            href='/terms'
            className='underline text-[var(--color-accent-primary)]'
            target='_blank'
            rel='noopener noreferrer'
          >
            Terms and Conditions
          </a>
        </label>
      </div>
      {errors.terms && (
        <span className='text-red-600 text-xs'>{errors.terms.message}</span>
      )}
      <button
        type='submit'
        className='w-full text-white py-2 mt-4'
        style={{
          background: 'var(--color-accent-primary)',
          borderRadius: 'var(--radius)',
        }}
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
