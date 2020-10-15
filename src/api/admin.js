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

export function getAllNotice(param) {
  let url = '';
  if (param.noticeDate) {
    url = `notice/getAllNotice?noticeContent=${param.noticeContent}&noticeDate=${param.noticeDate}
    &pageNum=${param.pageNum}&pageSize=${param.pageSize}`
  } else {
    url = `notice/getAllNotice?noticeContent=${param.noticeContent}&pageNum=${param.pageNum}
    &pageSize=${param.pageSize}`
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function addNotice(param) {
  return request({
    url: 'notice/issueAll',
    method: 'post',
    data: param
  })
}

export function getNoticeById(noticeId) {
  return request({
    url: 'notice/getNoticeByNoticeId',
    method: 'get',
    params: {
      noticeId
    }
  })
}

/**
 * 删除通知
 * @param {*} noticeIds 
 */
export function batchDel(noticeIds) {
  return request({
    url: 'notice/deleteNotice',
    method: 'post',
    data: {
      noticeIds
    }
  })
}

/**
 * 教师/负责人发布通知时，选择实验
 */
export function getExperimentList() {
  return request({
    url: 'notice/getChargeProject',
    method: 'post'
  })
}

/**
 * 教师负责人选择试验后，选择某一次的布置
 * @param {*} projectId 
 */
export function getAssignList(projectId) {
  return request({
    url: 'notice/getAssignByProjectId',
    method: 'post',
    data: {
      projectId
    }
  })
}

/**
 * 选择某一次布置之后，返回此次布置的所有学生，展示并默认全选
 * @param {*} assignId 
 */
export function getStudentList(assignId) {
  return request({
    url: 'notice/getUserByAssignId',
    method: 'post',
    data: {
      assignId
    }
  })
}

/**
 * 教师发布通知
 * @param {*} data 
 */
export function addNoticeOfTeacher(data) {
  return request({
    url: 'notice/issueStudent',
    method: 'post',
    data
  })
}

/**
 * 获取未读通知
 */
export function getNewNotice() {
  return request({
    url: 'notice/getNewNotice',
    method: 'get'
  })
}

/**
 * 查看发给自己的所有通知，包括已读未读
 * @param {*} param 
 */
export function getAllNoticeToMe(param) {
  return request({
    url: 'notice/getAllNoticeToMyself',
    method: 'get',
    param
  })
}