import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = ()=>{
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  if(!uuid_token){
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token

  // 另一个写法（与上面的写法等价），区别是这个写法没有创建一个变量来保存数值
  /* if(!localStorage.getItem('UUIDTOKEN')){
    localStorage.setItem('UUIDTOKEN',uuidv4())
  }
  return localStorage.getItem('UUIDTOKEN') */
}