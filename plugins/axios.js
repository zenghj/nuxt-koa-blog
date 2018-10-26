import axios from 'axios'
import {API_BASE_URL} from '~/assets/js/constants'


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