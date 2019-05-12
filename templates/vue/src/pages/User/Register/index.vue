<template>
  <div class="user-register-container">
    <a-form class="form register-form" :form="registerForm" @submit="onRegister">
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                { required: true, message: $_i18n('requiredEmail') },
                { type: 'email', message: $_i18n('invalidEmail') }
              ]
            }
          ]"
          size="large"
          name="email"
          :placeholder="$_i18n('placeholderEmail')"
        >
          <a-icon slot="prefix" type="mail" class="input-prefix-icon" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-popover
          :get-popup-container="node => node.parentNode"
          placement="right"
          :overlay-style="{ width: '240px' }"
          :visible="visiblePasswordPopover"
        >
          <template slot="content">
            <div class="user-register-password-popover">
              <div
                v-if="passwordStatus === 'ok'"
                class="user-register-success"
                v-text="$_i18n('passwordStrengthStrong')"
              />
              <div
                v-if="passwordStatus === 'pass'"
                class="user-register-warning"
                v-text="$_i18n('passwordStrengthMedium')"
              />
              <div
                v-if="passwordStatus === 'poor'"
                class="user-register-error"
                v-text="$_i18n('passwordStrengthPoor')"
              />
              <div v-if="password && password.length" :class="`progress-${passwordStatus}`">
                <a-progress
                  :status="passwordProgressMap[passwordStatus]"
                  class="user-register-progress"
                  :stroke-width="6"
                  :percent="password.length * 10 > 100 ? 100 : password.length * 10"
                  :show-info="false"
                />
              </div>
              <div class="user-register-password-popover-desc" v-text="$_i18n('passwordStrengthDesc', 6)" />
            </div>
          </template>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: $_i18n('requiredPassword') },
                  { validator: validPassword }
                ]
              }
            ]"
            size="large"
            name="password"
            type="password"
            :placeholder="$_i18n('placeholderPassword', 6)"
            @change="onChangeText"
          >
            <a-icon slot="prefix" type="lock" class="input-prefix-icon" />
            <a-icon v-if="password" slot="suffix" type="eye" class="input-suffix-icon" />
          </a-input>
        </a-popover>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="[
            'confirmPassword',
            {
              rules: [
                { required: true, message: $_i18n('requiredConfirmPassword') },
                { validator: validConfirmPassword }
              ]
            }
          ]"
          size="large"
          name="confirmPassword"
          type="password"
          :placeholder="$_i18n('placeholderConfirmPassword')"
          @change="onChangeText"
        >
          <a-icon slot="prefix" type="lock" class="input-prefix-icon" />
          <a-icon v-if="confirmPassword" slot="suffix" type="eye" class="input-suffix-icon" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-group :compact="true">
          <a-select
            size="large"
            :value="mobilePrefix"
            :style="{width: '20%'}"
            @change="onChangeMobilePrefix"
          >
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
          <a-input
            v-decorator="[
              'mobile',
              {
                rules: [
                  { required: true, message: $_i18n('requiredMobile') },
                  { pattern: /^\d{11}$/, message: $_i18n('invalidMobile') }
                ]
              }
            ]"
            size="large"
            name="mobile"
            :placeholder="$_i18n('placeholderMobile')"
            :style="{ width: '80%' }"
          />
        </a-input-group>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="16">
            <a-input
              v-decorator="[
                'captcha',
                { rules: [{ required: true, message: $_i18n('requiredCaptcha') }]}
              ]"
              size="large"
              name="captcha"
              :placeholder="$_i18n('placeholderCaptcha')"
            />
          </a-col>
          <a-col :span="8">
            <a-button
              size="large"
              :disabled="!!countdown"
              class="btn-captcha"
              @click="onFetchCaptcha"
              v-text="countdown ? `${countdown} s` : $_i18n('btnCaptcha') "
            />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="16">
            <a-button size="large" type="primary" @click="onRegister" v-text="$_i18n('register')" />
          </a-col>
          <a-col :span="8">
            <router-link :to="{ name: 'Login' }" v-text="$_i18n('signin')" />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterContainer',
  components: {
  },
  data() {
    return {
      $i18nPath: 'userRegister',
      visiblePasswordPopover: false,
      mobilePrefix: '+86',
      countdown: 0,
      registerForm: this.$form.createForm(this),
      passwordProgressMap: {
        ok: 'success',
        pass: 'normal',
        poor: 'exception',
      },
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    passwordStatus() {
      const { password } = this;
      if (password && password.length > 9) {
        return 'ok';
      }
      if (password && password.length > 5) {
        return 'pass';
      }
      return 'poor';
    }
  },
  created() {
  },
  methods: {
    validPassword(rule, value, callback) {
      const { visiblePasswordPopover } = this;

      if (!visiblePasswordPopover) {
        this.visiblePasswordPopover = !!value;
      }

      if (value.length < 6) {
        callback(this.$_i18n('placeholderPassword', 6));
        return;
      }

      callback();
    },
    validConfirmPassword(rule, value, callback) {
      const { registerForm } = this;
      if (value && value !== registerForm.getFieldValue('confirmPassword')) {
        callback(this.$_i18n('inequalityTwicePassword'));
        return;
      }

      callback();
    },
    onRegister() {

    },
    onChangeText(e) {
      this[e.target.name] = e.target.value;
    },
    onChangeMobilePrefix(value) {
      this.mobilePrefix = value;
    },
    onFetchCaptcha() {

    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import 'styles/variables.less';

.user-register-container {
  width: 100%;
  height: 100%;

  .form {
    width: 30vw;
    min-width: 250px;
    margin: 0 auto;
    margin-top: 50px;

    .ant-form-item {
      margin-bottom: 25px;

      &.slimming-form-item {
        .ant-form-item-control {
          line-height: 1.2;
        }
      }
    }

    a {
      float: right;
      font-size: 14px;
    }

    button {
      width: 100%;
    }

    .alert {
      margin-bottom: 20px;
    }

    .input-suffix-icon,
    .input-prefix-icon {
      color: @black-25;
    }
  }
}
</style>
