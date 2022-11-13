// 引入路由组件
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 配置路由信息
export default [
  {
    path:'/home',
    component: ()=>import('@/pages/Home'), //路由懒加载
    meta:{isShow:true}
  },
  {
    name:'search',
    path:'/search/:keyword?',
    component: ()=>import('@/pages/Search'), //路由懒加载
    meta:{isShow:true}
  },
  {
    name:'detail',
    path:'/detail/:skuId?',
    component:Detail,
    meta:{isShow:true}
  },
  {
    name:'addcartsuccess',
    path:'/addcartsuccess',
    component:AddCartSuccess,
    meta:{isShow:true}
  },
  {
    path:'/shopcart',
    component:ShopCart,
    meta:{isShow:true}
  },
  {
    path:'/trade',
    component:Trade,
    meta:{isShow:true},
    // trade的路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须是从购物车而来
      if(from.path == '/shopcart'){
        next()
      }else{
        // 其他的路由组件而来，则停留在当前
        next(false)
      }
    }
  },
  {
    path:'/pay',
    component:Pay,
    meta:{isShow:true},
    // pay的路由独享守卫
    beforeEnter:(to,from,next) => {
      if(from.path == '/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    meta:{isShow:true}
  },
  {
    path:'/center',
    component:Center,
    meta:{isShow:true},
    children:[
      {
        path:'myorder',
        component:MyOrder,
      },
      {
        path:'grouporder',
        component:GroupOrder,
      },
      // 二级路由重定向
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  // 重定向，在项目跑起来的时候，访问/,立马让它定向到首页
  {
    path:'*',
    redirect:'/home'
  }
]