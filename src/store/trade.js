import {reqAddressInfo,reqOrderInfo} from '@/api'
const actions = {
  // 获取用户地址信息
  async getAddressInfo({commit}){
    let result = await reqAddressInfo()
    if(result.code === 200){
      commit('GETADDRESSINFO',result.data)
    }
  },
  // 获取商品清单数据
  async getOrderInfo({commit}){
    let result = await reqOrderInfo()
    if(result.code === 200){
      commit('GETORDERINFO',result.data)
    }
  }
}
const mutations = {
  GETADDRESSINFO(state,addressInfo){
    state.addressInfo = addressInfo
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
}
const state = {
  addressInfo:[], //用户地址数据
  orderInfo:{}, //商品清单数据
}
const getters = {}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}