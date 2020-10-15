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
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//获取当前负责的项目列表
export function getChargeProject(data) {
  return request({
    url: '/schoolTeaching/getChargeProject',
    method: 'post',
    data
  })
}
//负责人项目实验信息
export function getAssignProject(data) {
  return request({
    url: '/schoolTeaching/getAssignProject',
    method: 'post',
    data
  })
}
//获取学生信息
export function getStudent(data) {
  return request({
    url: '/schoolTeaching/getStudent',
    method: 'post',
    data
  })
} 
//布置实验
export function assignExperiment(data) {
  return request({
    url: '/schoolTeaching/assignExperiment',
    method: 'post',
    data
  })
} 