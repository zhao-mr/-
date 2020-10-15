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

//获取教工列表
export function getAllUser(data) {
  return request({
    url: '/user/getAllUser',
    method: 'post',
    data

  })
}

//停用用户
export function disabledUser(data) {
  return request({
    url: '/user/disabledUser',
    method: 'post',
    data
  })
}
//启用用户
export function startUsingUser(data) {
  return request({
    url: '/user/startUsingUser',
    method: 'post',
    data
  })
}
//用户导入
export function importSysUser(data) {
  return request({
    url: '/user/importSysUser',
    method: 'post',
    data
  })
}
//获取所有的学院，专业，班级，角色
export function getGroup() {
  return request({
    url: '/college/getGroup',
    method: 'get',
    params: {
      
    }
  })
}
//增加教工
export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}
//删除教工
export function deleteUser(data) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data
  })
}
//修改
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}