import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = ({ label, error, ...props }: FormInputProps) => (
  <div className='mb-4'>
    <label className='block text-sm font-medium mb-1'>{label}</label>
    <input
      className='w-full px-3 py-2 border focus:outline-none'
      style={{ borderRadius: 'var(--radius)' }}
      {...props}
    />
    {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
  </div>
);

export default FormInput;
