// 当前这个模块：API统一管理
import requests from './request'
import mockRequests from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList   get   无参数
// 发请求：axios发请求返回结果Promise对象
export const reqGetCategoryList = ()=>{
  return requests({url:'/product/getBaseCategoryList',method:'get'})
}

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = ()=>{
  return mockRequests({url:'/banner',method:'get'})
}

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取search中的数据
export const reqGetSearchList = (params) => requests({url:'/list',method:'post',data:params})

// 获取产品详情信息的接口
export const reqGetDetailInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

//加入购物车|将来修改商品个数的接口
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车数据列表接口
export const reqGetCartList = () => requests({url:'/cart/cartList',method:'get'})

//删除某一个商品的接口
export const reqDeleteCart = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改某一个商品的勾选的状态
export const reqUpdateChecked = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码的接口
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册的接口
export const reqRegister = (data) => requests({url:'/user/passport/register',method:'post',data})

// 用户登录的接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login',method:'post',data})

// 获取用户登录成功以后用户信息的接口
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

// 用户退出登录
export const reqUserLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取商品清单数据
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})

// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付状况(支付结果)
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单数据
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})