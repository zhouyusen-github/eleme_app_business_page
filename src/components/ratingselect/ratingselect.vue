<template>
  <div class="ratingselect">
    <div class="rating-type border-1px"><!--选择类型的名字-->
      <span @click="select(2)" class="block positive" :class="{'active':control.selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span><!--block是统一有的样式--><!--selectType用于确定谁被选中-->
      <span @click="select(0)" class="block positive" :class="{'active':control.selectType===0}">{{desc.positive}}<span class="count">{{positive_ratings.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':control.selectType===1}">{{desc.negative}}<span class="count">{{negative_ratings.length}}</span></span>
    </div>
    <div @click="content()" class="switch" :class="{'on':control.onlyContent}"><!--选择是否只看内容的评价-->
      <span class="icon-check_circle"></span><!--打勾按钮-->
      <span class="text">{{ $t("ratingselect.HideRatingsOnlyReviews") }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 选择类型在意思上有三种全选，正面的，反面的
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: { // 评价
        type: Array,
        default() { // 默认空数组
          return [];
        }
      },
      control: {
        type: Object,
        default() {
          return {
            selectType: ALL,
            onlyContent: false
          };
        }
      },
      desc: {
        type: Object,
        default() {
          return { // 默认选择类型的名字
            all: this.$i18n.t('all'),
            positive: this.$i18n.t('positive'),
            negative: this.$i18n.t('negative')
          };
        }
      }
    },
    computed: {
      positive_ratings() {
        return this.ratings.filter((rating) => { // filter是一个过滤函数
          return rating.rateType === POSITIVE; // 过滤出所有积极评论
        });
      },
      negative_ratings() {
        return this.ratings.filter((rating) => { // filter是一个过滤函数
          return rating.rateType === NEGATIVE; // 过滤出所有积极评论
        });
      }
    },
    methods: {
      select(type) {
        this.control.selectType = type;
      },
      content() {
        this.control.onlyContent = !this.control.onlyContent;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';
  .ratingselect
    .rating-type
      padding: 18px 0 // 用padding，而不是margin是因为要控制下面那条线长度
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0 // 防止block间隙
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        color: rgb(77, 85, 93)
        font-size: 12px
        line-height: 16px
        &.active // 被选中时的样式，共有变化
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active // 被选中时的样式
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active // 被选中时的样式
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 8px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17 ,27, 0.1)
      color: rgb(147, 153, 159)
      .icon-check_circle
        display: inline-block
        vertical-align: top // 把元素的顶端与行中最高元素的顶端对齐
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
      &.on
        .icon-check_circle
          color: #00c850
</style>
