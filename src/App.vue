<template>
  <div>
    <v-header :seller="seller"></v-header><!--:seller="seller"是传递seller到header组件--><!--seller是访问seller接口返回的数据-->
    <div class="tab border-1px">
      <div class="tab-item">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">{{ $t("App.goods") }}</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">{{ $t("App.ratings") }}</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">{{ $t("App.seller") }}</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view><!--:seller="seller"同时会给这些组件发送seller-->
    </keep-alive>
    <div class="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
  import {urlParse} from 'components/common/js/util';
  const ERR_OK = 0; // 代码风格，独立出来修改方便
  export default {
    data() { //
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam); // 输入url：http://localhost:8080/?id=12345&a=b#/seller 即可测试
            return queryParam.id;
          })()
        }
      };
    },
    // 生命周期函数create
    created() {
      // vue-resource
      this.$http.get('/static/' + this.$i18n.t('language') + '/seller.json?id=' + this.seller.id).then(response => { // 访问后台api接口返回数据（这里是访问了模拟数据）  /api/seller 是在webpack.dev.conf.js定义的
        // get data
        response = response.body; // 查github上vue-resource介绍的api,接口随版本会变动
        console.log(response);
        if (response.errno === ERR_OK) { // 对应build/webpack.dev.conf.js的devServer的before下面json设置的错误码
          let sellerId = this.seller.id; // 保留seller.id
          this.seller = response.data; // // 对应build/webpack.dev.conf.js的devServer的before下面json设置的data
          this.seller.id = sellerId;
          console.log(this.seller);
        }
      }, response => {
        // error callback
      });
    },
    components: {
      'v-header': header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './components/common/stylus/mixin.styl'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    //border-bottom: 1px solid rgba(7,17,27,0.9)
    border-1px(rgba(7, 17, 27, 0.9))  // rgba最后一位是透明度
    .tab-item
      flex: 1
      text-align: center
</style>
