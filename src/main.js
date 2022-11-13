import Vue from 'vue'
import App from './App.vue'
// 引入三级联动组件————全局组件(全局组件在局部组件中使用时就不再需要引入了)
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import {Button,MessageBox} from 'element-ui'
// 注册全局组件（第一个参数：全局组件的名字；第二个参数：哪一个组件）
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
// 注册element-ui全局组件
Vue.component(Button.name,Button)
// element-ui注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox  //为什么这里又不写在beforeCreate中呢
Vue.prototype.$alert = MessageBox.alert //为什么这里又不写在beforeCreate中呢
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 引入mockServe.js----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入图片
import loadimage from '@/assets/images/1.gif'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:loadimage
})
// 引入校验插件
import '@/plugins/validate'

// 自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  namen:'upper'
})

Vue.config.productionTip = false

//将项目全部请求函数引入进来[分别暴露]
import * as API from '@/api'
new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this //为什么这两个要写在beforeCreate生命周期函数中呢
    Vue.prototype.$API = API  //为什么这两个要写在beforeCreate生命周期函数中呢
  },
  //注册路由信息，下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //注册仓库，下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
}).$mount('#app')