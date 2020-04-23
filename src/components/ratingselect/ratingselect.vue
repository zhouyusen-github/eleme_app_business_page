<template>
  <div class="ratingselect">
    <div class="rating-type"><!--选择类型的名字-->
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
    </div>
    <div class="switch"><!--选择是否只看内容的评价-->
      <span class=".icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  // 选择类型在意思上有三种全选，正面的，反面的
  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: { // 评价
        type: Array,
        default() { // 默认空数组
          return [];
        }
      },
      selectType: { // 选择类型
        type: Number,
        default: ALL
      },
      onlyContent: { // 是否只看有内容的评价
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return { // 默认选择类型的名字
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
