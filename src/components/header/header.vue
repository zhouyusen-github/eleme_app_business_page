<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width ="64" height="64" :src="seller.avatar"><!--src前加冒号才能加载图片，因为seller内的东西是后面传进来的-->
        <!--src就是访问网址获取图片，反映在网页上-->
      </div><!--头像区-->
      <div class="content">
        <div class="title">
          <span class = "brand"></span>
          <span class = "name">{{seller.name}}</span><!--店名-->
        </div>
        <div class="description"><!--外卖方式描述-->
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support"><!--加v-if，因为seller初始化是空{}，那么seller.supports是undefined，undefined没有[0]会报错-->
          <span class = "icon" :class="classMap[seller.supports[0].type]"></span><!--动态class，随接口返回变动-->
          <span class = "text">{{seller.supports[0].description}}</span>
        </div>
      </div><!--标题-->
      <div v-if="seller.supports" class="support-count"><!--右下角的“5个”即商标支持-->
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div><!--内容区-->
    <div class="bulletin-wrapper"><!--公告区bulletin-->
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><!--两个span写一行也可以消除空白间隙-->
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']; // 对应接口返回数据的5种情况，这里写好上面html代码就可以选择用
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';// 不能用common缩写，那是引入库才能用的
  // 参照设计师稿子来写样式
  // 用'.'的层级机制,正好和div的层级相一致
  .header
    color: #fff
    background: #999
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px  // content区设计稿除2
      font-size: 0  // 字体大小，虽然这里只有一张图片，但是不设字体大小为0的话，会多占一些空间
      .avatar
        display: inline-block  // display常见属性值，结合了行内元素与块级元素的一些特点
        vertical-align: top  // 把元素的顶端与行中最高元素的顶端对齐
      .content
        display: inline-block
        margin-left: 16px  // 设置元素的左外边距
        //font-size: 14px  // 如果不设置，会继承父层级的0，那么就看不到文字了
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')  // 这个功能是用webpack实现的，这个brand是class="brand"
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px  // 行高
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            // support位置的图片是根据参数要显示不同图片的
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 12px
      .support-count
        position: absolute
        right: 12px  // 距离右绝对边界12px
        bottom: 14px  // 距离底绝对边界14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px  // 14像素的圆角
        background-color: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top  //顶部对齐
          font-size: 10px
        .icon-keyboard_arrow_right  //来自icon.styl
          margin-left: 2px  //和左边差两像素
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px //栏高度28像素
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap  // white-space 属性设置如何处理元素内的空白。nowrap文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
      overflow: hidden  // overflow 属性规定当内容溢出元素框时发生的事情。hidden内容会被修剪，并且其余内容是不可见的。
      text-overflow: ellipsis  // text-overflow属性指定当文本溢出包含它的元素。ellipsis显示省略符号来代表被修剪的文本。
      background-color: rgba(7, 17, 27, 0.2)  // 设置背景颜色，这样才能看出来公告栏
      .bulletin-title
        display: inline-block  // display 属性规定元素应该生成的框的类型。inline-block行内块元素。
        vertical-align: top  // vertical-align 属性设置元素的垂直对齐方式。top把元素的顶端与行中最高元素的顶端对齐
        margin-top: 7px  // 把图片压下来一点
        width: 22px
        height: 12px
        bg-image('bulletin')  // 引入图片，bg-image是之前写好的函数
        background-size: 22px 12px  // background-size调整图片到指定大小，上面的width和height是显示位置的大小
        background-repeat: no-repeat  // background-repeat 属性设置是否及如何重复背景图像。
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
</style>
