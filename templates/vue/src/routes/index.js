/* eslint-disable max-len */
const BasicLayout = () => import(/* webpackChunkName: "BasicLayout" */ '~/layouts/BasicLayout');
const UserLayout = () => import(/* webpackChunkName: "UserLayout" */ '~/layouts/UserLayout');

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html#differentiating-development-and-production-environments

// lazy load container
const Exception = () => import(/* webpackChunkName: "Exception" */ '~/pages/Exception');
// User module
const Login = () => import(/* webpackChunkName: "Login" */ '~/pages/User/Login');
const Register = () => import(/* webpackChunkName: "Register" */ '~/pages/User/Register');
// Dashboard module
const Home = () => import(/* webpackChunkName: "Home" */ '~/pages/Dashboard/Home');
// Account module
const Password = () => import(/* webpackChunkName: "Password" */ '~/pages/Account/Password');

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noAuth: false                if set true, will not validate authorization
  }
**/
export default [
  {
    path: '/exception/:code', component: Exception, hidden: true, meta: { noAuth: true }
  },
  {
    path: '/user',
    component: UserLayout,
    name: 'User',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { noAuth: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
        meta: { noAuth: true }
      }
    ]
  },
  { path: '/', redirect: '/dashboard/index', hidden: true },
  { path: '/dashboard/home', redirect: '/dashboard/index', hidden: true },
  {
    path: '/dashboard',
    component: BasicLayout,
    redirect: '/dashboard/index',
    name: 'Dashboard',
    meta: { icon: 'home' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: Home
      },
    ]
  },
  {
    path: '/account',
    component: BasicLayout,
    redirect: '/account/password',
    name: 'Account',
    meta: { icon: 'user' },
    children: [
      {
        path: 'password',
        name: 'Password',
        meta: {
          title: '修改密码'
        },
        component: Password,
      }
    ]
  },

  { path: '*', redirect: '/exception/404', hidden: true }
];
