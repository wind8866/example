import axios from 'axios';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000,
});

// response interceptor
service.interceptors.response.use((response) => {
  const res = response.data;
  if (res.code !== 200) {
    // error
    console.error(res);
  }
  return res;
}, (error) => {
  // error
  console.error(error);
  return Promise.reject(error);
});

export default service;
