import axios, { AxiosError, AxiosInstance } from 'axios';
import { CookieKey } from '../utils/constants';
import { getCookie, removeCookie } from '../utils/cookie';

const api: AxiosInstance = axios.create();

const handleError = (error: AxiosError): Promise<AxiosError> => {
  removeCookie(CookieKey.ACCESS_TOKEN);
  return Promise.reject(error);
};

api.interceptors.request.use(
  (config) => {
    const token = getCookie(CookieKey.ACCESS_TOKEN);
    if (token) {
      const { headers } = config;
      headers.Authorization = token;
    }
    return config;
  },
  (error) => handleError(error),
);

api.interceptors.response.use(
  (response) => {
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return Promise.reject(new Error('Invalid response type: expected application/json'));
    }
    return response;
  },
  (error) => handleError(error),
);

export default api;
