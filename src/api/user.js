import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/elm/admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/elm/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
