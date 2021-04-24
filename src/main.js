// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import VueI18n from 'vue-i18n';
import messages from './lang'; // 引入中英文文本

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueI18n);
Vue.config.productionTip = false;

const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];

const router = new VueRouter({
  routes: routes
});

// 根据浏览器设置语言
let lang = navigator.language;
let langTransform = lang;
if (lang === 'zh' || lang === 'zh-CN') {
  langTransform = 'cn';
} else {
  langTransform = 'en';
}

// 启动i18n
const i18n = new VueI18n({
  locale: langTransform, // 设置语言
  messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n, // 启动i18n
  router,
  components: { App },
  template: '<App/>'
});
