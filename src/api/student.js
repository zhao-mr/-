import request from '@/utils/request'

// 全部实验
export function getAllProject(data) {
  return request({
    url: '/student/experiment/searchAllExperiment',
    method: 'post',
    data
  })
}

// 必修实验列表
export function getMustProject(data) {
  return request({
    url: '/student/experiment/getStudentMustExperiment',
    method: 'post',
    data
  })
}

// 选修实验列表
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


// 撤销提交
export function cancelCommit(data) {
  return request({
    url: '/student/experiment/revocationCorrect',
    method: 'post',
    data
  })
}

// 选修获取实验成绩信息
export function getOptionGrade(data) {
  return request({
    url: '/student/experiment/getExperimentShareRecord',
    method: 'post',
    data
  })
}

// 全部实验 - 获取基本信息
export function getProjectInfo(data) {
  return request({
    url: '/student/experiment/getExperimentDetail',
    method: 'post',
    data
  })
}

// 点击开始实验 生成实验记录
export function createRecord(data) {
  return request({
    url: '/student/experiment/doExperiment',
    method: 'post',
    data
  })
}

// 获取需要的学习视频
export function getExperimentVideo(data) {
  return request({
    url: '/student/experiment/getExperimentVideo',
    method: 'post',
    data
  })
}

// 更新视频成绩
export function updateExperimentVideo(data) {
  return request({
    url: '/student/experiment/submitVideoScore',
    method: 'post',
    data
  })
}

// 获取虚拟实验地址
export function getExperimentLink(data) {
  return request({
    url: '/student/experiment/getAddressLink',
    method: 'post',
    data
  })
}

// 获取实验报告记录
export function getReportRecord(data) {
  return request({
    url: '/student/experiment/getSubmitContent',
    method: 'post',
    data
  })
}

// 获取实验记录
export function getRecordDetail(data) {
  return request({
    url: '/student/experiment/getExperimentSubmit',
    method: 'post',
    data
  })
}

// 必修 - 暂存或提交
export function submitArranged(data) {
  return request({
    url: '/student/experiment/submitMustExperiment',
    method: 'post',
    data
  })
}

// 选修 - 暂存或提交
export function submitElective(data) {
  return request({
    url: '/student/experiment/submitExperiment',
    method: 'post',
    data
  })
}

// 更新最近开始实验时间
export function updateStartTime(data) {
  return request({
    url: '/student/experiment/updateSubmitDate',
    method: 'post',
    data
  })
}
