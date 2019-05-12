import { Icon, Menu } from 'antd';
import { Redirect, Route, Switch, Link } from 'react-router-dom';

import React from 'react';
import RoutesConfig from './config';
import Engine from '~/engine';

const { SubMenu, Item: MenuItem } = Menu;

const routeComponentInstances = {};

const RouteComponentWrapper = (route, RouteComponent) => props => (
  <React.Fragment><RouteComponent authority={route.authority} {...props} /></React.Fragment>
);

const getRouteComponentInstance = (route) => {
  const componentPath = route.component;
  if (!routeComponentInstances[componentPath]) {
    let RouteComponent;
    if (componentPath) {
      if (componentPath.indexOf('~/pages/') === 0) {
        RouteComponent = React.lazy(() => (import(`~/pages/${componentPath.replace('~/pages/', '')}`)));
      } else if (componentPath.indexOf('~/layouts/') === 0) {
        RouteComponent = React.lazy(() => (import(`~/layouts/${componentPath.replace('~/layouts/', '')}`)));
      } else if (componentPath.indexOf('~/components/') === 0) {
        RouteComponent = React.lazy(() => (import(`~/components/${componentPath.replace('~/components/', '')}`)));
      } else {
        throw new Error('The route component should prefix with \'~/pages/\', \'~/layouts/\' or \'~/components/\'');
      }
    }

    routeComponentInstances[componentPath] = RouteComponentWrapper(route, RouteComponent);
  }

  return routeComponentInstances[componentPath];
};

const formatterRoute = (route, outerComponents = []) => {
  let RouteComponent;
  if (route.component) {
    RouteComponent = getRouteComponentInstance(route);
  }

  if (!route.routes || !route.routes.length) {
    if (RouteComponent) {
      return (
        <Route
          key={route.path}
          path={route.path}
          render={(props) => {
            if (outerComponents && outerComponents.length) {
              const GroupComponent = outerComponents.reduce((WrappingComponent, CurrentComponent) => {
                return (innerProps) => {
                  const { children } = innerProps;
                  return (
                    <WrappingComponent {...props}>
                      <CurrentComponent>
                        {children}
                      </CurrentComponent>
                    </WrappingComponent>
                  );
                };
              });

              return (
                <GroupComponent {...props}>
                  <RouteComponent {...props} />
                </GroupComponent>
              );
            }

            return (
              <RouteComponent {...props} />
            );
          }}
        />
      );
    }

    if (route.redirect) {
      const options = {
        key: route.path || route.redirect,
      };

      if (route.path) {
        options.path = route.path;
        options.exact = true;
      }

      return (
        <Route {...options} render={() => (<Redirect to={route.redirect} />)} />
      );
    }

    return null;
  }

  const currentOuterComponents = [...(outerComponents || [])];
  if (RouteComponent) {
    currentOuterComponents.push(RouteComponent);
  }

  return route.routes.map(innerRoute => (formatterRoute(innerRoute, currentOuterComponents))).filter(item => (item));
};

const Routes = () => (
  <Switch>
    {RoutesConfig.map(route => (formatterRoute(route, null))).filter(item => (item))}
  </Switch>
);

/* eslint no-useless-escape:0 */
// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

const getMenuIcon = (icon) => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return (<img src={icon} alt="icon" className="menu-icon" />);
  }

  if (typeof icon === 'string') {
    return (<Icon type={icon} />);
  }

  return icon;
};

const getMenuTitle = (route) => {
  const MenuIcon = getMenuIcon(route.icon);
  return (
    <span>
      {!!MenuIcon && MenuIcon}
      <span>{Engine.i18n(`router.title.${route.path}`)}</span>
    </span>
  );
};

const formatterSubMenu = (route, { location, authrole }) => {
  if (route.hideInMenu || (authrole && route.authority
      && route.authority.length && !route.authority.includes(authrole))) {
    return null;
  }

  if (route.routes && !route.hideChildrenInMenu) {
    const subMenus = route.routes
      .map(innerRoute => (formatterSubMenu(innerRoute, { location, authrole })))
      .filter(item => (!!item));

    if (!subMenus.length) {
      return null;
    }

    if (route.name) {
      return (
        <SubMenu key={route.path} title={getMenuTitle(route)}>
          {subMenus}
        </SubMenu>
      );
    }

    return subMenus;
  }

  if (route.name) {
    return (
      <MenuItem key={route.path}>
        <Link to={route.path} replace={route.path === location.pathname}>
          {getMenuTitle(route)}
        </Link>
      </MenuItem>
    );
  }

  return null;
};

const Menus = (props) => {
  return (
    <Menu {...props}>
      {RoutesConfig.map(route => (formatterSubMenu(route, props))).filter(item => (!!item))}
    </Menu>
  );
};

export default Routes;

export {
  Menus,
};
