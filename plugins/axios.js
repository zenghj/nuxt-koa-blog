import axios from 'axios'

const apiPrefix = '/blog/api';
const host = process.env.NODE_ENV === 'production' ? 'http://45.62.111.182' : 'http://127.0.0.1:3000';
const API_BASE_URL = host + apiPrefix;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  console.log(config);
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export default axios.create({
  baseURL: API_BASE_URL,
})
