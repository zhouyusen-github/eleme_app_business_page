<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper"><!--包装logo的wrapper-->
          <div class="logo">
            <span class="icon-shopping_cart"></span><!--引入图标字体文件，来自icon.styl-->
          </div>
          <div class="num">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="description">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{minPrice}}起配送
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: { // 接收外部传入seller数据(这里是App.vue)
      selectFoods: { // 保存了选择商品的数组
        type: Array,
        default() {
          // return [];
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () { // 依赖selectFoods，计算所有想购买商品总价
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () { // 依赖selectFoods，计算所有想购买商品总数，用于购物车右上角的数字
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count;
        });
        return total;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed // 生成绝对定位的元素，相对于浏览器窗口进行定位。而absolute是相对于父元素
    left: 0
    bottom: 0
    z-index: 50 // 因为要盖住后面的内容
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0 // 消去inline-block间隙
      color: rgba(244,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative // 生成相对定位的元素，相对于其正常位置进行定位
          top: -10px // 设计稿里其实没有，这就是图标往上突出效果的实现
          margin: 0 12px
          padding: 6px // (36-12)/2
          width: 56px
          height: 56px
          box-sizing: border-box // 这样设置，内边界和边框就会在给定高宽内计算，而不是在外
          vertical-align: top // 把元素的顶端与行中最高元素的顶端对齐
          text-align: center // 把文本排列到中间
          border-radius: 50% //圆角设50%那么就是个圆
          background: #141d27
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius:16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4) // 阴影
          .logo
            width:100% //宽高撑满父元素
            height:100%
            border-radius: 50%
            background: #2b343c // 老师使用ps取色器取到这个颜色的
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(244,255,255,0.1)
          font-size: 16px
          font-weight: 700
        .description
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px
          font-weight: 400
      .content-right
        flex: 0 0 105 -ms-background-position-x
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
</style>
