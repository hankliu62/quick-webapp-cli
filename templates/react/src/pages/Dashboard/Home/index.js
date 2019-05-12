import './index.less';

import React, { Component } from 'react';
import reducer, * as actions from './state';

import PropTypes from 'prop-types';
import { connect } from '~/plugins';

@connect(
  (state) => {
    return state.dashboardHome;
  },
  actions
)
class DashboardHome extends Component {
  static propTypes = {
    setState: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.setState({ name: 'Home2 Container' });
    }, 2000);
  }

  render = () => {
    console.log(this.props.name, '-------------------------');
    return (
      <div className="account-login-container">
        {this.props.name || 'Home Container'}
      </div>
    );
  }
}

export {
  reducer,
};

export default DashboardHome;
