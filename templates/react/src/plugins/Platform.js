import EventEmitter from 'eventemitter3';

export default class Platform {
  static _eventEmitter = new EventEmitter()

  static Event = {
    SIDE_MENU_COLLAPSED: 'SIDE_MENU_COLLAPSED',
  }

  static _mediaQueryListHandles = [];

  static isServer = () => {
    return typeof window === 'undefined';
  }

  static setPageTitle = (title) => {
    if (Platform.isServer()) {
      return;
    }

    document.title = title;
  }

  static getUrl = () => {
    return Platform.isServer() ? '' : window.location.href.replace(window.location.hash, '');
  }

  static getHref = () => {
    return Platform.isServer() ? '' : window.location.href;
  }

  static getUrlOrigin = () => {
    return Platform.isServer() ? '' : window.location.origin;
  }

  static isDebugJSSDK = () => {
    return Platform.isServer() ? false : /DEBUG_JS_SDK/.test(window.location.hash);
  }

  static isWechat = () => {
    return Platform.isServer() ? false : /MicroMessenger/.test(window.navigator.userAgent);
  }

  static getSignatureUrl= () => {
    return Platform.isServer() ? '' : `${Platform.getUrlOrigin()}/v1/api/wechat/getJsConfig`;
  }

  static isBuildRelease = () => {
    return process.env.NODE_ENV === 'production';
  }

  static isEnvProduction = () => {
    return process.env.ENV === 'production';
  }

  static clientWidth = () => {
    return Platform.isServer() ? 0 : window.document.body.clientWidth;
  }

  static isMobile = () => {
    return Platform.isServer() ? false : /Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent);
  }

  static isWebkit = () => {
    return Platform.isServer() ? false : /webkit/i.test(window.navigator.userAgent);
  }

  static isSafari = () => {
    const ua = window.navigator.userAgent;
    return Platform.isServer() ? false : /Safari/.test(ua) && !/Chrome/.test(ua);
  }

  static emit = (eventType, collapsed) => {
    Platform._eventEmitter.emit(eventType, collapsed);
  }

  static addEventEmitterListener = (eventType, listener) => {
    Platform._eventEmitter.addListener(eventType, listener);
  }

  static removeEventEmitterListener = (eventType, listener) => {
    Platform._eventEmitter.removeListener(eventType, listener);
  }

  static addWindowMatchMediaListeners = (mediaQueryStrings, listener) => {
    if (Platform.isServer()) {
      return;
    }

    const mediaQueryLists = [];
    mediaQueryStrings.forEach((mediaQueryString) => {
      const mediaQueryList = window.matchMedia(mediaQueryString);
      mediaQueryList.addListener(listener);
      mediaQueryLists.push(mediaQueryList);
    });

    Platform._mediaQueryListHandles.push({
      listener,
      mediaQueryLists,
    });
  }

  static removeWindowMatchMediaListeners = (listener) => {
    if (Platform.isServer()) {
      return;
    }

    const handles = Platform._mediaQueryListHandles.filter((mediaQueryListHandle) => {
      return mediaQueryListHandle.listener === listener;
    });

    Platform._mediaQueryListHandles = Platform._mediaQueryListHandles.filter((mediaQueryListHandle) => {
      return mediaQueryListHandle.listener !== listener;
    });

    handles.forEach((handle) => {
      handle.mediaQueryLists.forEach((mediaQueryList) => {
        mediaQueryList.removeListener(listener);
      });
    });
  }

  // 判断 parent 包含 child
  static isChildOf = (child, parent) => {
    if (child.parentNode === parent) {
      return true;
    }

    if (child.parentNode === null) {
      return false;
    }

    return Element.isChildOf(child.parentNode, parent);
  }
}
