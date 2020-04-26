<template>
  <div>i am ratings</div>
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
  .ratings // 留出上面栏的空间
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview // 使用弹性布局
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        border-right: 1px solid rgba(7, 17 ,27, 0.1)
        text-align: center
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size:24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color:rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding-left: 24px
</style>
