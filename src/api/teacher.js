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

// 负责人 - 删除学习视频
export function delVideo(data) {
  return request({
    url: '/experiment/deleteProjectVideo',
    method: 'post',
    data
  })
}

// 负责人 - 获取学习资料
export function getStudyFiles(data) {
  return request({
    url: '/experiment/getProjectLearnMaterials',
    method: 'post',
    data
  })
}

// 负责人 - 添加实验视频
export function addProVideo(data) {
  return request({
    url: '/experiment/editProjectVideo',
    method: 'post',
    data
  })
}

// 负责人 - 编辑实验视频
export function editProVideo(data) {
  return request({
    url: '/experiment/updateProjectVideo',
    method: 'post',
    data
  })
}

// 负责人 - 获取实验报告
export function getProReport(data) {
  return request({
    url: '/experiment/getProjectReport',
    method: 'post',
    data
  })
}

// 负责人 - 编辑实验报告
export function editProReport(data) {
  return request({
    url: '/experiment/editProjectReport',
    method: 'post',
    data
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
