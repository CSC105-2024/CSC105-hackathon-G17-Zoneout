import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const userApi = {
  getCurrentUser: () => api.get('/users/current'),
  login: (data: { email: string; password: string }) => 
    api.post('/users/login', data),
  updateProfile: (userId: string, data: { name?: string; phone?: string }) =>
    api.put(`/users/${userId}/update-profile`, data),
  updateName: (userId: string, name: string) =>
    api.put(`/users/${userId}/update-name`, { name }),
  updatePhone: (userId: string, phone: string) =>
    api.put(`/users/${userId}/update-phone`, { phone }),
};

export default api; 