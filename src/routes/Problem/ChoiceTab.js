import React, { Component } from 'react';
import { Tabs, Row, Col, Rate, Icon } from 'antd';
import ProblemInfo from './ProblemInfo';
import ProblemTest from './ProblemTest';
import ProblemData from './ProblemData';
import styles from './index.less';

const { TabPane } = Tabs;

class ChoiceTab extends Component {
  constructor(props) {
    super(props);

    this.getTestList = this.getTestList.bind(this);
  }

  getTestList(key) {
    this.props.changeIndex(key);
    const { problemInfo } = this.props;
    if (key === '4') {
      const { dispatch } = this.props;
      dispatch({
        type: 'problem/getTestList',
        payload: {
          problemId: problemInfo.id,
          requestPage: 1,
        },
      });
    }
  }

  render() {
    const { problemInfo, testResult, loading, submitStatus } = this.props;
    return (
      <div className={styles.problemTab}>
        <div className="problem-header">
          <h1>{problemInfo.title}</h1>
          <Row>
            <Col md={8} xs={24}>
              <Icon type="clock-circle" />
              {problemInfo.time_limit}ms
            </Col>
            <Col md={8} xs={24}>
              <Icon type="pie-chart" />
              {problemInfo.memory_limit}kb
            </Col>
            <Col md={8} xs={24}>
              <Icon type="check-square" />
              {problemInfo.ac_rate}%
            </Col>
          </Row>
        </div>
        <Tabs activeKey={this.props.tabIndex} onChange={this.getTestList}>
          <TabPane tab={<span><Icon type="file-text" />描述</span>} key="1">
            <ProblemInfo problemInfo={problemInfo} infoLoading={loading} />
          </TabPane>
          <TabPane tab={<span><Icon type="code-o" />数据</span>} key="2">
            <ProblemData codeValue={this.props.codeValue} />
          </TabPane>
          <TabPane tab={<span><Icon type="dashboard" />测评</span>} key="3">
            <ProblemTest
              testResult={testResult}
              testLoading={loading}
              dispatch={this.props.dispatch}
              problemId={problemInfo.id}
              submitStatus={submitStatus}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ChoiceTab;
