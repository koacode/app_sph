import {reqGetCartList,reqDeleteCart,reqUpdateChecked} from '@/api'
const actions = {
  //获取用户购物车的数据
  async getCartList({commit}){
    let result = await reqGetCartList()
    if(result.code === 200){
      commit('GETCARTLIST',result.data)
    }
  },
  //删除某一个商品的数据
  async deleteCart({commit},sukId){
    let result = await reqDeleteCart(sukId)
    if(result.code === 200){
      return 'OK'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  //修改某一个商品勾选状态
  async updateChecked({commit},{skuId,isChecked}){
    let result = await reqUpdateChecked(skuId,isChecked)
    if(result.code === 200){
      return 'OK'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部选中的商品
  deleteAllCheckedCart({dispatch,getters}){
    // console.log(this) //Store
    // 获取购物车中全部的商品
    let PromiseALL = []
    getters.cartList.cartInfoList.forEach(item=>{
      // 这里派发action时，因为是在shopcart小仓库中，因此派发时不用再命名空间了
      let promise = item.isChecked === 1 ? dispatch('deleteCart',item.skuId):''
      // console.log(promise) //如果选中了商品，那就返回promise，选中了几个商品就返回几个promise; 如果没有选中就返回空串
      // 将每一次返回的promise添加到数组当中
      PromiseALL.push(promise)
    })
    // 只有全部的p1,p2...都成功，返回结果才为成功
    // 如果有一个失败，那么返回结果就为失败
    return Promise.all(PromiseALL)
  },
  // 全选业务
  updateAllChecked({dispatch,state},isChecked){
    let PromiseALL = []
    state.cartList[0].cartInfoList.forEach(item=>{
      let promise = item.isChecked === isChecked ? '':dispatch('updateChecked',{skuId:item.skuId,isChecked})
      PromiseALL.push(promise)
    })
    return Promise.all(PromiseALL)
  }
}
const mutations = {
  GETCARTLIST(state,cartList){
    state.cartList = cartList
  }
}
const state = {
  cartList:[],
}
const getters = {
  cartList(state){
    return state.cartList[0]||{}
  }
}

export default{
  namespaced:true,
  actions,
  mutations,
  state,
  getters
}