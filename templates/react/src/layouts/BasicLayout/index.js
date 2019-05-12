import './index.less';

import { SiderMenu } from '~/components';
import { connect } from '~/plugins';
import { PAGE_TITLE } from '~/constants';

import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import LayoutHeader from '../Header';
import reducer, * as actions from './state';

const { Content } = Layout;

@connect(
  (state) => {
    return state.basicLayout;
  },
  actions
)
class BasicLayout extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    collapsed: PropTypes.bool.isRequired,
    setState: PropTypes.func.isRequired,
  }

  onToggleSider = (collapsed) => {
    this.props.setState({ collapsed });
  }

  render = () => {
    const { collapsed, location, children, match } = this.props;

    return (
      <React.Fragment>
        <Layout className="basic-layout">
          <SiderMenu collapsed={collapsed} location={location} match={match} title={PAGE_TITLE} />
          <Layout>
            <LayoutHeader collapsed={collapsed} onCollapse={this.onToggleSider} />
            <Content className="basic-layout-content">
              {children}
            </Content>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }
}

export {
  reducer,
};

export default BasicLayout;
