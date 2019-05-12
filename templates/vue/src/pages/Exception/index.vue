<template>
  <div class="exception-container">
    <div class="exception-image-wrapper">
      <img
        class="exception-image"
        :src="`/static/images/exception/${$route.params.code}.svg`"
        :alt="$route.params.code"
      >
    </div>

    <div class="exception-content-wrapper">
      <h1
        class="exception-content-title"
        v-text="$route.params.code"
      />

      <p
        class="exception-content-desc"
        v-text="$_i18n(`${$route.params.code}`)"
      />

      <p class="exception-content-operation">
        <router-link to="/">
          <a-button
            type="primary"
            class="btn-back"
            v-text="$_i18n('back')"
          />
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExceptionContainer',
  data() {
    return {
      $i18nPath: 'exception',
    };
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.exception-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 50px 0;

  .exception-content-wrapper {
    min-width: 250px;
    margin-left: 50px;
    line-height: 1.2;

    .exception-content-title {
      margin-bottom: 20px;
      font-size: 62px;
      letter-spacing: 5px;
    }

    .exception-content-desc {
      margin-bottom: 20px;
      font-size: 26px;
    }
  }
}
</style>
