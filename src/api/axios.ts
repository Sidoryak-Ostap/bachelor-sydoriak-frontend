import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes('/auth/refresh')) {
        localStorage.removeItem('accessToken');
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      let refreshPromise = new Promise(async (resolve, reject) => {
        try {
          const res = await axiosInstance.post('/auth/refresh');
          const newAccessToken = res.data.access_token;

          localStorage.setItem('accessToken', newAccessToken);

          processQueue(null, newAccessToken);
          resolve(newAccessToken);
        } catch (err) {
          localStorage.removeItem('accessToken');
          processQueue(err, null);
          window.location.href = '/auth/login';
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });

      return refreshPromise.then(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
