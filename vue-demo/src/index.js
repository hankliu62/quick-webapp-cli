import '~/app.less';
import 'ant-design-vue/dist/antd.css';
import 'babel-polyfill';

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Router from 'vue-router';
import AntdVue from 'ant-design-vue';

import routes from '~/routes';
import store from '~/store';
import locales from '~/locales';
import Pages from '~/pages';
import { I18nEnhance } from '~/plugins';

// 引入i18n国际化插件
Vue.use(VueI18n);

// 扩展vue-i18n $t
I18nEnhance.init();

const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: locales,
});

Vue.config.productionTip = false;

Vue.use(Router);

Vue.use(AntdVue);

const router = new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes
});

new Vue({
  el: '#root',
  router,
  store,
  i18n,
  render: h => h(Pages)
});
