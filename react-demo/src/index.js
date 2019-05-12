import '~/app.less';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

render(
  React.createElement(require('./pages').default),
  document.getElementById('root'),
);
