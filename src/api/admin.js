import request from '@/utils/request'

/**
 * 项目管理员 - 列表
 * @param data
 */
export function manageProList(data) {
  return request({
    url: '/experiment/searchArrangementProject',
    method: 'post',
    data
  })
}

// 修改基本信息
export function updateBasicInfo(data) {
  return request({
    url: '/experiment/arrangementProject',
    method: 'post',
    data
  })
}

// 判断该实验是否被布置
export function checkAssigned(data) {
  return request({
    url: '/experiment/checkAssignStatus',
    method: 'post',
    data
  })
}
