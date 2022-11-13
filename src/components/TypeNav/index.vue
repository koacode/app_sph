<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList.slice(0, 16)" :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex === index }">
                  <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!--二级、三级分类 -->
                <div class="item-list clearfix" :style="{display:currentIndex === index?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 以下两种引入throttle的方式都可
import throttle from 'lodash/throttle'
// import {throttle} from 'lodash'
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show:true
    };
  },
  mounted() {
    // 因为在这里派发的话，home路由和search路由跳转需要不停重复的获取接口数据，所以把dispatch放在app中派发，放在vm上也可以
    /* // this.$store.dispatch('getCategoryList') //没有开启命名空间
    this.$store.dispatch("home/getCategoryList"); //开启了命名空间 */
    // 当组件挂载完毕，让show属性值变为false
    if(this.$route.path !== "/home"){
      this.show = false
    }
  },
  computed: {
    /* ...mapState({ //对象写法
      categoryList:state=>state.home.categoryList
    }) */
    ...mapState("home", ["categoryList"]), //开启了命名空间
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // throttle回调函数别用箭头函数，因为可能出现上下文this指向问题
    changeIndex: throttle(function(index){
      this.currentIndex = index;
    },50),
    // 当鼠标进入的时候，让商品分类列表进行展示
    enterShow(){
      this.show = true
    },
    // 一级分类鼠标移出的事件回调
    leaveShow() {
      setTimeout(()=>{
        this.currentIndex = -1;
      },60)//这个定时器的作用是什么
      if(this.$route.path !== '/home'){
        this.show = false
      }
    },
    // 进行路由跳转的方法
    goSearch(event){
      // event.target结点有一个dataset属性，可以获取结点的自定义属性名与属性值
      let {categoryname,category1id,category2id,category3id} = event.target.dataset
      // 如果标签上拥有categoryname一定是a标签
      if(categoryname){
        // 整理路由跳转的参数
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        // 一级、二级、三级分类的a标签
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else{
          query.category3Id = category3id
        }
        // 整理完参数
        location.query = query
        location.params = this.$route.params
        // 路由跳转
        this.$router.push(location)
      }
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          .cur {
            background-color: skyblue;
          }
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        }
      }
    }
    // 过渡动画的样式
    // 进入的开始状态
    .sort-enter{
      height: 0;
    }
    // 进入的结束状态
    .sort-enter-tp{
      height:461px
    }
    // 定义动画的时间、速率
    .sort-enter-active{
      transition:all 0.5s linear;
    }
  }
}
</style>