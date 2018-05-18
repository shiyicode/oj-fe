import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  Radio,
  Cascader,
} from 'antd';
import { options } from '../../utils/cityCascader';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(state => ({
  user: state.user,
}))
@Form.create()
export default class BasicForms extends PureComponent {

  constructor(props) {
    super(props);

    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchUserInfo',
      payload: {
        user_name: sessionStorage.getItem('userName'),
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.birthday = values.birthday.format('YYYY-MM-DD');
        values.daily_address = values.daily_address.join(',');
        this.props.dispatch({
          type: 'user/updateUserMess',
          payload: values,
        });
      }
    });
  }

  handleReset() {
    this.props.dispatch(routerRedux.push(`/usercenter/${sessionStorage.getItem('userName')}`));
  }

  render() {
    const { user: { userInfo } } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout
        title="基础表单"
        content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
      >
        <Card bordered={false} title="填写个人信息">
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator('user_name', {
                initialValue: userInfo.user_name,
                rules: [
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ],
              })(<Input placeholder="请输入用户名" disabled="true" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="昵称">
              {getFieldDecorator('nick_name', {
                initialValue: userInfo.nick_name,
                rules: [
                  {
                    required: true,
                    message: '请输入昵称',
                  },
                ],
              })(<Input placeholder="请输入昵称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别" >
              <div>
                {getFieldDecorator('sex', {
                  initialValue: userInfo.sex,
                  rules: [
                    {
                      required: true,
                      message: '请选择性别',
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                )}
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="生日">
              {getFieldDecorator('birthday', {
                initialValue: moment(userInfo.birthday || '2018-05-04', 'YYYY-MM-DD'),
                rules: [
                  {
                    required: true,
                    message: '请输入生日',
                  },
                ],
              })(<DatePicker style={{ width: '100%' }} placeholder="请输入生日" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="个人描述">
              {getFieldDecorator('description', {
                initialValue: userInfo.description,
                rules: [
                  {
                    required: true,
                    message: '请输入个人描述',
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入个人描述"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="博客">
              {getFieldDecorator('blog', {
                initialValue: userInfo.blog,
                rules: [
                  {
                    required: true,
                    message: '请输入博客地址',
                  },
                ],
              })(<Input placeholder="请输入博客地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="github">
              {getFieldDecorator('git', {
                initialValue: userInfo.git,
                rules: [
                  {
                    required: true,
                    message: '请输入github地址',
                  },
                ],
              })(<Input placeholder="请输入github地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="现住地址">
              {getFieldDecorator('daily_address', {
                initialValue: userInfo.daily_address,
                rules: [
                  {
                    required: true,
                    message: '请输入现住地址',
                  },
                ],
              })( <Cascader options={options} placeholder="请输入现住地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="就学状态">
              {getFieldDecorator('stat_school', {
                initialValue: userInfo.stat_school,
                rules: [
                {
                  required: true,
                  message: '请输入现住地址',
                },
                  ],
                })(
                  <Select
                    placeholder="请选择就学状态"
                  >
                    <Option value="小学">小学</Option>
                    <Option value="初中">初中</Option>
                    <Option value="高中">高中</Option>
                    <Option value="大学">大学</Option>
                    <Option value="研究生">研究生</Option>
                    <Option value="博士">博士</Option>
                  </Select>
                )}
            </FormItem>
            <FormItem {...formItemLayout} label="学校名称">
              {getFieldDecorator('school_name', {
                initialValue: userInfo.school_name,
                rules: [
                  {
                    required: true,
                    message: '请输入学校名称',
                  },
                ],
              })(<Input placeholder="请输入学校名称" />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>取消</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
