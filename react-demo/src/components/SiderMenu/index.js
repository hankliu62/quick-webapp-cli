import './index.less';

import { Drawer } from 'antd';
import React from 'react';

import SiderMenu from './SiderMenu';

const SiderMenuWrapper = React.memo((props) => {
  const { isMobile, collapsed } = props;

  if (isMobile) {
    return (
      <Drawer
        visible={!collapsed}
        placement="left"
        closable={false}
        onClose={() => { this.props.onCollapse(true); }}
      >
        <SiderMenu
          {...props}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    );
  }

  return (<SiderMenu {...props} />);
});

export default SiderMenuWrapper;
