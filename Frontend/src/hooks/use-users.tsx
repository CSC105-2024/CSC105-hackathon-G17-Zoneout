import { useMutation, useQuery } from '@tanstack/react-query';
import { loginUser, signupUser, getProfile } from '@/api/user';

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}

export function useLogin() {
  return useMutation({mutationFn: loginUser});
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getProfile,
    retry: false,
  })
}