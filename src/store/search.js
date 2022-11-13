// search模块的小仓库
import { reqGetSearchList } from "@/api"
const actions = {
  async getSearchList({commit},params){
    let result = await reqGetSearchList(params)
    if(result.code === 200){
      commit('GETSEARCHLIST',result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}
const state = {
  searchList:{}
}
const getters = {
  goodsList(state){
    return state.searchList.goodsList
  },
  trademarkList(){
    return state.searchList.trademarkList
  },
  attrsList(){
    return state.searchList.attrsList
  }
}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}