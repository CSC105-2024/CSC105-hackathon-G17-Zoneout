import { Axios } from '../../axiosInstance';

export const getProfile = async () => {
  const response = await Axios.get('api/users/current', {
    withCredentials: true,
  });
  return response.data;
};

export const signupUser = async (data: any) => {
  const response = await Axios.post('api/users/signup', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
