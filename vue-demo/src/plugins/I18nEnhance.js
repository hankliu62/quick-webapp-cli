import Vue from 'vue';

const init = function _init() {
  // 扩展vue-i18n $t
  const { $t } = Vue.prototype;

  function _$i18n(key, ...args) {
    const format = function _format(keys) {
      let result = (keys || '').toString();

      for (let i = 0; i < args.length; i++) {
        const reg = new RegExp(`({)${i}(})`, 'g');

        result = result.replace(reg, args[i]);
      }

      return result;
    };

    const extendKey = this.$data && this.$data.$i18nPath ? `app.${this.$data.$i18nPath}.${key}` : `app.${key}`;

    return format($t.call(this, extendKey));
  }

  Vue.prototype.$_i18n = _$i18n; // eslint-disable-line
};

export default {
  init
};
