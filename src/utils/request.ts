import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || 'https://box.richardweitech.cn/api/koudai',
  withCredentials: true,
  timeout: 5000,
});


service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code !== 20000) {
      Message({
        message: res.message || 'error',
        type: 'error',
        duration: 5 * 1000,
      });

      // 4001: Illegal token; 4005: Other clients logged in; 4002: Token expired;
      if (res.code === 4001 || res.code === 4005 || res.code === 4002) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again',
           'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(res.message || 'error');
    } else {
      return res;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
