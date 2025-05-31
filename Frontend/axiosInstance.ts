import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes('/login') &&
//       !originalRequest.url.includes('/signup')
//     ) {
//       originalRequest._retry = true;
//       if (document.cookie.includes('refreshToken')) {
//         try {
//           await Axios.post(
//             '/users/refresh-token',
//             {},
//             { withCredentials: true }
//           );
//           return Axios(originalRequest);
//         } catch (refreshError) {
//           window.location.href = '/login';
//           return Promise.reject(refreshError);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { Axios };
