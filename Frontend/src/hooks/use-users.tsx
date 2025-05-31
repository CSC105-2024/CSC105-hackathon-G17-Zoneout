import { useMutation } from '@tanstack/react-query';
import { loginUser, signupUser } from '@/api/user';

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}

export function useLogin() {
  return useMutation({mutationFn: loginUser});
}
