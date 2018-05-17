import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Card, Tag, Pagination, Select, Input, Alert } from 'antd';
import styles from './index.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Option } = Select;
const { Search } = Input;


const statusArr = ['', 'Pending', 'Compiling', 'Running', 'Accepted', 'Wrong Answer', 'Compile Error','Time Limit Exceeded', 'Memory Limit Exceeded','Output Limit Exceeded', 'RunTime Error', 'System Error'];
const colors = ['', '#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050', '#fad733', 'rgb(43, 144, 143)', 'rgb(153, 158, 255)', 'rgb(255, 188, 117)','rgb(124, 181, 236', '#404040'];
const langArr = ['c', 'c++', 'java', 'python', 'golang'];

const columns = [{
  title: '编号',
  dataIndex: 'submitId',
  key: 'submitId',
},{
  title: '题目名称',
  dataIndex: 'problemName',
  key: 'problemName',
  render: obj => <Link to={`/problem/detail/${obj.problemId}`} ><span>{obj.problemId}</span>&nbsp;&nbsp;&nbsp;<span dangerouslySetInnerHTML={{__html: obj.problemName}} /></Link>,
},{
  title: '用户',
  dataIndex: 'userName',
  render: val => <Link to={`/usercenter/${val.userName}`} >{val.nickName}</Link>,
}, {
  title: '运行状态',
  dataIndex: 'status',
  key: 'runStatus',
  render (obj) {
    return <Link to={`/submission/detail/${obj.submitId}`}><Tag color={colors[obj.status]}>{statusArr[obj.status]}</Tag></Link>;
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
  problem_id: '',
};

function setSelect (arr) {
  return arr.map( (value, index) => {
    if (value) {
      return <Option value={index} key={value}>{value}</Option>
    }
  });
}

@connect (state => ({
  testList: state.testList,
}))
export default class TestList extends PureComponent {

  constructor (props) {
    super(props);

    this.state = {
      lang: '',
      status: '',
      langValue: '程序语言',
      statusValue: '测评状态',
    };

    this.getTestListByPage = this.getTestListByPage.bind(this);
    this.getStatusBySelectValue = this.getStatusBySelectValue.bind(this);
    this.getSearchByInputValue = this.getSearchByInputValue.bind(this);
    this.getLangBySelectValue = this.getLangBySelectValue.bind(this);
    this.deleteLangTag = this.deleteLangTag.bind(this);
    this.deleteStatusTag = this.deleteStatusTag.bind(this);
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
    params.status = value;
    params.current_page = 1;
    this.setState({
      status: statusArr[value],
      statusValue: statusArr[value],
    });
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  // 根据语言查询
  getLangBySelectValue (value) {
    params.lang = langArr[value];
    params.current_page = 1;
    this.setState({
      lang: langArr[value],
      langValue: langArr[value],
    });
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  // 根据题目id查询
  getSearchByInputValue (value) {
    const { dispatch } =  this.props;
    params.lang = '';
    params.status = '';
    params.current_page = 1;
    params.per_page = 10;
    params.problem_id = value;

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

  deleteLangTag() {
    this.setState({
      lang: '',
      langValue: '程序语言',
    });
    params.lang = '';
    params.current_page = 1;
    const { dispatch } =  this.props;
    dispatch({
      type: 'testList/fetch',
      payload: params,
    });
  }

  deleteStatusTag() {
    this.setState({
      status: '',
      statusValue: '测评状态',
    });
    params.status = '';
    params.current_page = 1;
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
              style={{width: '12%', marginRight: '5%'}}
              onChange={this.getLangBySelectValue}
              value={this.state.langValue}
            >
              { setSelect(langArr) }
            </Select>
            <Select
              value={this.state.statusValue}
              style={{width: '15%'}}
              onChange={this.getStatusBySelectValue}
            >
              { setSelect(statusArr) }
            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
              this.state.lang && (
              <Tag
                closable
                onClose={this.deleteLangTag}
                color="#2db7f5"
              >
                {this.state.lang}
              </Tag>
              )
            }&nbsp;&nbsp;&nbsp;
            {
              this.state.status && (
              <Tag
                closable
                onClose={this.deleteStatusTag}
                color="#2db7f5"
              >
                {this.state.status}
              </Tag>
              )
            }
          </div>
          <div className={styles.tableList}>
            <Table columns={columns} dataSource={list} pagination={false} loading={loading} />
          </div>
          <Pagination
            current={pagination.currentPage}
            total={pagination.total}
            onChange={this.getTestListByPage}
            style={{float: 'right', marginTop: '20px'}}
          />
          {
            error && (
            <Alert
              style={{ marginBottom: 24}}
              message={error}
              type="error"
              showIcon
            />
)}
        </Card>
      </PageHeaderLayout>
    );
  }
}
