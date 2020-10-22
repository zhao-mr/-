import request from '@/utils/request'

export function addNews(data) {
  return request({
    url: '/experimentPortal/addNews',
    method: 'post',
    data
  })
}

export function addNotice(data) {
  return request({
    url: '/experimentPortal/addAnnouncement',
    method: 'post',
    data
  })
}

export function getAllNews(data) {
  return request({
    url: '/experimentPortal/getNews',
    method: 'post',
    data
  })
}

// 门户网站 -- 全部实验 -- 获取学院列表
export function getCollegeList() {
  return request({
    url: '/college/getCollege',
    method: 'post'
  })
}

// 门户网站 -- 全部实验 -- 全部实验列表
export function getExperimentList(data) {
  return request({
    url: '/experimentPortal/getPortalExperiment',
    method: 'post',
    data
  })
}

// 门户网站 -- 资讯动态 -- 资讯列表
export function getNewsList(data) {
  return request({
    url: '/experimentPortal/getNews',
    method: 'post',
    data
  })
}

// 门户网站 -- 资讯动态 -- 公告列表
export function getNoticeList(data) {
  return request({
    url: '/experimentPortal/getAnnouncement',
    method: 'post',
    data
  })
}

// 门户网站 -- 资讯动态 -- 新闻详情
export function getNewsById(data) {
  return request({
    url: 'experimentPortal/getNewsDetail',
    method: 'post',
    data
  })
}

// 门户网站 -- 资讯动态 -- 公告详情
export function getNoticeById(data) {
  return request({
    url: '/experimentPortal/getAnnouncementId',
    method: 'post',
    data
  })
}

// 门户网站 -- 下载中心 -- 下载列表
export function getList(data) {
  return request({
    url: '/experimentPortal/getUploadInfo',
    method: 'post',
    data
  })
}


