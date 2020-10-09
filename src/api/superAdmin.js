import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// pageNum=${params.pageNum}&pageSize=${params.pageSize}&roleIds=${params.roleIds}
// export function getAllUser(params) {
//   return request({
//     url: `/user/getAllUser?`,
//     method: 'get',
//     params: {·
//       params
//     }
//   })
// }

export function getAllUser(data) {
  return request({
    url: '/user/getAllUser',
    method: 'post',
    data
  })
}
