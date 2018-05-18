import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input,Button, Icon, Alert } from 'antd';
import styles from './Login.less';
import styleIcon from './Icon.less';

const FormItem = Form.Item;

let count = 0;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 'simple',
    };

    this.toQQLogin = this.toQQLogin.bind(this);
  }

  componentDidMount() {
    const url = location.href;
    const hashCode = this.getCodeAndState(url);
    let arrayList;
    let code;  // code标识
    let status;  // 状态码
    let loginType;  // 登录类型
    if (hashCode) {
      arrayList = hashCode.split('&');
      if (arrayList && arrayList.length === 2) {  // qq登录传递code和state
        code = arrayList[0].split('=')[1];
        status = arrayList[1].split('=')[1];
        loginType = 'qq';
      } else if (arrayList && arrayList.length === 1) { // github只传递code
        code = arrayList[0].split('=')[1];
        status = 1;
        loginType = 'github';
      }
    }
    if (code && status) {
      this.props.dispatch({
        type: 'login/submit',
        payload: {
          'code': code,
          'state': status,
          'type': loginType,
        },
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === true) {
      if (nextProps.login.isFirst === 'true') {
        window.location.href = `/usercenter/write/${nextProps.login.userName}`; // 跳到填写个人信息页
      } else {
        const beforeUrl = localStorage.getItem('nowUrl');
        if (beforeUrl) {
          localStorage.removeItem('nowUrl');
          window.location.href = beforeUrl; // 跳转到之前页
        } else {
          window.location.href = '/'; // 跳转到题目首页
        }
      }
    }
    count += 1;
  }

  componentWillUnmount() {
    count = 0;
  }

  onSwitch = key => {
    this.setState({
      type: key,
    });
  };

  // 获得Hash内容
  getCodeAndState(url) {
    let matchs = url.match(/\?(\S*)\#/); // 匹配问号和井号之前的部分
    if (!matchs) {
      matchs = url.match(/\?(\S*)/); // 匹配井号之后的部分
    }
    if (matchs && matchs.length > 0) {
      return matchs[1];
    } else {
      return '';
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { type } = this.state;
    this.props.form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/submit',
          payload: {
            ...values,
            type,
          },
        });
      }
    });
  };

  toQQLogin() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/QQLogin',
    });
  }

  renderMessage = message => {
    return <Alert style={{ marginBottom: 24 }} message={message} type="error" showIcon />;
  };


  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          {login.status === false && count > 0 && this.renderMessage('邮箱或密码错误')}
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: type === 'simple',
                  message: '请输入邮箱！',
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="邮箱"
                style={{marginTop: 40}}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: type === 'simple',
                  message: '请输入密码！',
                },
              ],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                type="password"
                placeholder="密码"
              />
            )}
          </FormItem>
          <FormItem className={styles.additional}>
            <Button
              size="large"
              loading={login.submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={styles.other}>
          其他登录方式
          {/* 需要加到 Icon 中 */}
          {/* <span className={styleIcon.iconWeixin} /> */}
          <span className={styleIcon.iconQq} onClick={this.toQQLogin} />
          <a href="https://github.com/login/oauth/authorize?client_id=080191e49e855122ea33&scope=user:email">
            <span className={styleIcon.iconGithub} />
          </a>
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}
