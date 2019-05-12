import './index.less';

import React, { PureComponent } from 'react';

import { GlobalHeader } from '~/components';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Header } = Layout;

class LayoutHeader extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onCollapse: PropTypes.func.isRequired,
  }

  render = () => {
    const { collapsed } = this.props;

    return (
      <Header className="c-layout-header">
        <GlobalHeader collapsed={collapsed} onCollapse={this.props.onCollapse} />
      </Header>
    );
  }
}

export default LayoutHeader;
