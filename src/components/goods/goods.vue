<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper"><!--左侧--><!--是一个列表-->
      <ul><!--因为是列表，所以用ul-->
        <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{'current':index === currentIndex}"><!--当currentIndex===index执行current样式-->
          <span class="text border-1px"><!--分类名:精选热菜，精选凉菜--><!--border-1px是在base.styl实现的-->
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"/><!--同之前的小图标-->
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper"><!--右侧-->
      <ul>
        <li v-for="item in goods" class="food-list"><!--各个分类名先一个循环--><!--末尾加hook是一个编程习惯，表明这只是为了被js选择，没有实际的效果-->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px"><!--各个分类名下有多个食品-->
              <div class="icon"><!--食品图标-->
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content"><!--食品介绍-->
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now_price">￥{{food.price}}</span>
                  <span class="old_price" v-show="food.oldPrice">￥{{food.oldPrice}}</span><!--原价这个属性不一定有-->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'; // 引入npm安装的better-scroll组件
  const ERR_OK = 0;
  export default {
    props: { // 接收外部传入seller数据(这里是App.vue)
      seller: {
        type: Object
      }
    },
    data() { // 定义属性 ( 返回一个对象),和header.vue,App.vue相同格式
      return {
        goods: [],
        listHeight: [], // 记录每个右侧区间的高度
        scrollY: 0 // 实时拿到右侧Y值，和左侧索引映射
      };
    },
    computed: {
      currentIndex() { // 左侧根据右侧滑动而变动实现
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (this.scrollY >= height1 && this.scrollY < height2) { // 原理:better-scroll返回的滑动高度和.scrollHeight算出各食品分类区块的高度比较，返回符合的index，给html代码去做对应处理
            return i;
          }
        }
        return this.listHeight.length - 1;
      }
    },
    created() { // 访问goods数据接口获取goods数据(同App.vue中访问seller接口获取数据的格式，不在App.vue就获取该数据的原因是，需要数据时再访问相关接口)
      this.$http.get('/api/goods').then(response => {
        // get data
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      }, response => {
        // error callback
      });
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']; // 对应接口返回数据的5种情况，这里写好上面html代码就可以选择用
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {}); // 接收两个参数 1.一个dom对象 2.一个json对象(option),这个组件应该是给这段dom添加了样式什么的
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3 // 传这个属性的目的是希望在滚动过程中，随时告诉我Y值
        }); // this.$refs.menuWrapper对应html中的ref="menuWrapper"所在那块dom对象
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() { // 各食品大类区块高度的数组
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list'); // 各食品大类区块的数组，原生js API
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += (item.scrollHeight); // Element.scrollHeight是内容 + 内边距 + 边框 + 外边距 （如果有滚动条再加上滚动条的大小）的高。比clientHeight多了外边距
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      goods: function () {
        this.$nextTick(function() {
          this._initScroll();
          this._calculateHeight();
        });
      }
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
        &.current // 右边对应的左边区块会变白，字体会加粗
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          .text
            font-weight: 700 // 字符加粗,代码写在这一层才有效，加上一层会被下面的font-size: 12px影响而失效
            border-none()
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
      flex: 1 // 右边的位置就全给了
      .title // 看设计图'外卖01'的特色粥品，参数在那里(记得除2)
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color:rgb(147, 153, 159)
        background: #f3f5f7
      .food-item // 左边图片空间是固定的,右边内容是自由的,适合用flex
        display: flex
        margin: 18px
        padding-bottom: 18px // border是在margin和padding的边界上的
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child // 最后一个
          border-none() // 最后一个要关闭1像素border
          padding-bottom: 0 // 设计图上最后一个食品距离下一个大标题只有18px，那么需要关闭padding，否则就36px了
        .icon // 左边图片宽度是固定的
          flex: 0 0 57px
          margin-right: 10px
        .content // 右侧自适应
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color:rgb(7, 17, 27)
          .description, .extra // 公有属性可以写在一起减少代码量
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159) // 灰色
          .description // 有区别的再分开写
            line-height: 12px
            margin-bottom: 8px
          .extra
            &.count
              margin-right: 12px // 月售和好评率之间有12像素间隔
          .price
            font-weight: 700
            line-height: 24px
            .now_price
              margin-right: 8px
              font-size: 14px
              color:rgb(240, 20, 20)
            .old_price
              text-decoration: line-through // 横线
              font-size: 10px
              color: rgb(147, 153, 159)

</style>
