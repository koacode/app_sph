<template>
  <div class="pagination" @click="getPageNo">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start > 1">1</button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button v-for="(page,index) in startAndEnd.end" :key="index" v-if="page >= startAndEnd.start" :class="{active:pageNo==page}">{{page}}</button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button v-if="startAndEnd.end < totalPage">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
      totalPage(){
        return Math.ceil(this.total/this.pageSize)
      },
      startAndEnd(){
        const {pageNo,totalPage,continues} = this
        // 先定义两个变量存储开始数字和结束数字
        let start = 0, end = 0 
        // 不正常现象【总页码数小于连续页码数】
        if(totalPage < continues){
          start = 1
          end = totalPage
        }else{
          start = pageNo - parseInt(continues/2)
          end = pageNo + parseInt(continues/2)
          // 把出现的不正常现象【start数字出现0或者负数】纠正
          if(start < 1){
            start = 1
            end = continues
          }
          // 把出现的不正常现象【end数字大于总页码数】纠正
          if(end > totalPage){
            start = totalPage - continues + 1
            end = totalPage
          }
        }
        return {start,end}
      }  
    },
    methods:{
      getPageNo(e){
        // console.log(Number(e.target.innerText))
        let nowPageNo = Number(e.target.innerText)
        if(nowPageNo){
          this.$emit('getPageNo',nowPageNo)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>