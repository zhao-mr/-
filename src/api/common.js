import request from '@/utils/request'

// 获取学院列表
export function collegeData(data) {
  return request({
    url: '/college/getCollege',
    method: 'post',
    data
  })
}

// 获取学科列表
export function majorData(data) {
  return request({
    url: '/college/getMajor',
    method: 'post',
    data
  })
}

// 获取教师列表
export function teacherData(data) {
  return request({
    url: '/college/getPrincipal',
    method: 'post',
    data
  })
}

