import * as ReduxEnhance from '~/plugins/ReduxEnhance';

import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import React, { Component } from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import Engine from '~/engine';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import Routes from '~/routes';
import { Storage } from '~/plugins';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import { i18n } from 'redux-pagan';
import locales from '~/locales';
import thunk from 'redux-thunk';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import { reducer as userLogin } from './User/Login';
import { reducer as dashboardHome } from './Dashboard/Home';
import { reducer as basicLayout } from '../layouts/BasicLayout';

const history = createBrowserHistory();

const reducer = combineReducers({
  router: connectRouter(history),
  i18n,
  userLogin,
  dashboardHome,
  basicLayout,
});

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(createLogger({
      predicate: () => {
        // eslint-disable-next-line
        return process.env.ENV !== 'production' || localStorage.debug;
      },
    }))
  )
);

ReduxEnhance.init(store, locales);

export default class Pages extends Component {
  state = { isReady: false }

  componentDidMount = async () => {
    try {
      await Engine.init({
        storage: new Storage({ scope: 'demo' }),
        apiEndpoint: `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_DOMAIN}`,
        onInitSuccess: this.onInitSuccess,
        onLogout: this.onLogout,
        i18n: ReduxEnhance.i18n,
      });
      this.setState({ isReady: true });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }

  onInitSuccess = () => {

  }

  onLogout = () => {

  }

  render = () => {
    const { isReady } = this.state;
    if (!isReady) {
      return null;
    }
    return (
      <LocaleProvider locale={zhCN}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div className="outermost-container">
              <React.Suspense fallback={null}>
                <Routes />
              </React.Suspense>
            </div>
          </ConnectedRouter>
        </Provider>
      </LocaleProvider>
    );
  }
}

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
  });
}
