import './index.less';

import { connect } from '~/plugins';
import { Toast } from '~/components';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input, Popover, Progress, Select, Row, Col } from 'antd';

import reducer, * as actions from './state';

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@Form.create()
@connect(
  (state) => {
    return state.userRegister;
  },
  actions
)
class UserRegister extends Component {
  static propTypes = {
    form: PropTypes.object,
    setState: PropTypes.func.isRequired,
  }

  state = {
    visiblePasswordPopover: false,
    mobilePrefix: '+86',
    countdown: 0,
  }

  componentDidMount = () => {
    this.emailInput.focus();
  }

  $i18nPath = 'userRegister'

  register = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await this.props.register(values);
      }
    });
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  validPassword = (rule, value, callback) => {
    const { visible } = this.state;
    if (!visible) {
      this.setState({
        visible: !!value,
      });
    }
    if (value.length < 6) {
      callback('error');
    } else {
      callback();
    }
  };

  validConfirmPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.$i18n('inequalityTwicePassword'));
    } else {
      callback();
    }
  };

  onChangeText = (e) => {
    this.props.setState({ [e.target.name]: e.target.value });
  }

  onPressEnterUsername = () => {
    this.passwordInput.focus();
  }

  onPressEnterPassword = () => {
    this.confirmPasswordInput.focus();
  }

  onPressEnterConfirmPassword = () => {
    this.mobileInput.focus();
  }

  onPressEnterMobile = () => {
    this.captchaInput.focus();
  }

  onPressEnterCaptcha = () => {
    this.register();
  }

  onChangeMobilePrefix = (value) => {
    this.setState({ mobilePrefix: value });
  };

  onFetchCaptcha = () => {

  }

  renderPasswordStatus = () => {
    const status = this.getPasswordStatus();
    const passwordStatusMap = {
      ok: (
        <div className="user-register-success">
          {this.$i18n('passwordStrengthStrong')}
        </div>
      ),
      pass: (
        <div className="user-register-warning">
          {this.$i18n('passwordStrengthMedium')}
        </div>
      ),
      poor: (
        <div className="user-register-error">
          {this.$i18n('passwordStrengthPoor')}
        </div>
      ),
    };

    return passwordStatusMap[status];
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={`progress-${passwordStatus}`}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className="user-register-progress"
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render = () => {
    const { getFieldDecorator } = this.props.form;
    const { visiblePasswordPopover, mobilePrefix, countdown, password, confirmPassword } = this.state;

    const emailDecorator = getFieldDecorator('email', { rules: [
      {
        required: true,
        message: this.$i18n('requiredEmail'),
      },
      {
        type: 'email',
        message: this.$i18n('invalidEmail'),
      },
    ] });
    const passwordDecorator = getFieldDecorator('password', { rules: [
      {
        required: true,
        message: this.$i18n('requiredPassword'),
      },
      {
        validator: this.validPassword,
      },
    ] });
    const confirmPasswordDecorator = getFieldDecorator('confirmPassword', { rules: [
      {
        required: true,
        message: this.$i18n('requiredConfirmPassword'),
      },
      {
        validator: this.validConfirmPassword,
      },
    ] });
    const mobileDecorator = getFieldDecorator('mobile', {
      rules: [
        {
          required: true,
          message: this.$i18n('requiredMobile'),
        },
        {
          pattern: /^\d{11}$/,
          message: this.$i18n('invalidMobile'),
        },
      ],
    });
    const captchaDecorator = getFieldDecorator('captcha', {
      rules: [
        {
          required: true,
          message: this.$i18n('requiredCaptcha'),
        },
      ],
    });

    return (
      <div className="account-register-container">
        <div className="form register-form">
          <Form.Item>
            {
              emailDecorator(<Input
                ref={(input) => { this.emailInput = input; }}
                prefix={<Icon type="mail" className="input-prefix-icon" />}
                size="large"
                name="email"
                placeholder={this.$i18n('placeholderEmail')}
                onChange={this.onChangeText}
                onPressEnter={this.onPressEnterEmail}
              />)
            }
          </Form.Item>
          <Form.Item>
            <Popover
              getPopupContainer={node => node.parentNode}
              content={
                (
                  <div className="user-register-password-popover">
                    {this.renderPasswordStatus()}
                    {this.renderPasswordProgress()}
                    <div className="user-register-password-popover-desc">
                      {this.$i18n('passwordStrengthDesc', 6)}
                    </div>
                  </div>
                )
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visiblePasswordPopover}
            >
              {
                passwordDecorator(<Input
                  ref={(input) => { this.passwordInput = input; }}
                  prefix={<Icon type="lock" className="input-prefix-icon" />}
                  size="large"
                  type="password"
                  name="password"
                  placeholder={this.$i18n('placeholderPassword', 6)}
                  onChange={this.onChangeText}
                  onPressEnter={this.onPressEnterPassword}
                  suffix={password ? <Icon type="eye" className="input-suffix-icon" /> : null}
                />)
              }
            </Popover>
          </Form.Item>
          <Form.Item>
            {
              confirmPasswordDecorator(<Input
                ref={(input) => { this.confirmPasswordInput = input; }}
                prefix={<Icon type="lock" className="input-prefix-icon" />}
                size="large"
                type="password"
                name="confirmPassword"
                placeholder={this.$i18n('placeholderConfirmPassword')}
                onChange={this.onChangeText}
                onPressEnter={this.onPressEnterConfirmPassword}
                suffix={confirmPassword ? <Icon type="eye" className="input-suffix-icon" /> : null}
              />)
            }
          </Form.Item>
          <Form.Item>
            <Input.Group compact>
              <Select
                size="large"
                value={mobilePrefix}
                onChange={this.onChangeMobilePrefix}
                style={{ width: '20%' }}
              >
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
              </Select>
              {
                mobileDecorator(
                  <Input
                    ref={(input) => { this.mobileInput = input; }}
                    size="large"
                    name="mobile"
                    placeholder={this.$i18n('placeholderMobile')}
                    onChange={this.onChangeText}
                    onPressEnter={this.onPressEnterMobile}
                    style={{ width: '80%' }}
                  />
                )
              }
            </Input.Group>
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                {
                  captchaDecorator(
                    <Input
                      ref={(input) => { this.captchaInput = input; }}
                      prefix={<Icon type="key" className="input-prefix-icon" />}
                      size="large"
                      name="captcha"
                      placeholder={this.$i18n('placeholderCaptcha')}
                      onChange={this.onChangeText}
                      onPressEnter={this.onPressEnterCaptcha}
                    />
                  )
                }
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={countdown}
                  className="btn-captcha"
                  onClick={this.onFetchCaptcha}
                >
                  {countdown ? `${countdown} s` : this.$i18n('btnCaptcha') }
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Button size="large" type="primary" onClick={this.register}>
                  {this.$i18n('register')}
                </Button>
              </Col>
              <Col span={8}>
                <Link to="/user/login">
                  {this.$i18n('signin')}
                </Link>
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

export default UserRegister;
