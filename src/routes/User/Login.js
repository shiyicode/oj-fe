import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Row, Col, Alert } from 'antd';
import styles from './Login.less';
import styleIcon from './Icon.less';
const FormItem = Form.Item;
const { TabPane } = Tabs;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    type: 'simple',
  };

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
        window.location.href = '/#/user/userInfo'; // 跳到填写个人信息页
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
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = key => {
    this.setState({
      type: key,
    });
  };

  // // 用户手机登录，获取验证码
  // onGetCaptcha = () => {
  //   let count = 59;
  //   this.setState({ count });
  //   this.interval = setInterval(() => {
  //     count -= 1;
  //     this.setState({ count });
  //     if (count === 0) {
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  // };

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
          <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="simple">
              {login.status === false && this.renderMessage('用户名或密码错误')}
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: type === 'simple',
                      message: '请输入用户名！',
                    },
                  ],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="用户名"
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
            </TabPane>
            <TabPane tab="手机号登录" key="mobile" />
          </Tabs>
          <FormItem className={styles.additional}>
            <Link to="/user/register">前往注册</Link>
            <a className={styles.forgot} href="">
              忘记密码
            </a>
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
          <span className={styleIcon.iconWeixin} />
          <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101466300&redirect_uri=http%3a%2f%2fwww.fightcoder.com%2f%23%2fuser%2flogin&state=1&scope=get_user_info,get_info" >
            <span className={styleIcon.iconQq} />
          </a>
          <a href="https://github.com/login/oauth/authorize?client_id=080191e49e855122ea33&scope=user:email">
            <span className={styleIcon.iconGithub} />
          </a>
          <Link className={styles.register} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}
