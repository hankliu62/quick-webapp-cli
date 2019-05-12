<template>
  <a-layout
    class="user-layout"
    :style="{ backgroundImage: `url(/static/images/login/background-${timeQuantum}.jpg)` }"
  >
    <div class="user-layout-mask" />
    <div class="user-layout-content">
      <div class="user-layout-container-wrapper">
        <div class="user-layout-container-image" />
        <div class="user-layout-container">
          <div class="user-layout-container-header">
            <img alt="" src="/static/favicon.ico">
            <span class="title" v-text="title" />
          </div>
          <a-layout-content class="user-layout-container-body">
            <router-view />
          </a-layout-content>
          <div class="user-layout-container-footer">
            <div v-text="$_i18n('yunxiProduce')" />
          </div>
        </div>
      </div>
    </div>
  </a-layout>
</template>

<script>
import { HOUR, PAGE_TITLE, MINUTE } from '~/constants';
import { Timer } from '~/plugins';

export default {
  name: 'UserLayout',
  components: {
  },
  data() {
    return {
      title: PAGE_TITLE,
      $i18nPath: 'layout',
      timeQuantum: this.getTimeQuantum(),
    };
  },
  created() {
    const reCalcTimeQuantum = () => {
      const timeQuantum = this.getTimeQuantum();

      if (this.timeQuantum !== timeQuantum) {
        this.timeQuantum = timeQuantum;
      }
    };

    this.clearTimer = Timer.setInterval(reCalcTimeQuantum, MINUTE);
  },
  destroyed() {
    if (this.clearTimer) {
      this.clearTimer();
    }
  },
  methods: {
    getTimeQuantum: () => {
      const today = new Date();
      const timestamp = today.valueOf() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();

      return timestamp > (HOUR * 18) || timestamp < (HOUR * 6) ? 'dark' : 'light';
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import 'styles/variables.less';

.user-layout {
  position: relative;
  min-height: 100%;
  background-position: center;
  background-size: cover;
  transition: all 2s ease;

  .user-layout-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: @black-25;
    z-index: 1;
  }

  .user-layout-content {
    position: relative;
    padding: 50px 0;
    z-index: 2;

    .user-layout-container-wrapper {
      display: flex;
      width: 90%;
      max-width: 756px;
      min-height: 480px;
      overflow: hidden;
      margin: 0 auto;
      background-color: @white;
      border-radius: 5px;
      box-shadow: 0 0 3px @white-25;

      .user-layout-container-image {
        background-image: url('/static/images/layouts/login-bg.jpg');
        background-position: center;
        background-size: cover;
        flex: 35;
      }

      .user-layout-container {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;
        padding: 24px;
        flex: 65;

        .user-layout-container-header {
          height: 44px;
          text-align: center;
          line-height: 44px;

          a {
            display: inline-block;
            text-decoration: none;
          }

          img {
            height: 44px;
            margin-right: 16px;
            vertical-align: top;
          }

          .title {
            position: relative;
            top: 2px;
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-size: 33px;
            font-weight: 600;
            color: @black-85;
          }
        }

        .user-layout-container-body {
          flex: 1;
        }

        .user-layout-container-footer {
          margin: 48px 0 0;
          padding: 0 16px;
          text-align: center;
          font-size: 14px;
          color: @black-45;
        }
      }
    }
  }

  &:empty {
    display: none;
  }
}

</style>
