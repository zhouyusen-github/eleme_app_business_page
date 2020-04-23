<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food2">
      <div><!--better-scroll的规则是作用于dom的第一个子结构，所以套多一个div-->
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide"><!--返回按钮-->
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now_price">￥{{food.price}}</span><span class="old_price" v-show="food.oldPrice">￥{{food.oldPrice}}</span><!--原价这个属性不一定有-->
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div @click="addFirst(food)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import Vue from 'vue';

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
       this.$nextTick(() => {
         if (!this.scroll) {
           this.scroll = new BScroll(this.$refs.food2, {
             click: true
           });
         } else {
           this.scroll.refresh();
         }
       });
     },
     hide() {
       this.showFlag = false;
     },
     addFirst(food) {
       Vue.set(this.food, 'count', 1); // 第一次可能是没有的，这一点和cartcontrol一样
     }
   },
   components: {
     cartcontrol
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
    transition: all 1s
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
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px // 让点击区域变大好点一点
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        height: 10px
        .sell-count,.rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now_price
          margin-right: 8px
          font-size: 14px
          color:rgb(240, 20, 20)
        .old_price
          text-decoration: line-through // 横线
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160, 220)
</style>
