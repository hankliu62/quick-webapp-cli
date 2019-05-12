<template>
  <div class="user-login-container">
    <div v-if="showFailAlert" class="alert">
      <a-alert :message="$_i18n('loginFail')" type="error" show-icon />
    </div>
    <a-form class="login-form" :form="loginForm" @submit="onLogin">
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {rules: [{ required: true, message: $_i18n('pleaseEnterUsername') }]}
          ]"
          size="large"
          name="user"
          :placeholder="$_i18n('pleaseEnterUsername')"
        >
          <a-icon slot="prefix" type="user" class="input-prefix-icon" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            {rules: [{ required: true, message: $_i18n('pleaseEnterPassword') }]}
          ]"
          size="large"
          name="user"
          type="password"
          :placeholder="$_i18n('pleaseEnterPassword')"
        >
          <a-icon slot="prefix" type="lock" class="input-prefix-icon" />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="12">
            <a-checkbox :checked="remember" @change="onChangeAutoLogin">{{ $_i18n('autoLogin') }}</a-checkbox>
          </a-col>
          <a-col :span="12">
            <a @click="onClickForgetPassword" v-text="$_i18n('forgetPassword')" />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-button size="large" type="primary" @click="onLogin" v-text="$_i18n('login')" />
      </a-form-item>

      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="16">
            <a-icon v-for="way in otherLoginWays" :key="way.type" :type="way.type" class="link-other-login-way" />
          </a-col>
          <a-col :span="8">
            <router-link :to="{ name: 'Register' }" v-text="$_i18n('register')" />
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Toast } from '~/components';

export default {
  name: 'LoginContainer',
  components: {
  },
  data() {
    return {
      $i18nPath: 'userLogin',
      showFailAlert: false,
      remember: false,
      loginForm: this.$form.createForm(this),
      otherLoginWays: [
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
      ]
    };
  },
  created() {
  },
  methods: {
    login() {
    },
    onLogin() {
      this.loginForm.validateFields(async (err, values) => {
        if (!err) {
          try {
            await this.login(values);
          } catch (error) {
            if (error && error.response && error.response.status === 403) {
              this.setState({ showFailAlert: true });
            }
          }
        }
      });
    },
    onChangeAutoLogin(e) {
      this.remember = e.target.checked;
    },
    onClickForgetPassword() {
      Toast.show(
        this.$_i18n('forgetPasswordToast'),
        Toast.Type.WARNING,
        10
      );
    }
  },
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import 'styles/variables.less';

.user-login-container {
  width: 100%;
  height: 100%;

  .login-form {
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

      &.other-ways-form-item {
        .ant-form-item-control {
          line-height: 32px;
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

    .input-prefix-icon {
      color: @black-25;
    }

    .link-other-login-way {
      padding: 5px;
      border: 1px solid;
      font-size: 20px;
      border-radius: 50%;
      cursor: pointer;

      + .link-other-login-way {
        margin-left: 10px;
      }
    }
  }
}
</style>
