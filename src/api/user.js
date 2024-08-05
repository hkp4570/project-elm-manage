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

// 获取用户列表
export function getUserList({offset, limit}) {
  return request({
    url: `/elm/v1/users/list?offset=${offset}&limit=${limit}`,
    method: 'get',
  })
}

// 获取用户数量
export function getUserCount(){
  return request({
    url: '/elm/v1/users/count',
    method: 'get'
  })
}


