<template>
  <a-drawer
    v-if="isMobile"
    :visible="!collapsed"
    placement="left"
    :closable="false"
  >
    <sider-menus
      :is-mobile="isMobile"
      :collapsed="isMobile ? false : collapsed"
      :theme="theme"
      :width="width"
      :logo="logo"
      :title="title"
    />
  </a-drawer>
  <sider-menus
    v-else
    :is-mobile="isMobile"
    :collapsed="collapsed"
    :theme="theme"
    :width="width"
    :logo="logo"
    :title="title"
  />
</template>

<script>
import SiderMenus from './SiderMenus.vue';

export default {
  name: 'SiderMenu',
  components: {
    SiderMenus
  },
  props: {
    isMobile: {
      type: Boolean,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
    },
    width: {
      type: Number,
      default: 256,
    },
    logo: {
      type: String,
      default: '/static/images/layouts/logo.jpg',
    },
    title: {
      type: String,
      default: '',
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
