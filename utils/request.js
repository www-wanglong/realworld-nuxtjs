/**
 * 基于axios 封装请求
 */

import axios from 'axios';

const request = axios.create({
  baseURL: 'https://conduit.productionready.io/api'
});

// 请求拦截器

// 响应拦截器

export default request;