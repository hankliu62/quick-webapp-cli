import exception from './zh-CN/exception';
import userLogin from './zh-CN/userLogin';
import layout from './zh-CN/layout';
import userRegister from './zh-CN/userRegister';

export default {
  app: {
    request: {
      networkUnavailable: '请检查网络连接',
      networkTimeout: '网络请求超时',
      404: '抱歉，你访问的页面不存在',
      500: '抱歉，服务器出错了',
      503: '抱歉，服务器出错了',
    },
    router: {
      title: {
        home: '首页',
        '/dashboard': 'Dashboard',
        '/dashboard/index': '首页',
        '/account': '个人账号',
        '/account/password': '修改密码',
      },
    },
    layout,
    exception,
    userLogin,
    userRegister,
  },
};
