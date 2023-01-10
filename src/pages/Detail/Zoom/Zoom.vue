<!-- 放大镜组件 -->
<template>
  <div class="spec-preview">
    <img :src="skuImage.imgUrl" />
    <div class="event" ref="event" @mousemove="fangdajing"></div>
    <div class="big">
      <img :src="skuImage.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
  name: "Zoom",
  data() {
    return {
      currentIndex:0
    }
  },
  computed: {
    ...mapGetters('detail', ['skuInfo']),
    skuImageList() {
        return this.skuInfo.skuImageList || []
    },
    skuImage() {
        return this.skuImageList[this.currentIndex] || {}
      }
  },
  methods: {
  //放大镜处理
  fangdajing(event) {
    let event1 = this.$refs.event
    let big = this.$refs.big
    let mask = this.$refs.mask
    let left = event.offsetX - mask.offsetWidth / 2
    let top = event.offsetY - mask.offsetHeight / 2
    //判断越界
    left=left < 0 ? 0 : left
    left = left > (event1.offsetWidth - mask.offsetWidth) ? event1.offsetWidth - mask.offsetWidth : left
    top = top < 0 ? 0 : top
    top = top > (event1.offsetHeight - mask.offsetHeight) ? event1.offsetHeight - mask.offsetHeight : top
    //赋值
    mask.style.left = left + 'px'
    mask.style.top = top + 'px'
    //大图片移动
    big.style.left = -left * (big.offsetWidth / event1.offsetWidth) + 'px'
    big.style.top=-top* (big.offsetHeight / event1.offsetHeight) + 'px'
  }
  },
  mounted(){
 //获取当前索
    this.$bus.$on('getIndex', (index) => {
    this.currentIndex=index
 })
  }
   

  }
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>