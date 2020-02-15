<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width ="64" height="64" :src="seller.avatar"><!--src前加冒号才能加载图片，因为seller内的东西是后面传进来的-->
        <!--src就是访问网址获取图片，反映在网页上-->
      </div><!--头像区-->
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

</style>
