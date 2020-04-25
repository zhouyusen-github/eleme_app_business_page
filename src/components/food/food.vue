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
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info"><!--不是每个商品都有商品介绍-->
          <h1 class="title">商品消息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper"><!--评论区-->
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item"><!--needShow函数直接受评价类型和是否有内容影响-->
                <div class="user"><!--单条评论-->
                  <span class="name">{{rating.username}}</span><!--右侧用户名-->
                  <img class="avater" width="12" height="12" :src="rating.avatar"><!--右侧用户图片-->
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span><!--向上向下大拇指图标-->
                  {{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div><!--这个是负责在没有评论数据时显示的-->
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import Vue from 'vue';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;

  export default {
   props: { // goods.vue传入这个值
     food: {
       type: Object
     }
   },
   data() {
     return {
       showFlag: false,
       // 需要传给ratingselect组件的数据
       selectType: ALL,
       onlyContent: false,
       desc: {
         all: '全部',
         positive: '推荐',
         negative: '吐槽'
       }
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
       // 状态初始化，这样离开详情页再进去时不会保留之前对评价的设置
       this.selectType = ALL;
       this.onlyContent = false;
     },
     hide() {
       this.showFlag = false;
     },
     addFirst(food) {
       Vue.set(this.food, 'count', 1); // 第一次可能是没有的，这一点和cartcontrol一样
     },
     needShow(type, text) {
       if (this.onlyContent && !text) {
         return false;
       }
       if (this.selectType === ALL) {
         return true;
       } else {
         return type === this.selectType;
       }
     }
   },
   components: {
     cartcontrol,
     split,
     ratingselect
   }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';
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
      position: relative // 不加这个子组件会相当于父父组件定位
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
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px // 和上面info的不同是因为，ratingselect是在rating内，ratingselect的占手机的样式宽度是由其自己处理,所以这里不控制宽度
      .title
        line-height: 14px
        margin-left: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            font-size: 0
            line-height: 12px
            .name
              display: inline-block
              vertical-align: top
              margin-right: 6px
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
            .icon-thumb_up,.icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
</style>
