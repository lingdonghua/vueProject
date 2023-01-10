<!-- 因为项目中多处用到轮播图，所以封装一个全局组件 -->
<template>
  <div class="swiper-container" id="floor1Swiper" ref="carouselDom">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css'
export default {
  name: 'Carousel',
  props: {
    list: {
      type: Array,
      require:true
    }
  },
  watch: {
    list: {
      immediate:true,
      handler() {
        this.$nextTick(function () {
        new Swiper (this.$refs.carouselDom, {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          },
        //自动播放
        autoplay:{
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        }) 
    })
      }
    }
  },
}
</script>

<style>
</style>