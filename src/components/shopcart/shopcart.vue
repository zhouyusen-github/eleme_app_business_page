<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper"><!--包装logo的wrapper-->
          <div class="logo">
            <span class="icon-shopping_cart"></span><!--引入图标字体文件，来自icon.styl-->
          </div>
        </div>
        <div class="price"></div>
        <div class="description"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
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
        .description
          display: inline-block
      .content-right
        flex: 0 0 105 -ms-background-position-x
        width: 105px
</style>
