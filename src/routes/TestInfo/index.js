import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Card, Tag, Spin } from 'antd';
import AceEditor from 'react-ace';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/golang';
import 'brace/theme/github';

const statusArr = ['', 'Pending','Compiling','Running','Accepted', 'Wrong Answer', 'Compile Error','Time Limit Exceeded', 'Memory Limit Exceeded','Output Limit Exceeded', 'RunTime Error', 'System Error'];
const colors = ['', '#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050'];
const mode = {
  'c++': 'c_cpp',
  'c': 'c_cpp',
  'golang': 'golang',
  'python': 'python',
};

@connect( state => ({
  testInfo: state.testInfo,
}))
export default class TestInfo extends PureComponent {

  componentDidMount () {
    const { dispatch } = this.props;
    if (sessionStorage.getItem('userId')) {
      dispatch({
        type: 'testInfo/fetch',
        payload: { submit_id: this.props.match.params.id },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  render () {
    const { testInfo: { loading, info } } = this.props;
    let modeLanguage = 'c_cpp';
    const code = info.code || '代码不可见，请登录';
    for (const item in mode) {
      if (info.lang && info.lang.toLowerCase() === item) {
        modeLanguage = mode[item].toLowerCase();
      }
    }
    return (
      <PageHeaderLayout title="测评详情">
        <Card
          bordered={false}
          title={
            <span style={{fontSize: '20px'}}>
              <Link to={`/problem/detail/${info.problem_id}`}>{info.problem_name}</Link> - <span>{info.lang && info.lang.toLowerCase()}</span>
              <Tag color="rgb(39, 194, 76)" style={{marginLeft: '20px'}}>简单</Tag>
            </span>}
        >
          <Spin spinning={loading} >
            <div className={styles.errorContainer}>
              <h2 style={{color: colors[info.status]}}>{statusArr[info.status]}</h2>
              <div className={styles.runRate}>
                <span>占用内存：{info.memory_cost}kb</span>
                <span>总耗时：{info.time_cost}ms</span>
              </div>
              <div
                className={styles.errorInfo}
                style={{display: info.description ? 'block' : 'none'}}
              >
                <h3>错误信息</h3>
                <div>{info.description}</div>
              </div>
            </div>
            <AceEditor
              mode={modeLanguage}
              theme="github"
              name="UNIQUE_ID_OF_DIV"
              editorProps={{$blockScrolling: true}}
              fontSize={14}
              value={code}
              className={styles.editor}
              readOnly={true}
            />
          </Spin>
        </Card>
      </PageHeaderLayout>

    );
  }
}

