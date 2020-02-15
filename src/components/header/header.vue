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
          <span class = "icon"></span>
          <span class = "text">{{seller.supports[0].description}}</span>
        </div>
      </div><!--标题-->
    </div><!--内容区-->
    <div class="bulletin-wrapper"></div><!--公告区-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      seller: {
        type: Object
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';//不能用common缩写，那是引入库才能用的
  //参照设计师稿子来写样式
  //用'.'的层级机制,正好和div的层级相一致
  .header
    color: #fff
    background: #000
    .content-wrapper
      padding: 24px 12px 18px 24px  //content区设计稿除2
      font-size: 0//字体大小，虽然这里只有一张图片，但是不设字体大小为0的话，会多占一些空间
      .avatar
        display: inline-block //display常见属性值，结合了行内元素与块级元素的一些特点
      .content
        display: inline-block
        margin-left: 16px//设置元素的左外边距
        font-size: 14px//如果不设置，会继承父层级的0，那么就看不到文字了
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat

</style>
