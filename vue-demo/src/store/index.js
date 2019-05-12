import basicLayout, { getters as basicLayoutGetters } from '~/layouts/BasicLayout/state';

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from './plugins/logger';

Vue.use(Vuex);

const isDebug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    basicLayout,
  },
  getters: {
    ...basicLayoutGetters,
  },
  plugins: isDebug ? [createLogger()] : []
});

export default store;
