<template>
  <a-layout-sider
    :width="width"
    :collapsed="collapsed"
    breakpoint="lg"
    class="c-layout-sider"
    :class="{[`c-layout-sider-${theme}`]: true, 'c-layout-sider-collapsed': collapsed }"
    :theme="theme"
  >
    <div id="logo" class="c-layout-sider-logo">
      <router-link class="logo-link" to="/">
        <img class="logo-image" alt="logo" :src="logo">
        <h1 class="logo-title" v-text="title" />
      </router-link>
    </div>
    <a-menu
      v-if="collapsed"
      :style="{ width: `${!collapsed ? width : 80}px` }"
      mode="inline"
      :theme="theme"
      class="c-layout-sider-menu"
      :selected-keys="getSelectedMenuKeys()"
      @openChange="onChangeOpenMenuKeys"
    >
      <template v-for="route in routes">
        <a-menu-item
          v-if="!route.hidden && !route.children"
          :key="route.path"
          v-text="$_i18n(`title.${route.path}`)"
        />
        <sider-sub-menu
          v-if="!route.hidden && route.children"
          :key="route.path"
          :menu="route"
          :i18n="i18n"
        />
      </template>
    </a-menu>
    <a-menu
      v-else
      :style="{ width: `${!collapsed ? width : 80}px` }"
      mode="inline"
      :theme="theme"
      class="c-layout-sider-menu"
      :open-keys="openMenuKeys"
      :selected-keys="getSelectedMenuKeys()"
      @openChange="onChangeOpenMenuKeys"
    >
      <template v-for="route in routes">
        <a-menu-item
          v-if="!route.hidden && !route.children"
          :key="route.path"
        >
          <router-link :to="route.path">
            <a-icon v-if="route.meta && route.meta.icon" :type="route.meta.icon" />
            <span v-text="$_i18n(`title.${route.path}`)" />
          </router-link>
        </a-menu-item>
        <sider-sub-menu
          v-if="!route.hidden && route.children"
          :key="route.path"
          :menu="route"
          :i18n="i18n"
        />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import SiderSubMenu from './SiderSubMenu.vue';

export default {
  name: 'SiderMenus',
  components: {
    SiderSubMenu
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
  data() {
    return {
      $i18nPath: 'router',
      openMenuKeys: this.getSelectedMenuKeys()
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
    isMainMenu(key) {
      return key.split('/').filter(item => (item)).length === 1;
    },
    getSelectedMenuKeys() {
      const { path } = this.$route;
      const menuItems = path.split('/').filter(item => (item));
      const openKeys = [];

      for (const item of menuItems) {
        openKeys.push(openKeys.length ? `${openKeys[openKeys.length - 1]}/${item}` : `/${item}`);
      }
      return openKeys;
    },
    onChangeOpenMenuKeys(openMenuKeys) {
      const moreThanOne = openMenuKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;

      this.openMenuKeys = moreThanOne ? [openMenuKeys.pop()] : [...openMenuKeys];
    },
    i18n(key) {
      return this.$_i18n(`title.${key}`);
    },
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@import 'styles/variables.less';

.c-layout-sider {
  overflow: hidden;

  .c-layout-sider-logo {
    height: 64px;
    overflow: hidden;
    padding-left: 24px;
    background: @layout-logo-background;
    line-height: 64px;

    .logo-link {
      display: flex;
      align-items: center;
      height: 100%;

      .logo-image {
        max-height: 36px;
        border-radius: 5px;
      }

      .logo-title {
        margin: 0;
        padding-left: 17px;
        font-size: 16px;
        white-space: nowrap;
      }
    }
  }

  &.c-layout-sider-dark {
    .c-layout-sider-logo {
      .logo-link {
        .logo-title {
          color: @white;
        }
      }
    }
  }

  &.c-layout-sider-collapsed {
    .c-layout-sider-logo {
      width: 100%;

      .logo-link {
        .logo-title {
          display: none;
        }
      }
    }
  }

  .c-layout-sider-menu {
    transition: all 0.2s;
  }
}
</style>
