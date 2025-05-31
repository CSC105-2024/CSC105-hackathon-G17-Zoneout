import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Add request interceptor to include access token
// Axios.interceptors.request.use(
//   (config) => {
//     // Get the access token from cookies
//     const cookies = document.cookie.split(';');
//     const accessToken = cookies
//       .find(cookie => cookie.trim().startsWith('accessToken='))
//       ?.split('=')[1];

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add response interceptor to handle token refresh
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/login') &&
      !originalRequest.url.includes('/signup')
    ) {
      originalRequest._retry = true;
      if (document.cookie.includes('refreshToken')) {
        try {
          await Axios.post(
            '/api/users/refresh-token',
            {},
            { withCredentials: true }
          );
          return Axios(originalRequest);
        } catch (refreshError) {
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { Axios };
