import { request } from "../plugins/request";

export const getTags = () => {
  return request({
    method: 'GET',
    url: 'tags'
  })
}