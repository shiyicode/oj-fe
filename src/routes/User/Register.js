import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Popover, Progress, notification, message } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  pool: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception',
};

let count = 0;

@connect(state => ({
  register: state.register,
}))
@Form.create()
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.checkEmailExist = this.checkEmailExist.bind(this);
  }

  state = {
    confirmDirty: false,
    visible: false,
    help: '',
  };

  componentWillReceiveProps(nextProps) {
    // 判断注册是否成功
    if (nextProps.register.status === true && count === 0) {
      count += 1;
      message.success('注册成功！');
      this.props.dispatch(routerRedux.push('/user/login'));
    } else if (nextProps.register.status === false && count === 0) {
      count += 1;
      notification.error({
        message: '注册提示',
        description: nextProps.register.error,
      });
    }

    // 判断邮箱是否存在
    // if (nextProps.register.isExist === true) {
    //   this.setState({
    //     exist: true,
    //   });
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
    return 'pool';
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        count = 0;
        this.props.dispatch({
          type: 'register/submit',
          payload: values,
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  checkEmailExist(e) {
    const email = e.target.value;
    const reg = /^([a-zA-Z0-9_-])+@[a-zA-Z0-9_-]+((\.[a-z]{2,3}){1,2})$/;
    if (email !== '' && reg.test(email)) {
      const { dispatch } = this.props;
      dispatch({
        type: 'register/checkEmailExist',
        payload: {
          email,
        },
      });
    }
  }

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, register } = this.props;
    const { getFieldDecorator } = form;
    // const { exist } = this.state;
    // const warnInfo = exist ? '该邮箱已注册' : '';
    return (
      <div className={styles.main}>
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！',
                },
              ],
            })(<Input size="large" placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('user_name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名！',
                },
              ],
            })(<Input size="large" placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('nick_name', {
              rules: [
                {
                  required: true,
                  message: '请输入昵称！',
                },
              ],
            })(<Input size="large" placeholder="昵称" />)}
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 6 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(<Input size="large" type="password" placeholder="至少6位密码，区分大小写" />)}
            </Popover>
          </FormItem>
          {
            <FormItem>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码！',
                  },
                  {
                    validator: this.checkConfirm,
                  },
                ],
              })(<Input size="large" type="password" placeholder="确认密码" />)}
            </FormItem>
          }
          <FormItem>
            <Button
              size="large"
              loading={register.submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={styles.login} to="/user/login">
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}
