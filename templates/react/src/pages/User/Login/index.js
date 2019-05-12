import './index.less';

import { connect } from '~/plugins';
import { Sessions } from '~/engine';
import { Toast } from '~/components';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button, Checkbox, Form, Icon, Input, Row, Col } from 'antd';

import reducer, * as actions from './state';

const OtherLoginWays = [
  {
    type: 'wechat',
  },
  {
    type: 'qq',
  },
  {
    type: 'weibo',
  },
  {
    type: 'alipay',
  },
];

@Form.create()
@connect(
  (state) => {
    return state.userLogin;
  },
  actions
)
class UserLogin extends Component {
  static propTypes = {
    form: PropTypes.object,
    setState: PropTypes.func.isRequired,
  }

  state = {
    showFailAlert: false,
  }

  componentDidMount = () => {
    if (Sessions.getToken()) {
      this.props.replace('/');
    }
    this.usernameInput.focus();
  }

  $i18nPath = 'userLogin'

  login = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await this.props.login(values);
        } catch (error) {
          if (error.response.status === 403) {
            this.setState({ showFailAlert: true });
          }
        }
      }
    });
  }

  onChangeUsername = (e) => {
    this.setState({ showFailAlert: false });
    this.props.setState({ username: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ showFailAlert: false });
    this.props.setState({ password: e.target.value });
  }

  onChangeAutoLogin = (e) => {
    this.props.setState({ remember: e.target.checked });
  }

  onPressEnterUsername = () => {
    this.passwordInput.focus();
  }

  onPressEnterPassword = () => {
    this.login();
  }

  onClickForgetPassword = () => {
    Toast.show(
      this.$i18n('forgetPasswordToast'),
      Toast.Type.WARNING,
      10
    );
  }

  renderLoginFailAlert = () => {
    if (!this.state.showFailAlert) {
      return null;
    }

    return <Alert message={this.$i18n('loginFail')} type="error" showIcon />;
  }

  render = () => {
    const { getFieldDecorator } = this.props.form;
    const usernameDecorator = getFieldDecorator('username', { rules: [{
      required: true,
      message: this.$i18n('pleaseEnterUsername'),
    }] });
    const passwordDecorator = getFieldDecorator('password', { rules: [{
      required: true,
      message: this.$i18n('pleaseEnterPassword'),
    }] });

    return (
      <div className="account-login-container">
        <div className="form">
          <div className="alert">{this.renderLoginFailAlert()}</div>
          <Form.Item>
            {
              usernameDecorator(<Input
                ref={(input) => { this.usernameInput = input; }}
                prefix={<Icon type="user" className="input-prefix-icon" />}
                size="large"
                placeholder={this.$i18n('pleaseEnterUsername')}
                onChange={this.onChangeUsername}
                onPressEnter={this.onPressEnterUsername}
              />)
            }
          </Form.Item>
          <Form.Item>
            {
              passwordDecorator(<Input
                ref={(input) => { this.passwordInput = input; }}
                prefix={<Icon type="lock" className="input-prefix-icon" />}
                size="large"
                type="password"
                placeholder={this.$i18n('pleaseEnterPassword')}
                onChange={this.onChangePassword}
                onPressEnter={this.onPressEnterPassword}
              />)
            }
          </Form.Item>
          <Form.Item className="slimming-form-item">
            <Row gutter={8}>
              <Col span={12}>
                <Checkbox
                  onChange={this.onChangeAutoLogin}
                >
                  {this.$i18n('autoLogin')}
                </Checkbox>
              </Col>
              <Col span={12}>
                <a onClick={this.onClickForgetPassword}>
                  {this.$i18n('forgetPassword')}
                </a>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" onClick={this.login}>
              {this.$i18n('login')}
            </Button>
          </Form.Item>
          <Form.Item className="slimming-form-item other-ways-form-item">
            <Row gutter={8}>
              <Col span={16}>
                {
                  OtherLoginWays.map((way) => {
                    return (
                      <Icon className="link-other-login-way" type={way.type} key={way.type} />
                    );
                  })
                }
              </Col>
              <Col span={8}>
                <Link to="/user/register">{this.$i18n('register')}</Link>
              </Col>
            </Row>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export {
  reducer,
};

export default UserLogin;
