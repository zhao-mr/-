export const experimentType = [
  {value: 1, name: '链接实验'},
  {value: 2, name: '客户端实验'},
  {value: 3, name: '演示实验'}
]

/**
 * 获取实验类型名称
 */
export function getTypeName(value) {
  let name = '链接实验'
  for(let i = 0 ; i <experimentType.length;i++){
    if(experimentType[i].value === value){
      name = experimentType[i].name
      return name
    }
  }
}
