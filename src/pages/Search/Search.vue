<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread  面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="SearchData.categoryName">
              {{SearchData.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-show="SearchData.keyword">
              {{SearchData.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-show="SearchData.trademark">
              {{SearchData.trademark.split(':')[1]}}
              <i @click="removeBrand">×</i>
            </li>
            <li class="with-x" v-for="(attr,index) in SearchData.props" :key="index">
              {{attr.split(':')[1]}}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector 品牌属性组件-->
        <SearchSelector @getBrand="getBrand" @getProps="getProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:SearchData.order.indexOf('1')!==-1}">
                  <a @click="orderChange('1')">
                    综合
                    <span
                      v-if="SearchData.order.indexOf('desc')!==-1 && SearchData.order.indexOf('1')!==-1"
                    >⬇</span>
                    <span v-else-if="SearchData.order.indexOf('1')!==-1">⬆</span>
                  </a>
                </li>
                <!-- <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>-->
                <li :class="{active:SearchData.order.indexOf('2')!==-1}">
                  <a @click="orderChange('2')">
                    价格
                    <span
                      v-if="SearchData.order.indexOf('desc')!==-1 && SearchData.order.indexOf('2')!==-1"
                    >⬇</span>
                    <span v-else-if="SearchData.order.indexOf('2')!==-1">⬆</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- 每一个商品 -->
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <router-link :to="`/detail/${goods.id}`" class="routerLink">
                    <div class="p-img">
                      <a href="javascript:;">
                        <img :src="goods.defaultImg" />
                      </a>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i :style="{marginLeft:'5px'}">{{ goods.price }}</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a
                        target="_blank"
                        href="item.html"
                        title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a>
                    </div>
                  </router-link>

                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      @click="addShopCart(goods.id)"
                    >加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNo="SearchData.pageNo"
            :pageSize="SearchData.pageSize"
            :total="total"
            continues="5"
            @getCurrentPageNo="getCurrentPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters } from 'vuex';
import TypeNav from '@/components/TypeNav/TypeNav.vue';
export default {
  name: 'Search',
  data() {
    return {
      SearchData: {
        //产品对应id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品姓名
        categoryName: "",
        //排序，初始值综合降序排序1:desc
        order: "1:desc",
        //分页
        pageNo: 1,
        pageSize: 10,
        //产品属性数组
        props: [],
        //品牌
        trademark: "",
        //搜索关键字
        keyword: ''
      }
    }
  },
  components: {
    SearchSelector,
    TypeNav
},
  //在mounted之前之前封装请求数据
  beforeMount() {
    Object.assign(this.SearchData, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters('search', ['goodsList','total']),
  },
  watch: {
    //监听路由的变化，判断用户是否在搜索页面再次搜索了
    $route(newVal, oldval) {
      //重写包装请求参数，再次发数据请求
      //发起请求之前id数据先清空
      //令其为undefined比空字符串好，因为undefined发请求浏览器会忽略其项不发请求
      this.SearchData.category1Id = undefined
      this.SearchData.category2Id = undefined
      this.SearchData.category3Id = undefined
      Object.assign(this.SearchData, this.$route.params, this.$route.query)
      //再次派发action发出请求
      this.getData()
    }
  },
  methods: {
    //向vuex的action派发请求
    getData() {
      this.$store.dispatch('search/getSearchData', this.SearchData)
    },

    //点击面包屑的x号()
    removeCategoryName() {
      //溢出面包屑之前也要清空之前的记录
      this.SearchData.category1Id = undefined
      this.SearchData.category2Id = undefined
      this.SearchData.category3Id = undefined
      this.SearchData.categoryName = ''
      //清空url中的记录：有一个办法，利用编程实路由自己跳转自己，浏览器上方url就会被清空
      this.$router.push({name:'search',params:this.$route.params})
    },
    //点击面包屑的x号（搜索栏的keyword）处理
    removeKeyword() {
      this.SearchData.keyword = ''
      //通过全局事件总线通知header组件删除搜索栏的字
      this.$bus.$emit('removeKeyword')
      //url修改
      this.$router.push({name:'search',query:this.$route.query})
    },
    //自定义事件获取子组件的品牌信息，供面包屑搜索使用
    getBrand(value) {
      this.SearchData.trademark = `${value.tmId}:${value.tmName}`
      this.SearchData.pageNo=1
      this.getData()
    },
    //面包屑属性的移除(品牌)
    removeBrand() {
      this.SearchData.trademark = ''
      this.getData()
    },
    //获取搜索的属性值，封装发送服务器
    getProps(value,value2) {
      const propsInfo = `${value.attrId}:${value2}:${value.attrName}`
      if (this.SearchData.props.indexOf(propsInfo) == -1) {
        //没有重复。加入数组
        this.SearchData.props.push(propsInfo);
      }
    },
    //面包屑属性的移除
    removeProps(index) {
      this.SearchData.props.splice(index, 1);
      this.getData()
    },
    //排序处理
    orderChange(value) {
      let originValue = this.SearchData.order.split(':')[0]
      let originOrder = this.SearchData.order.split(':')[1]
      let newOrder = ''
      if (originValue === value) {
        //点击的是原始状态，仅仅改变排序状态
        newOrder=`${value}:${originOrder=='desc'?'asc':'desc'}`
      } else {
        newOrder=`${value}:desc`
      }
       //覆盖值，重新发送请求
      this.SearchData.order = newOrder
      this.getData() 
    },
    //自定义事件（字传父）获取当前用户点击的页数
    getCurrentPageNo(pageNo) {
      this.SearchData.pageNo = pageNo
      this.getData()
    },
    //加入购物车
    async addShopCart(id) {
      try {
        await this.$store.dispatch('detail/addShopCart', { skuId: id, skuNum: 1 })
        //加入成功，路由跳转
        this.$router.push({name:'shopcart'})
      } catch (error) {
        alert(error.message)
      }

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 60px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 241px;

                a {
                  color: #666;

                  img {
                    width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>