import { useMutation } from '@tanstack/react-query';
import { signupUser } from '@/api/user';

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}
