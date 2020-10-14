import request from '@/utils/request'

// 项目列表
export function addProjectList(data) {
  return request({
    url: 'experiment/searchExperiment',
    method: 'post',
    data
  })
}

// 添加项目
export function addProject(data) {
  return request({
    url: 'experiment/addExperiment',
    method: 'post',
    data
  })
}

// 编辑项目
export function updateProject(data) {
  return request({
    url: 'experiment/updateProject',
    method: 'post',
    data
  })
}


