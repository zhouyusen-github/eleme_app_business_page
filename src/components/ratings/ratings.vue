<template>
  <div>i am ratings</div>
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
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    created() {
      this.$http.get('/api/ratings').then(response => { // 和App.vue一样访问接口获取数据
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
</style>
