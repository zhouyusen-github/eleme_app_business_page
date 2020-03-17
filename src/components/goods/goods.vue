<template>
  <div class="goods">
    <div class="menu-wrapper"><!--左侧--><!--是一个列表-->
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px"><!--分类名:精选热菜，精选凉菜--><!--border-1px是在base.styl实现的-->
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span><!--同之前的小图标-->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div><!--右侧-->
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;
  export default {
    props: { // 接收外部传入seller数据（这里是App.vue）
      seller: {
        type: Object
      }
    },
    data() { // 定义属性 ( 返回一个对象),和header.vue,App.vue相同格式
      return {
        goods: []
      };
    },
    created() { // 访问goods数据接口获取goods数据（同App.vue中访问seller接口获取数据的格式，不在App.vue就获取该数据的原因是，需要数据时再访问相关接口）
      this.$http.get('/api/goods').then(response => {
        // get data
        response = response.body;
        console.log(response);
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          console.log(this.goods);
        }
      }, response => {
        // error callback
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']; // 对应接口返回数据的5种情况，这里写好上面html代码就可以选择用
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
//样式介绍:超出部分是隐藏的，所以使用绝对定位布局,左边栏是固定的，右边栏是自适应的
  @import '../common/stylus/mixin'; //bg-image()，border-1px()的函数是在里面实现的
  .goods
    display: flex
    position: absolute
    top: 174px // "content-wrapper 134px bulletin-wrapper 40px，所以上面要留174空间
    bottom: 46px // 留给购物车栏的高度
    width: 100%
    overflow: hidden // 超过部分隐藏
    .menu-wrapper
      flex: 0 0 80px  // 80px是因为左侧栏栏目宽度是80
      width: 80px
      background: #f3f5f7
      .menu-item // 一行两行都要居中
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            // support位置的图片是根据参数要显示不同图片的
            &.decrease
              bg-image('decrease_3') // 需要@import '../common/stylus/mixin';
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')

    .foods-wrapper
      flex: 1
</style>
