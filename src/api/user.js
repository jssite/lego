import request from '@/utils/axios'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/auth/getUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
