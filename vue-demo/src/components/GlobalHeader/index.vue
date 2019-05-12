<template>
  <div class="c-global-header">
    <span class="c-global-header-trigger" @click="onCollapse">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      />
    </span>
    <slot />
  </div>
</template>

<script>
import { Platform } from '~/plugins';

export default {
  name: 'GlobalHeader',
  props: {
    isMobile: {
      type: Boolean,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      $i18nPath: 'exception',
    };
  },
  methods: {
    onTriggerCollapseEvent(collapsed) {
      Platform.emit(Platform.Event.SIDE_MENU_COLLAPSED, collapsed);
    },
    onCollapse() {
      const { collapsed } = this;
      const nextCollapsed = !collapsed;

      this.$emit('collapse', nextCollapsed);
      this.onTriggerCollapseEvent(nextCollapsed);
    }
  },
};
</script>

<style lang="less" scoped>
@import 'styles/variables.less';

.c-global-header {
  .c-global-header-trigger {
    padding: 20px 24px;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: @black-025;
    }
  }
}
</style>
