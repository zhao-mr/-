/**
 * 配置编译环境和线上环境IP地址切换
 * */
let apiPath = ''
if (process.env.NODE_ENV === 'development') {
  apiPath = 'http://192.168.0.159:8100/xnsy' // 张家豪本地
  // apiPath = 'http://192.168.0.213:8100/xnsy' // 吕永伟本地
  // apiPath = 'http://www.simtop.online/xnsy/'
} else {
  apiPath = 'http://www.simtop.online/xnsy/'
}

export {
  apiPath
}
