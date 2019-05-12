import './index.less';

import { Platform } from '~/plugins';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

class GlobalHeader extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onCollapse: PropTypes.func.isRequired,
  }

  onTriggerCollapseEvent = (collapsed) => {
    Platform.emit(Platform.Event.SIDE_MENU_COLLAPSED, collapsed);
  }

  onCollapse = () => {
    const { collapsed } = this.props;
    const nextCollapsed = !collapsed;
    this.props.onCollapse(nextCollapsed);
    this.onTriggerCollapseEvent(nextCollapsed);
  }

  render() {
    const { collapsed, children } = this.props;

    return (
      <div className="c-global-header">
        <span className="c-global-header-trigger" onClick={this.onCollapse}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </span>
        {children}
      </div>
    );
  }
}

export default GlobalHeader;
