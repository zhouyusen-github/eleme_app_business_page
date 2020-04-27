<template>
  <div class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="description border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              元
            </div>
          </li>
        </ul>
      </div>
      <split></split>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  export default {
    props: {
      seller: { // 这个是在router-view中就发送了
        type: Object
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';
  .seller // 和前面两个大模块一样限制范围
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .description
        display: flex
        align-items: center
        padding-bottom: 18px // 上面那个18px是最外层，这个是和线之间的
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .star
          margin-right: 8px
        .text
          margin-right: 12px
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1 // flex-grow 值，flex-shrink 取 1，flex-basis 取 0%
          text-align: center // 把文本排列到中间
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
            margin-bottom: 4px
          .content
            font-size: 10px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 24px
            .stress
              font-size: 24px
</style>
