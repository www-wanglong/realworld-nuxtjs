/**
 * 基于axios 封装请求
 */
import axios from 'axios';

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
});

// 通过插件机制获取上下文对象（query、params）
export default ({ store }) => {
  // 请求拦截器
  request.interceptors.request.use(function (config) {
    // 如：统一设置token
    const { user } = store.state
    if (user && user.token) {
      config.headers.authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

}