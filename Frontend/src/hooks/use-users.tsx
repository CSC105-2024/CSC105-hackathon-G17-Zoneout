import { useMutation, useQuery } from '@tanstack/react-query';
import {
  loginUser,
  signupUser,
  getProfile,
  logoutUser,
  updateProfile,
} from '@/api/user';

export function useSignup() {
  return useMutation({
    mutationFn: signupUser,
  });
}

export function useLogin() {
  return useMutation({ mutationFn: loginUser });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getProfile,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: ({
      ...data
    }: {
      userId: string;
      name: string;
      phone: string;
    }) => updateProfile(data),
  });
}

const getPostsByUserId = async (userId: number) => {
  // ... implementation
};
export { getPostsByUserId };
