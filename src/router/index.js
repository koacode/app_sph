// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store'

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push方法（第一个参数：告诉原来的push方法，你往那里跳转以及传递哪些参数；第二个参数：成功的回调；第三个参数：失败的回调）
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}
// 重写replace方法（第一个参数：告诉原来的replace方法，你往那里跳转以及传递哪些参数；第二个参数：成功的回调；第三个参数：失败的回调）
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
}

const router = new VueRouter({
  // 配置路由
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// 全局前置路由守卫
router.beforeEach(async (to,from,next)=>{
  next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 如果用户登录了
  if(token){
    if(to.path == '/login'||to.path == '/register'){
      // 用户登录了，并且要去login【不能去，跳转（停留）到首页】
      next('/home')
    }else{
      if(name){
        // 用户登录了，去的不是login，并且有用户信息，就直接放行
        next()
      }else{
        try{
          // 用户登录了，去的不是login，没有用户信息，那就派发action让仓库存储用户信息再跳转
          await store.dispatch('user/getUserInfo')
          next()
        }catch(error){
          // 用户登录了，但是token过期了，token失效了，获取不到用户信息
          store.dispatch('user/userLogout') //清空用户信息和token
          next('/login') //跳转到login重新登录
        }
      }
    }
  }else{
    // 未登录能去【home、search、detail、addcartsuccess、shopcart、login、register】
    // 未登录不能去【trade、pay、paysuccess、center】，未登录去不能去的页面的话就让他去login
    let toPath = to.path
    if(toPath.indexOf('trade')!=-1||toPath.indexOf('pay')!=-1||toPath.indexOf('center')!=-1){
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})

export default router