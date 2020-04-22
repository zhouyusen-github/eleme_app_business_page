<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="image-header">
        <img :src="food.image">
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
 export default {
   props: { // goods.vue传入这个值
     food: {
       type: Object
     }
   },
   data() {
     return {
       showFlag: false
     };
   },
   methods: {
     show() {
        this.showFlag = true;
     }
   }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    // 为了全屏覆盖不过留下购物车的空间
    position: fixed // 生成绝对定位的元素，相对于浏览器窗口进行定位。
    left: 0
    top: 0
    bottom: 48px
    z-index: 30 // 为了在堆叠顺序上，不覆盖购物车弹开的框
    width: 100%
    background: #fff
    transition: all 3.5s
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .image-header // 样式需要处理的问题是，在不知道图片大小，且图片没加载出来前就占好位置，避免抖动的现象
      position: relative
      height: 0
      padding-top: 100% // 定义基于父元素宽度的百分比上内边距，这样就是这块就是撑到一个正方形了
      img // 图片撑满上面给的空间
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
</style>
