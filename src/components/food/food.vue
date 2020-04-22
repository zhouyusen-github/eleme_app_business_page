<template>
  <div v-show="showFlag" class="food">

  </div>
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
  .food {
    // 为了全屏覆盖不过留下购物车的空间
    position: fixed // 生成绝对定位的元素，相对于浏览器窗口进行定位。
    left: 0
    top: 0
    bottom: 48px
    z-index: 30 // 为了在堆叠顺序上，不覆盖购物车弹开的框
    width: 100%
    background: #fff
  }
</style>
