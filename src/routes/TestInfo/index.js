import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'react-router-dom';
import { Card, Tag, Progress } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import AceEditor from 'react-ace';
import styles from './TestInfo.less';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/theme/github';

const statusArr = ['', 'Pending','Compiling','Running','Accepted', 'Wrong Answer', 'Compile Error','Time Limit Exceeded', 'Memory Limit Exceeded','Output Limit Exceeded', 'RunTime Error', 'System Error'];
const colors = ['', '#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050', '#f05050'];
const mode = {
  'c++': 'c++',
  'c': 'c_cpp',
  'java': 'java',
  'python': 'python',
};

@connect( state => ({
  testInfo: state.testInfo
}))
export default class TestInfo extends PureComponent {

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'testInfo/fetch',
      payload: { id: this.props.match.params.id },
    });
  }

  render () {
    const { testInfo: { loading, info } } = this.props;
    const submit = info.submit;
    const isHide = info.isHide;
    let modeLanguage = 'c_cpp';
    let code = '代码不可见';
    if (!isHide) {
      code = submit.code;
    }
    for (let item in mode) {
      if (submit.language === item) {
        modeLanguage = mode[item];
      }
    }
    return (
      <PageHeaderLayout title="测评详情">
        <Card bordered={false}>
					<span style={{fontSize: '20px'}}>
						<Link to="/problem/123">{submit.title} - {submit.language}</Link>
						<Tag color="rgb(39, 194, 76)" style={{marginLeft: '20px'}}>简单</Tag>
					</span>
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
          <div className={styles.errorContainer}>
            <h2 style={{color: colors[submit.result]}}>{statusArr[submit.result]}</h2>
            <Progress percent={submit.acCase} />
            <div className={styles.runRate}>
              <span>{submit.acCase}% 数据通过测试.</span>
              <span>总耗时：{submit.runningTime}ms</span>
            </div>
            <div className={styles.errorInfo}
                 style={{display: submit.resultDes ? 'block' : 'none'}}
            >
              <h3>错误信息</h3>
              <div>{submit.resultDes}</div>
            </div>
          </div>
        </Card>
      </PageHeaderLayout>

    );
  }
}

