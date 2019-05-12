import './index.less';

import React, { Component } from 'react';
import reducer, * as actions from './state';

import PropTypes from 'prop-types';
import { connect } from '~/plugins';

@connect(
  (state) => {
    return state.accountPassword;
  },
  actions
)
class AccountPassword extends Component {
  static propTypes = {
    setState: PropTypes.func.isRequired,
  }

  render = () => {
    return (
      <div className="account-password-container">
        Password Container
      </div>
    );
  }
}

export {
  reducer,
};

export default AccountPassword;
