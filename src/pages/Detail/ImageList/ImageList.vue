<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="skuImage,index in skuImageList" :key="skuImage.id">
        <img :src="skuImage.imgUrl" @click="setIndex(index,$event)" ref="img" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import {
    mapGetters
  } from 'vuex';
  export default {
  name: "ImageList",
  data() {
    return {
      }
    },
    computed: {
      ...mapGetters('detail', ['skuInfo']),
      skuImageList() {
        return this.skuInfo.skuImageList || []
      }
    },
  updated() {
      this.$nextTick(function () {
        new Swiper(this.$refs.cur, {

          //一页显示多少张图片
          slidesPerView : 3,
          // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        })
      })
  },
  methods: {
    setIndex(index, event) {
      //用data自定义属性current来操作会出现bug，就是点击了轮播图后面的图片会自动回弹到第一页，所有直接操作dom了
      let imgs = this.$refs.img
      imgs.forEach((item) => {
        item.className = ''
      })
      event.target.className='active'
      //把索引值传给zoom组件
      this.$bus.$emit('getIndex', index)
      }
    }
  }
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>