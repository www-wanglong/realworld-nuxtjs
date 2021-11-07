import { request } from "../plugins/request";

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: 'users/login',
    data
  })
}

// 注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: 'users',
    data
  })
}

// 修改
export const getUser = () => {
  return request({
    method: 'GET',
    url: 'user',
  })
}

// 修改
export const update = (data) => {
  return request({
    method: 'PUT',
    url: 'user',
    data
  })
}