//登录、注册模块的小仓库
import { reqGetCode,reqRegister,reqUserLogin,reqUserInfo,reqUserLogout } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'
const actions = {
  // 获取验证码
  async getCode({commit},phone){
    let result = await reqGetCode(phone)
    if(result.code === 200){
      commit('GETCODE',result.data)
      console.log(result,'验证码')
      return 'OK'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户注册
  async userRegister({commit},data){
    let result = await reqRegister(data)
    if(result.code === 200){
      return 'OK'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户登录
  async userLogin({commit},data){
    let result = await reqUserLogin(data)
    if(result.code === 200){
      commit('USERLOGIN',result.data.token)
      setToken(result.data.token)
      return 'OK'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo()
    if(result.code === 200){
      commit('GETUSERINFO',result.data)
    }
    //   return 'OK'
    // }else{
    //   Promise.reject(new Error('fail'))
    // }
  },
  // 用户退出登录
  async userLogout({commit}){
    let result = await reqUserLogout()
    // action里不能操作state，提交mutation修改state
    if(result.code === 200){
      commit('USERLOGOUT')
    }
  }
}
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  USERLOGOUT(state){
    state.token = ''
    state.userInfo = {}
    // 清空本地存储的token
    removeToken()
  }
}
const state = {
  code:'', //验证码
  token:getToken(), //用户唯一标识符
  userInfo:{}, //用户信息
}
const getters = {}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}