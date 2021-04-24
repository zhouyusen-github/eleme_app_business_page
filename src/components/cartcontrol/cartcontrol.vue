<template>
  <div  class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div><!--加减按钮本质是图标字体实现的-->
    </transition>
    <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <span class="inner icon-add_circle"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1); // food在注册时是没有count属性的，要监控一个原来不存在的属性，首次使用时必须要用Vue.set
        } else {
          this.food.count++;
        }
        console.log(this.food.count);
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size: 0
      .cart-decrease
        display: inline-block // 三个东西都是同行排列自然用inline-block
        padding: 6px // 增加点击区域
        transition: all 0.5s // 过渡效果
        &.move-enter, &.move-leave-to // 出现时的第一帧，消失时的最后一帧，应用的样式
          opacity: 0 // 透明度设置为0
          transform: translate3D(24px,0,0) // Transform属性应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜,translate3d(x,y,z),z轴是z-index的z
          .inner
            transform: rotate(180deg) // 旋转180度
        .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0,160,220)
          transition: all 0.5s linear
      .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
      .cart-add
        display: inline-block // 三个东西都是同行排列自然用inline-block
        padding: 6px // 增加点击区域
        .inner
          line-height: 24px
          font-size: 24px
          color: rgb(0,160,220)
</style>
