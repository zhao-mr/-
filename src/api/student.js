import request from '@/utils/request'

// 获取所有实验
export function getAllProject(data) {
  return request({
    url: '/student/experiment/searchAllExperiment',
    method: 'post',
    data
  })
}

// 选修列表
export function getOptionList(data) {
  return request({
    url: '/student/experiment/getStudentOptionalExperiment',
    method: 'post',
    data
  })
}

// 选修实验记录
export function getOptionRecordList(data) {
  return request({
    url: '/student/experiment/getStudentExperimentRecord',
    method: 'post',
    data
  })
}
