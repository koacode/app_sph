import {reqGetDetailInfo,reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid--->生成一个随机的字符串（不能再变）
import {getUUID} from '@/utils/uuid_token'
const actions = {
  // 获取产品信息的action
  async getDetailInfo({commit},skuId){
    let result = await reqGetDetailInfo(skuId)
    if(result.code === 200){
      commit('GETDETAILINFO',result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    let result = await reqAddOrUpdateShopCart(skuId,skuNum)
    if(result.code === 200){
      // 返回的是成功的标记
      return 'OK'
    }else{
      // 返回的是失败的标记
      return Promise.reject(new Error('fail'))
    }
    
  }
}
const mutations = {
  GETDETAILINFO(state,detailInfo){
    state.detailInfo = detailInfo
  }
}
const state = {
  detailInfo:{},
  // 游客临时身份
  uuid_token: getUUID()
}
const getters = {
  // 路径导航的数据
  categoryView(state){
    return state.detailInfo.categoryView || {}
  },
  // 产品信息的数据 
  skuInfo(state){
    return state.detailInfo.skuInfo || {}
  },
  // 产品售卖属性的数据
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}