<template>
  <div>
    <!-- TypeNav为全局组件：三级联动全局组件已经注册为全局组件了，因此不需要再引入以及注册了，直接使用即可 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ListContainer from './ListContainer'
  import Recommend from './Recommend'
  import Rank from './Rank'
  import Like from './Like'
  import Floor from './Floor'
  import Brand from './Brand'
  export default {
    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    // 派发action，获取floor数据
    mounted(){
      this.$store.dispatch('home/getFloorList')
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
  }
</script>

<style scoped>

</style>