<template>
  <div class="seller" ref="seller">
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
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="item in seller.supports">
            <supportIco :size=4 :type="item.type"></supportIco>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="shopPicture">
        <h1 class="title">公告与活动</h1>
        <div class="pictures-wrapper" ref="picturesWrapper">
          <ul class="picture-list" ref="pictureList">
            <li v-for="picture in seller.pics" class="picture">
              <img width="120px" height="90px" :src="picture">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infomation">
        <h1 class="title">商家信息</h1>
        <ul v-if="seller.infos" class="infos">
          <li class="infos-item" v-for="item in seller.infos">
            <span class="text">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';
  import split from 'components/split/split';
  import supportIco from 'components/support-ico/support-ico';
  import BScroll from 'better-scroll';
  export default {
    props: {
      seller: { // 这个是在router-view中就发送了
        type: Object
      }
    },
    created() {
      this.$nextTick(() => {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      });
      this.$nextTick(() => {
        if (this.seller.pics) { // 计算pictureList的dom应有宽度，并修改
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          console.log(width);
          this.$refs.pictureList.style.width = width + 'px'; // 横向滚动需要手动设置内部子元素宽度，这样才会滚动，因为不设置是自动不会超出父组件宽度的，自然也不会滚动
        }
        if (!this.picturesWrapperScroll) {
          this.picturesWrapperScroll = new BScroll(this.$refs.picturesWrapper, {
            scrollX: true,
            click: true
          });
        } else {
          this.picturesWrapperScroll.refresh();
        }
      });
    },
    components: {
      star,
      split,
      supportIco
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
    .bulletin
      position: relative
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .content-wrapper
        padding: 0 12px 12px 16px
        .content
          font-size: 12px
          font-weight: 200
          color: rgb(240, 20, 20)
          line-height: 24px
      .supports
        .support-item
          padding: 16px 12px
          border-top: 1px solid rgba(7, 17, 27, 0.1)
          .support-ico
            display: inline-block
            vertical-align: top
            margin-right: 6px
          .text
            display: inline-block
            vertical-align: top
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 16px
    .shopPicture
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .pictures-wrapper
        width: 100%
        overflow: hidden // 超出范围隐藏
        white-space: nowrap // 不折行
        .picture-list
          font-size: 0
          .picture
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .infomation
      position: relative
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .infos
        .infos-item
          padding: 16px 12px
          border-top: 1px solid rgba(7, 17, 27, 0.1)
          .text
            display: inline-block
            vertical-align: top
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 16px
</style>
