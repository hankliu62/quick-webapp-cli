import './index.less';

import { Menus } from '~/routes';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import classNames from 'classnames';

const { Sider } = Layout;

class SiderMenu extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    collapsed: PropTypes.bool.isRequired,
    theme: PropTypes.string,
    width: PropTypes.number,
    logo: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    theme: 'dark',
    width: 256,
    logo: '/static/images/layouts/logo.jpg',
    title: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      openKeys: this.getOpenKeys(props),
    };
  }

  getOpenKeys = (props = this.props) => {
    const { match } = props;
    const { path } = match;
    const menuItems = path.split('/').filter(item => (item));
    const openKeys = [];
    for (const item of menuItems) {
      openKeys.push(openKeys.length ? `${openKeys[openKeys.length - 1]}/${item}` : `/${item}`);
    }
    return openKeys;
  }

  isMainMenu = (key) => {
    return key.split('/').filter(item => (item)).length === 1;
  };

  onChangeOpenMenuKeys = (openKeys) => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  render = () => {
    const { openKeys } = this.state;
    const { collapsed, theme, width, logo, title, location } = this.props;

    const menuOptions = {
      style: { width: !collapsed ? width : 80 },
      mode: 'inline',
      theme,
      className: 'c-layout-sider-menu',
      location,
      selectedKeys: this.getOpenKeys(),
      onOpenChange: this.onChangeOpenMenuKeys,
    };

    if (!collapsed) {
      menuOptions.openKeys = openKeys;
    }

    return (
      <Sider
        trigger={null}
        collapsible
        width={width}
        collapsed={collapsed}
        breakpoint="lg"
        className={classNames('c-layout-sider', `c-layout-sider-${theme}`, { 'c-layout-sider-collapsed': collapsed })}
        theme={theme}
      >
        <div className="c-layout-sider-logo" id="logo">
          <Link className="logo-link" to="/">
            <img className="logo-image" src={logo} alt="logo" />
            <h1 className="logo-title">{title}</h1>
          </Link>
        </div>
        <Menus {...menuOptions} />
      </Sider>
    );
  }
}

export default SiderMenu;
