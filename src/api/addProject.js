import request from '@/utils/request'

export function addProjectList(data) {
  return request({
    url: 'experiment/searchExperiment',
    method: 'post',
    data
  })
}
