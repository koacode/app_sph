import {reqGetCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'
// home模块的小仓库
// actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // home中的三级菜单
  async getCategoryList(context){
    let result = await reqGetCategoryList()
    if(result.code === 200){
      context.commit('GETCATEGORYLIST',result.data)
    }
  },
  // 首页轮播图
  async getBannerList(context){
    let result = await reqGetBannerList()
    if(result.code === 200){
      context.commit('GETBANNERLIST',result.data)
    }
  },
  async getFloorList({commit}){
    let result = await reqGetFloorList()
    if(result.code === 200){
      commit('GETFLOORLIST',result.data)
    }
  }
}
// mutations:修改state的唯一手段
const mutations = {
  GETCATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  GETFLOORLIST(state,floorList){
    state.floorList = floorList
  }
}
// state：仓库存储数据的地方
const state = {
  // state中的数据根据接口返回值进行初始化，返回是对象，初始化值就设置为对象；返回值是数组，初始化值就设置为数组
  // home仓库中存储三级菜单的数据
  categoryList:[],
  // 轮播图数据
  bannerList: [],
  // floor数据
  floorList: [],
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}