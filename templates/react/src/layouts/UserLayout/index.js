import './index.less';

import { HOUR, PAGE_TITLE, MINUTE } from '~/constants';
import { Timer } from '~/plugins';
import React, { Component } from 'react';

class UserLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeQuantum: this.getTimeQuantum(),
    };
  }

  componentDidMount = () => {
    const reCalcTimeQuantum = () => {
      const timeQuantum = this.getTimeQuantum();
      const { timeQuantum: stateTimeQuantum } = this.state;
      if (stateTimeQuantum !== timeQuantum) {
        this.setState({ timeQuantum });
      }
    };

    this.clearTimer = Timer.setInterval(reCalcTimeQuantum, MINUTE);
  }

  componentWillUnmount = () => {
    if (this.clearTimer) {
      this.clearTimer();
    }
  }

  $i18nPath = 'layout'

  getTimeQuantum = () => {
    const today = new Date();
    const timestamp = today.valueOf() - new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();
    return timestamp > (HOUR * 18) || timestamp < (HOUR * 6) ? 'dark' : 'light';
  }

  render = () => {
    const { timeQuantum } = this.state;

    return (
      <div
        className="user-layout"
        style={{ backgroundImage: `url(/static/images/login/background-${timeQuantum}.jpg)` }}
      >
        <div className="user-layout-mask" />
        <div className="user-layout-content">
          <div className="user-layout-container-wrapper">
            <div className="user-layout-container-image" />
            <div className="user-layout-container">
              <div className="user-layout-container-header">
                <a href="/">
                  <img alt="" src="/static/favicon.ico" />
                  <span className="title">{PAGE_TITLE}</span>
                </a>
              </div>
              <div className="user-layout-container-body">
                {this.props.children}
              </div>
              <div className="user-layout-container-footer">
                <div dangerouslySetInnerHTML={{ __html: this.$i18n('yunxiProduce') }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLayout;
