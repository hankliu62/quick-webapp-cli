import * as pagan from 'redux-pagan';
import * as redux from 'react-redux';

import { Component, PureComponent } from 'react';

let store = null;
let translations = null;
const cachedI18n = {};

const format = (keys, ...args) => {
  let result = (keys || '').toString();
  for (let i = 0; i < args.length; i++) {
    const reg = new RegExp(`({)${i}(})`, 'g');
    result = result.replace(reg, args[i]);
  }

  return result;
};

export const init = (_store, _translations) => {
  store = _store;
  translations = _translations;

  // eslint-disable-next-line
  loadLang('zh-CN');
};

export const loadLang = (lang) => {
  store.dispatch(pagan.loadLang(lang, () => {
    return translations[lang];
  }));
};

export const getLang = () => {
  const i18nState = store.getState().i18n;
  if (cachedI18n[i18nState.locale]) {
    return cachedI18n[i18nState.locale];
  }

  // 第一个 key 一定是 app，写在这里后其它地方可以省略，同时起到缓存作用
  const originalI18n = pagan.getLang(i18nState, 'app');
  cachedI18n[i18nState.locale] = originalI18n;
  return cachedI18n[i18nState.locale];
};

export function i18n(key, ...formats) {
  const originalI18n = getLang();
  const args = key.split('.');
  if (this && this.$i18nPath) {
    args.unshift(this.$i18nPath);
  }

  if (formats) {
    return format(originalI18n(...args).s, ...formats);
  }

  return originalI18n(...args).s;
}

function rootI18n(key, ...formats) {
  const originalI18n = getLang();
  const args = key.split('.');

  if (formats) {
    return format(originalI18n(...args).s, ...formats);
  }

  return originalI18n(...args).s;
}

Component.prototype.$i18n = i18n;
Component.prototype.$rootI18n = rootI18n;

PureComponent.prototype.$i18n = i18n;
PureComponent.prototype.$rootI18n = rootI18n;

function baseGet(object, path) {
  if (!object || !path) {
    return null;
  }
  const fields = path.split('.');
  let subObject = object;
  while (subObject && fields.length) {
    subObject = subObject[fields.shift()];
  }

  if (fields.length) {
    return null;
  }

  return subObject;
}

function i18nFromProps(key, ...formats) {
  const originalI18n = this.props.translations;
  const args = key.split('.');
  if (this.$i18nPath) {
    args.unshift(this.$i18nPath);
  }

  args.unshift('app');
  const originalI18nValue = baseGet(originalI18n, args.join('.'));

  if (formats) {
    return format(originalI18nValue, ...formats);
  }

  return originalI18nValue;
}

Component.prototype.$i18nFromProps = i18nFromProps;
PureComponent.prototype.$i18nFromProps = i18nFromProps;

Component.prototype.$dispatch = (...keys) => {
  return store.dispatch(...keys);
};

export const connect = (...args) => {
  const getProps = args.shift(0, 1);

  args.unshift((...params) => {
    const props = (getProps ? getProps(...params) : {}) || {};
    props.dispatch = store.dispatch;
    return props;
  });

  return redux.connect(...args);
};

export default connect;
