import api from "./api";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crs-auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);