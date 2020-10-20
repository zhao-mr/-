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


// 获取文件类型
export function getProjectLearnMaterials(data) {
  return request({
    url: '/experiment/getProjectLearnMaterials',
    method: 'post',
    data
  })
}

// 获取实验报告和模板
export function getProjectReport(data) {
  return request({
    url: '/experiment/getProjectReport',
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
//查看布置实验列表
export function checkAssign(data) {
  return request({
    url: '/schoolTeaching/checkAssign',
    method: 'post',
    data
  })
} 
//获取布置实验的信息
export function getAssignDetails(data) {
  return request({
    url: '/schoolTeaching/getAssignDetails',
    method: 'post',
    data
  })
}
//删除布置
export function deleteAssign(data) {
  return request({
    url: '/schoolTeaching/deleteAssign',
    method: 'post',
    data
  })
}
//修改布置
export function updateAssign(data) {
  return request({
    url: '/schoolTeaching/updateAssign',
    method: 'post',
    data
  })
}
//获取批改列表
export function correct(data) {
  return request({
    url: '/schoolTeaching/correct',
    method: 'post',
    data
  })
}
//批改获取成绩内容
export function correctUser(data) {
  return request({
    url: '/schoolTeaching/correctUser',
    method: 'post',
    data
  })
}
//批改成绩
export function correctResult(data) {
  return request({
    url: '/schoolTeaching/correctResult',
    method: 'post',
    data
  })
}
//撤销批改
export function repealCorrect(data) {
  return request({
    url: '/schoolTeaching/repealCorrect',
    method: 'post',
    data
  })
}
//查看批改
export function lookCorrect(data) {
  return request({
    url: '/schoolTeaching/lookCorrect',
    method: 'post',
    data
  })
}
//查看共享列表
export function getAllCorrectShareProject(data) {
  return request({
    url: '/correctShare/getAllCorrectShareProject',
    method: 'post',
    data
  })
}
//查看共享批改列表
export function getCorrectList(data) {
  return request({
    url: '/correctShare/getCorrectList',
    method: 'post',
    data
  })
}

//共享批改点击出现已有成绩
export function correctShare(data) {
  return request({
    url: '/correctShare/correctShare',
    method: 'post',
    data
  })
}

//共享批改提交
export function correctResult2(data) {
  return request({
    url: '/correctShare/correctResult',
    method: 'post',
    data
  })
}
//查看共享批改结果
export function lookCorrect2(data) {
  return request({
    url: '/correctShare/lookCorrect',
    method: 'post',
    data
  })
}
