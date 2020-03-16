<!--由于评论星星用到的地方很多所以单独作为一个组件写出来-->
<template>
  <div class="star" v-bind:class="starType"><!--由于使用时星星大小和位置的样式都不一样，所以用:class="starType"，这样可以动态地切换 class-->
    <span v-for="itemClass in itemClasses" v-bind:class="itemClass" class="star-item" track-by="$index"></span>
    <!--v-for是for循环个该组件，这比用原生js方便灵活很多-->
    <!--track-by="$index",通过trace-by给数组设定唯一标识。使Vue.js在渲染过程中会尽量复用原有的对象的作用域及DOM元素。不写不会出问题-->
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5; // 星星数量
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default { // star组件不同的大小尺寸等信息需要外部传入
    props: { // 以对象形式列出 prop,这些属性的名称和值分别是 prop 各自的名称和类型
      size: { // 星星尺寸24，36，48
        type: Number // 类型检测，输入类型一定要是number
      },
      score: { // 评分分数
        type: Number
      }
    },
    computed: { // 计算属性,在这里解决，避免复杂逻辑过程出现在html区域
      starType() { // 给html中的v-for="itemClass in itemClasses"提供数据
        return 'star-' + this.size; // 根据输入size拼出出一个class，实现各种情况的class，由下面css实现
      },
      itemClasses() { // 给html中的:class="itemClasses"提供数据
        let result = [];
        let score = Math.floor(this.score * 2) / 2; // 向下取0.5,例子中3.7是3颗整星，1颗半星，1颗空星,取为3.5
        let hasDecimal = score % 1 !== 0; // 有没有小数，有的话需要半星
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) { // 根据数字，往数组中添加整星
          result.push(CLS_ON);
        }
        if (hasDecimal) { // 有没有小数，有的话需要半星
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) { // 如果不够指定星星数量就补空星
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../common/stylus/mixin';
  .star
    font-size: 0
    .star-item
      display: inline-block  // 星星横向排列
      background-repeat: no-repeat
    &.star-48  // &.这种格式我不太懂，也查不到，生成网页后的html代码中是class = "star star-48"
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px // 星星之间间隔22像素
        background-size: 20px 20px
        &:last-child  // 伪类选择器:last-child指定父元素中最后一个p元素的背景色
          margin-left: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px // 星星之间间隔22像素
        background-size: 15px 15px
        &:last-child  // 伪类选择器:last-child指定父元素中最后一个p元素的背景色
          margin-left: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px // 星星之间间隔22像素
        background-size: 10px 10px
        &:last-child  // 伪类选择器:last-child指定父元素中最后一个p元素的背景色
          margin-left: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
