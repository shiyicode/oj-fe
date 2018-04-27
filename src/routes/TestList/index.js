import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Card, Tag, Pagination, Select, Input, Alert } from 'antd';
import styles from './index.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { Search } = Input;


const statusArr = ['Pending','Compiling','Running','Accepted', 'Wrong Answer', 'Compile Error','Time Limit Exceeded', 'Memory Limit Exceeded','Output Limit Exceeded', 'RunTime Error', 'System Error'];
const colors = ['#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050', '#404040'];
const langArr = ['C', 'C++', 'Java', 'Python'];

const columns = [{
  title: '编号',
  dataIndex: 'submitId',
},{
  title: '题目名称',
  dataIndex: 'problemName',
  key: 'problemName',
  render: obj => <Link to={`/submission/detail/${obj.id}`} >{obj.problemName}</Link>,
},{
  title: '用户',
  dataIndex: 'userName',
  render: val => <Link to={`/user/${val.userId}`} >{val.userName}</Link>,
}, {
  title: '运行状态',
  dataIndex: 'status',
  key: 'runStatus',
  render (status) {
    const num = status > 4 ? 5 : status;
    return <Tag color={colors[num]}>{statusArr[status]}</Tag>;
  },
}, {
  title: '耗时',
  dataIndex: 'runningTime',
  key: 'runTime',
  render: val => `${val}ms`,
}, {
  title: '内存',
  dataIndex: 'runningMemory',
  key: 'runSpace',
  render: val => `${val}kb`,
}, {
  title: '语言',
  dataIndex: 'language',
  key: 'language',
}, {
  title: '提交时间',
  dataIndex: 'submitTime',
  key: 'submitDate',
}];

const params = {
  lang: '',
  status: '',
  current_page: 1,
  per_page: 10,
};

function setSelect (arr) {
  return arr.map( (value, index) =>
    <Option value={index} key={value}>{value}</Option>
  );
}

@connect (state => ({
  testList: state.testList,
}))
export default class TestList extends PureComponent {

  constructor (props) {
    super(props);

    this.getTestListByPage = this.getTestListByPage.bind(this);
    this.getStatusBySelectValue = this.getStatusBySelectValue.bind(this);
    this.getSearchByInputValue = this.getSearchByInputValue.bind(this);
    this.getLangBySelectValue = this.getLangBySelectValue.bind(this);
  }

  componentDidMount() {
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  // 根据测评状态查询
  getStatusBySelectValue (value) {
    const status = value !== '测评状态' ? value : '';
    params.result = status;
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  // 根据题目id查询
  getSearchByInputValue (value) {
    if (value !== '') {
      const { dispatch } =  this.props;
      dispatch({
        type: 'testList/fetch',
        payload: {
          requestPage: 1,
          problem_id: value,
        },
      });
    }
  }
  // 根据语言查询
  getLangBySelectValue (value) {
    const lang = value !== '程序语言' ? value : '';
    params.lang = lang;
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }
  // 根据分页查询
  getTestListByPage (pageNumber) {
    params.current_page = pageNumber;
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  render() {

    const { testList: { loading, error, list, pagination } }= this.props;
    return (
      <PageHeaderLayout title="测评记录">
        <Card bordered={false}>
          <div style={{marginBottom: 20}}>
            <Search
              placeholder="输入题目ID"
              enterButton
              onSearch={this.getSearchByInputValue}
              style={{width: '30%', marginRight: '5%'}}
            />
            <Select
              defaultValue="程序语言"
              style={{width: '12%', marginRight: '5%'}}
              onChange={this.getLangBySelectValue}
            >
              { setSelect(langArr) }
            </Select>
            <Select
              defaultValue="测评状态"
              style={{width: '15%'}}
              onChange={this.getStatusBySelectValue}
            >
              { setSelect(statusArr) }
            </Select>
          </div>
          <div className={styles.tableList}>
            <Table columns={columns} dataSource={list} pagination={false} loading={loading} />
          </div>
          <Pagination
            defaultCurrent={1}
            total={pagination.total}
            onChange={this.getTestListByPage}
            style={{float: 'right', marginTop: '20px'}}
          />
          {
            error &&
            <Alert
              style={{ marginBottom: 24}}
              message={error}
              type="error"
              showIcon
            />
          }
        </Card>
      </PageHeaderLayout>
    );
  }
}
