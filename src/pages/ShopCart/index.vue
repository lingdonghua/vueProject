<template>
  <div class="cart">
    <TypeNav></TypeNav>
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
        <ul class="cart-list" v-for="shopCartInfo in shopCartList" :key="shopCartInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCartInfo.isChecked===1"
              @click="updateChoose(shopCartInfo.skuId,$event)"
            />
          </li>
          <li class="cart-list-con2" @click="goDetail(shopCartInfo.skuId)">
            <img :src="shopCartInfo.imgUrl" />
            <div class="item-msg">{{ shopCartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateSkuNum('mins',shopCartInfo)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="shopCartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="updateSkuNum('user',shopCartInfo,$event)"
            />
            <a href="javascript:void(0)" class="plus" @click="updateSkuNum('add',shopCartInfo)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopCartInfo.skuPrice*shopCartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(shopCartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChoose&&shopCartList.length>0"
          @click="AllChoose"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteChooseGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ sumChoose }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav/TypeNav.vue';
import { mapGetters } from 'vuex';
//引入节流函数
import throttle from 'lodash/throttle'
export default {
  components: { TypeNav },
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('shopCart', ['shopCartList']),
    //全选判断
    isAllChoose() {
      return this.shopCartList.every((item) => item.isChecked === 1)
    },
    //计算已选多少件
    sumChoose() {
      let sum = 0
      this.shopCartList.forEach(element => {
        sum+=element.isChecked
      })
      return sum
    },
    //计算总价
    totalPrice() {
      let sum = 0
      this.shopCartList.forEach(element => {
        if (element.isChecked === 1) {
          sum+=element.skuPrice*element.skuNum
        }
      })
      return sum
    }
  },
  methods: {
    getData() {
      this.$store.dispatch('shopCart/getShopCartList')
    },
    //修改选中
    async updateChoose(skuId, event) {
      try {
        let isChecked = event.target.checked ? 1 : 0
        await this.$store.dispatch('shopCart/updateStatus', { skuId: skuId, isChecked: isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }

    },
    //跳转到商品详情页
    goDetail(skuId) {
      this.$router.push({
        name: 'detail',
        params: { skuId: skuId }
      })
    },
    //全选按钮操作
    AllChoose(event) {
      this.shopCartList.forEach(element => {
            this.updateChoose(element.skuId,event)
      });
    },
    //删除单个商品
    async deleteGoods(skuId) {
      try {
        await this.$store.dispatch('shopCart/deleteOneGoods', skuId)
        this.getData()
      } catch (error) {
        alert('删除失败！！，服务器异常')
      }
    },
    //删除选中商品
    deleteChooseGoods() {
      let flat = confirm('您确定要删除选中的商品？')
      if (flat) {
        this.shopCartList.forEach(element => {
        if (element.isChecked === 1) {
          this.deleteGoods(element.skuId)
        }
      })
      }

    },
    //购物车商品数量修改
    updateSkuNum: throttle(async function (value, shopCartInfo, event) {
       let num = 0
      // switch判断用户点了哪个按钮
      switch (value) {
        case 'mins':
          //如果数量小于1则不能减
          num=shopCartInfo.skuNum<2?0:-1
          break
        case 'add':
          num=1
          break
        case 'user':
          if (isNaN(event.target.value * 1) || event.target.value<0) {
            //输入不合法
            num=0
          } else {
            //防止输入小数，结果取整取整
            num=parseInt(event.target.value)-shopCartInfo.skuNum
          }
          break  
      }
      try {
        await this.$store.dispatch('detail/addShopCart', { skuId: shopCartInfo.skuId, skuNum: num })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },1500) 
     

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

      & > div {
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

        & > li {
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
        .item-txt {
          text-align: center;
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
        font-family: 'Microsoft YaHei';
        background: #e1251b;
        overflow: hidden;
      }
    }
  }
}
</style>