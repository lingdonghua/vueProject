<template>
  <div class="type-nav">
    <div class="container">
      <!-- 利用事件委托实现离开不显示背景颜色 -->
      <div @mouseleave="removeColor" @mouseenter="show">
        <h2 class="all">全部商品分类</h2>
        <!-- <transition name="sort"> -->
        <!-- 引用第三方动画库 -->
        <div class="sort animate__animated animate__fadeInDownBig" v-show="showList">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(item,index) in CategoryList"
              :key="item.id"
              :class="{cur:index===currenIndex}"
            >
              <h3 @mouseenter="background(index)">
                <a
                  :data-category-name="item.categoryName"
                  :data-category1Id="item.categoryId"
                >{{ item.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currenIndex===index?'block':'none'}">
                <div class="subitem">
                  <dl class="fore" v-for="items in item.categoryChild" :key="items.id">
                    <dt>
                      <a
                        :data-category-name="items.categoryName"
                        :data-category2Id="items.categoryId"
                      >{{ items.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="itemss in items.categoryChild" :key="itemss.id">
                        <a
                          :data-category-name="itemss.categoryName"
                          :data-category3Id="itemss.categoryId"
                        >{{ itemss.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- animate__animated animate__fadeInDownBig -->
        <!-- </transition> -->
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
// 引用第三方动画库 
import 'animate.css'
import { mapState } from 'vuex'
//引入lodash的节流函数throttle
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      //通过js控制鼠标移动的背景颜色
      currenIndex: -1,
      showList:true
    }
  },
  computed: {
    // CategoryList() {
    //   return this.$store.state.home.CategoryList
    // }
    // ...mapState({
    //   CategoryList: state => state.home.CategoryList
    // })
    ...mapState("home",['CategoryList'])
  },
  mounted() {
    //请求vuex的action获取服务器的商品数据，项目优化建议放在app上请求，因为这个会多次请求服务器，不太好
    // this.$store.dispatch('CategoryList')
    //当路由hash值位搜索组件时，隐藏三级导航
    if (this.$route.meta.navNotShow) {
      this.showList=false
    }
  },
  methods: {
    // background(index) {
    //   this.currenIndex=index
    // },
    //运用lodash的节流
    background: throttle(function (index) {
      this.currenIndex=index
    }, 50),
    //鼠标经过显示三级组件
    show() {
      this.showList=true
    },
    removeColor() {
      this.currenIndex = -1
      //让search组件隐藏
      if (this.$route.meta.navNotShow) {
        this.showList = false
      }
    },
    //采用编程式导航+事件委派的方案实现点击跳转至搜索最为合适（节约性能）
    //点击三级导航路由的跳转至搜索
    goSearch(event) {
      //event.target.dataset是指获取当前点击dom的值，若没有对应的值则取的是undefined(是获取自定义的以data为开头的属性值)
      console.log('@',event.target.dataset);
      let {categoryName ,category1id,category2id,category3id} =event.target.dataset
      if (categoryName) {
        let location = { name: 'search' }
        let query = { categoryName: categoryName }
        if (category1id) {
          query.category1Id=category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id=category3id
        }
        location.query = query
        location.params=this.$route.params
        this.$router.push(location)
      }
    }
  }

}
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
        overflow: auto;
        height: 447px;

        .item {
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
          采用js控制显示与隐藏 &:hover {
            .item-list {
              display: block;
            }
          }
        }

        // .item:hover {
        //   background-color: SkyBlue;
        // }
        .cur {
          background-color: SkyBlue;
        }
      }
      //控制滚动条的伪类
      ::-webkit-scrollbar {
        display: none;
      }
    }
    //自定义动画，要包裹在transition标签上，且配上name=’sort‘ 本项目采用了第三方动画库
    //   .sort-enter {
    //     height: 0px;
    //   }
    //   .sort-enter-to {
    //     height: 447px;
    //   }
    //   .sort-enter-active {
    //     transition: all 0.5s linear;
    //   }
  }
}
</style>