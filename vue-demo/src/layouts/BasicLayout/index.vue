<template>
  <a-layout class="basic-layout">
    <sider-menu :collapsed="collapsed" :is-mobile="false" :title="$_i18n('title')" />
    <a-layout>
      <a-layout-header class="c-layout-header">
        <global-header :collapsed="collapsed" :is-mobile="false" @collapse="onToggleSider" />
      </a-layout-header>
      <a-layout-content class="basic-layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { SiderMenu, GlobalHeader } from '~/components';
import { mapActions, mapGetters } from 'vuex';
import { actionTypes } from './state';

export default {
  name: 'BasicLayout',
  components: {
    SiderMenu,
    GlobalHeader
  },
  data() {
    return {
      $i18nPath: 'layout'
    };
  },
  computed: {
    ...mapGetters([
      'collapsed'
    ])
  },
  created() {
  },
  methods: {
    ...mapActions({
      setState: actionTypes.SET_STATE
    }),
    onToggleSider(collapsed) {
      this.setState({ collapsed });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import 'styles/variables.less';

.basic-layout {
  height: 100%;

  &:empty {
    display: none;
  }

  .c-layout-header {
    padding: 0;
    background-color: @white;
  }

  .basic-layout-content {
    margin: 24px;
  }
}
</style>
