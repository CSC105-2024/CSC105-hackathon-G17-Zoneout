import { Axios } from '../../axiosInstance';

// POST
export const signupUser = async (data: any) => {
  const response = await Axios.post('api/users/signup', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await Axios.post('api/users/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await Axios.post(
    'api/users/logout',
    {},
    { withCredentials: true }
  );
  return response.data;
};

// PUT
export const updateProfile = async (data: { 
  name: string; 
  phone: string; 
  profileEmoji: string;
  userId: string;
}) => {
  console.log('Updating profile with data:', data);
  const response = await Axios.put(`api/users/update-profile`, data, {
    withCredentials: true,
  });
  return response.data;
};

// GET
export const getProfile = async () => {
  const response = await Axios.get('api/users/current', {
    withCredentials: true,
  });
  return response.data;
};
