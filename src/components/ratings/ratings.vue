<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">{{ $t("ratings.score") }}</div>
          <div class="rank">{{ $t("ratings.rankRate") }}{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">{{ $t("ratings.serviceScore") }}</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">{{ $t("ratings.foodScore") }}</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">{{ $t("ratings.deliveryTime") }}</span>
            <span class="delivery">{{seller.deliveryTime}}{{ $t("Unit.minute") }}</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :control="control" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper"><!--评论区-->
        <ul v-show="ratings.length">
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28px" height="28px" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{ $t("ratings.deliveryTime") }}{{rating.deliveryTime}}{{ $t("Unit.minute") }}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommand" v-show="rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings.length">{{ $t("Common.NoCommentsYet") }}</div><!--这个是负责在没有评论数据时显示的-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import star from 'components/star/star';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  import {formatDate} from 'components/common/js/date';

  const ALL = 2;
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        // 需要传给ratingselect组件的数据
        control: {
          selectType: ALL,
          onlyContent: false
        },
        desc: {
          all: this.$i18n.t('all'),
          positive: this.$i18n.t('positive'),
          negative: this.$i18n.t('negative')
        }
      };
    },
    created() {
      this.$http.get('/static/' + this.$i18n.t('language') + '/ratings.json').then(response => { // 和App.vue一样访问接口获取数据  /api/ratings 是在webpack.dev.conf.js定义的
        response = response.body;
        console.log(response);
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
        }
      }, response => {
        // error callback
      });
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    methods: {
      needShow(type, text) {
        if (this.control.onlyContent && !text) {
          return false;
        }
        if (this.control.selectType === ALL) {
          return true;
        } else {
          return type === this.control.selectType;
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      cartcontrol,
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';
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
        @media only screen and (max-width: 320px) {
          flex: 0 0 110px
          width: 120px
        }
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
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px) {
          padding-left: 6px
        }
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 12px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            line-height: 12px
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 12px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 27)
        .delivery-wrapper
          font-size: 0
          .title // 这里title和delivery都是span所以不用inline-block会自动同步高低
            line-height: 12px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          margin-right: 12px
          img
            height: auto
            border-radius: 50%
        .content
          position: relative
          flex: 1 // 当时缺了这个导致 使用默认值flex 的默认值是 0 1 auto
          .name
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 12px
            margin-bottom: 4px
          .star-wrapper
            margin-bottom: 6px
            display: flex
            align-items: center // 弹性盒子元素在该行的侧轴（纵轴）上居中放置
            .star
              margin-right: 6px
            .delivery
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height: 18px
            margin-bottom: 8px
          .recommand
            display: flex
            align-items: center
            flex-wrap: wrap // 规定灵活的项目在必要的时候拆行或拆列。
            line-height: 16px
            .icon-thumb_up, .item
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background-color: rgb(255, 255, 255)
        .time
          position: absolute
          right: 0
          top: 0
          line-height: 12px
          font-size: 10px
          font-weight: 200
          color: rgb(147, 153, 159)
</style>
