<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked == 1" @change="updateChecked(cartInfo,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl">
            <div class="item-msg">{{cartInfo.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cartInfo)">-</a>
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value,cartInfo)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfo.skuPrice * cartInfo.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" style="cursor:pointer" @click="deleteCartById(cartInfo)">删除</a>
            <br>
            <a style="cursor:pointer">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a style="cursor:pointer" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkedNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import throttle from 'lodash/throttle'
  import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      // 获取个人购物车数据
      getData(){
        this.$store.dispatch('shopcart/getCartList')
      },
      // 修改某一个产品的个数
      handler:throttle(async function(type,disNum,cartInfo){
        switch(type){
          case 'add':
            disNum = disNum
            break
          case 'minus':
            /* if(cart.skuNum > 1){
              disNum = disNum
            }else{
              disNum = 0
            } */
            disNum = cartInfo.skuNum > 1 ? disNum:0
            break
          case 'change':
            if(idNaN(disNum)||disNum<1){
              disNum = 0
            }else{
              disNum = parseInt(disNum) - cartInfo.skuNum
            }
            // disNum = (isNaN(disNum)||disNum<1) ? 0:parseInt(disNum) - cartInfo.skuNum
            break
        }
        try{
          await this.$store.dispatch('detail/addOrUpdateShopCart',{skuId:cartInfo.skuId,skuNum:disNum})
          this.getData()
        }catch(error){
          alert(error.message)
        }
      },1000),
      // 删除某个商品的数据通过id
      async deleteCartById(cartInfo){
        try{
          await this.$store.dispatch('shopcart/deleteCart',cartInfo.skuId)
          this.getData()
        }catch(error){
          alert('删除失败')
        }
      },
      //修改某一个商品勾选状态
      async updateChecked(cartInfo,event){
        let isChecked = event.target.checked ? 1:0
        try{ 
          await this.$store.dispatch('shopcart/updateChecked',{skuId:cartInfo.skuId,isChecked})
          // 这里如果不重新发请求的话全选框的状态是不会随数据的变化而更新的
          this.getData()
        }catch(error){
          alert('勾选失败')
        }
      },
      // 同步全选框的数据(如何点击全选让上面的数据也跟着进行更改)
      async updateAllChecked(event){
        /* this.cartInfo.forEach(item=>{
          item.isChecked = Number(event.target.isChecked)
        })
        try{ 
          await this.$store.dispatch('shopcart/updateChecked',{skuId:cartInfo.skuId,isChecked:cartInfo.isChecked})
          // 这里如果不重新发请求的话全选框的状态是不会随数据的变化而更新的
          this.getData()
        }catch(error){
          alert('勾选失败')
        } */
        //获取全选的复选框勾选的状态,接口需要的1|0
        let isChecked = event.target.checked ? '1':'0';
        try {
          //await等待成功:购物车全部商品勾选状态成功以后
          await this.$store.dispatch("shopcart/updateAllChecked", isChecked);
          this.getData();
        } catch (error) {
          alert(error.message);
        }
      },
      // 删除全部选中的商品
      async deleteAllCheckedCart(){
        try{
          await this.$store.dispatch('shopcart/deleteAllCheckedCart')
          this.getData()
        }catch(error){
          alert(error.message)
        }
        
      },
    },
    computed:{
      ...mapGetters('shopcart',['cartList']),
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      // 已选中商品的数量
      checkedNum(){
        let length = 0
        this.cartInfoList.forEach(item=>{
          if(item.isChecked === 1){
            length++
          }
        })
        return length
      },
      // 计算购买产品的总价
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(item => {
          if(item.isChecked === 1){
            sum += item.skuPrice * item.skuNum
          }
        });
        return sum
      },
      // 判断底部复选款是否勾选【全部产品都选中才勾选】
      isAllChecked(){
        // 遍历数组里面的元素，如果全部的元素里面的属性isChecked的值都为1，就返回true
        // 只要有一个isChecked的值不为1，那就返回false
        if(this.cartInfoList.length === 0) return false
        return this.cartInfoList.every(item=>item.isChecked === 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>