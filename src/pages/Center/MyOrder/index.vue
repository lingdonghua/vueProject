<!-- 二级路由我的订单 -->
<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="order in records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  {{order.createTime}} 订单编号:{{ order.outTradeNo }}
                  <span class="pull-right delete">
                    <img src="../images/delete.png" />
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="oderDetail,index in order.orderDetailList" :key="oderDetail.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="oderDetail.imgUrl" style="width:100px;height:100px" />
                  <router-link
                    class="block-text"
                    :to="`/detail/${oderDetail.skuId}`"
                  >{{ oderDetail.skuName}}</router-link>
                  <span>{{oderDetail.skuNum }}</span>
                  <a href="javascript:;" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-show="index===0"
              >{{ order.consignee }}</td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-show="index===0"
              >
                <ul class="unstyled" v-show="index===0">
                  <li>总金额¥138.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-show="index===0"
              >
                <a href="#" class="btn">已完成</a>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-show="index===0"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 分页器 -->
      <Pagination
        :pageNo="pageNo"
        :pageSize="limit"
        :total="orderInfo.total"
        continues="5"
        @getCurrentPageNo="getCurrentPageNo"
      ></Pagination>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/Pagination.vue'
  export default {
  components: { Pagination },
  name: 'myOrder',
  data() {
    return {
      pageNo: 1,
      limit: 3,
      //订单信息
      orderInfo:{}
    }
  },
  computed: {
    //计算出订单列表
    records() {
      return this.orderInfo.records || []
    }
  },
    mounted(){
      //获取订单列表
      this.getData()
  },
  methods: {
    //获取订单列表
    async getData() {
      try {
      const result = await this.$API.reqMyOrderApi(this.pageNo, this.limit)
      if (result.code === 200) {
        this.orderInfo=result.data
      }
      } catch (error) {
        console.log(error.message);
      }
    },
      // 分页器换页
    getCurrentPageNo(page) {
      this.pageNo = page
        this.getData()
      }
    }
  }
</script>

<style>
</style>