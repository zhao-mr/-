import request from '@/utils/request'

// 项目管理 - 列表
export function projectList(data) {
  return request({
    url: '/experiment/searchArrangementProject',
    method: 'post',
    data
  })
}

// 负责人 - 项目维护列表
export function maintainList(data) {
  return request({
    url: '/experiment/searchProjectMaintenance',
    method: 'post',
    data
  })
}

// 负责人 - 获取实验基本信息
export function getProInfo(data) {
  return request({
    url: '/experiment/getProjectMaintenanceDetail',
    method: 'post',
    data
  })
}

// 负责人 - 编辑实验基本信息
export function editProInfo(data) {
  return request({
    url: '/experiment/editProjectMaintenance',
    method: 'post',
    data
  })
}

// 负责人 - 获取实验视频
export function getProVideo(data) {
  return request({
    url: '/experiment/getProjectVideo',
    method: 'post',
    data
  })
}

// 负责人 - 编辑实验视频
export function editProVideo(data) {
  return request({
    url: '/experiment/editProjectVideo',
    method: 'post',
    data
  })
}

