import request from '@/utils/request'

// 项目列表
export function addProjectList(data) {
  return request({
    url: '/experiment/searchExperiment',
    method: 'post',
    data
  })
}

// 添加项目
export function addProject(data) {
  return request({
    url: '/experiment/addExperiment',
    method: 'post',
    data
  })
}

// 编辑项目
export function updateProject(data) {
  return request({
    url: '/experiment/updateProject',
    method: 'post',
    data
  })
}

// 删除实验
export function deleteProject(data) {
  return request({
    url: '/experiment/deleteProject',
    method: 'post',
    data
  })
}

// 获取详细信息
export function getProjectInfo(data) {
  return request({
    url: '/experiment/getProject',
    method: 'post',
    data
  })
}


