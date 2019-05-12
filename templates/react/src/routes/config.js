export default [
  // user
  {
    path: '/user',
    component: '~/layouts/UserLayout',
    hideInMenu: true,
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: '~/pages/User/Login' },
      { path: '/user/register', component: '~/pages/User/Register' },
    ],
  },
  // app
  {
    path: '/',
    component: '~/layouts/BasicLayout',
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/index' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/index',
            name: 'home',
            component: '~/pages/Dashboard/Home',
          },
        ],
      },
      // account
      {
        path: '/account',
        icon: 'user',
        name: 'account',
        routes: [
          {
            path: '/account/password',
            name: 'password',
            component: '~/pages/Account/Password',
          },
        ],
      },
    ],
  },
  // exception
  {
    icon: 'Exception',
    path: '/exception/:code',
    name: 'exception',
    component: '~/pages/Exception',
    hideInMenu: true,
  },
  // not matched
  {
    redirect: '/exception/404',
  },
];
