import React, { Component } from 'react';
import { Tabs, Row, Col, Rate, Icon } from 'antd';
import ProblemInfo from './ProblemInfo';
import ProblemTest from './ProblemTest';
import ProblemData from './ProblemData';
import ProblemSubmission from './ProblemSubmission';
import styles from './css/Problem.less';


const TabPane = Tabs.TabPane;

class ChoiceTab extends Component {

  constructor (props) {
    super(props);

    this.getTestList = this.getTestList.bind(this);
  }

  getTestList (key) {
    this.props.changeIndex(key);
    const { problemInfo } = this.props;
    if (key === '4') {
      const dispatch = this.props.dispatch;
      dispatch({
        type: 'problem/getTestList',
        payload: {
          problemId: problemInfo.id,
          requestPage: 1,
        },
      });
    }
  }

  render () {
    const { problemInfo, testList, testResult, loading, submitStatus } = this.props;
    return (
      <div className={styles.problemTab}>
        <div className="problem-header">
          <h1>{problemInfo.title}</h1>
          <Row>
            <Col md={5} xs={24}><Icon type="clock-circle" />{problemInfo.timeLimit}ms</Col>
            <Col md={7} xs={24}><Icon type="pie-chart" />{problemInfo.memoryLimit}kb</Col>
            <Col md={12} xs={24}><Icon type="up-square" />
              <Rate disabled style={{cursor: 'auto'}}
                    className="rate"
                    defaultValue={3}
                    style={{marginTop: '-8px', fontSize: '16px'}}
              />
            </Col>
          </Row>
        </div>
        <Tabs
          activeKey={this.props.tabIndex}
          onChange={this.getTestList}
        >
          <TabPane  tab="描述" key="1">
            <ProblemInfo problemInfo={problemInfo} infoLoading={loading}/>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ProblemData codeValue={this.props.codeValue} />
          </TabPane>
          <TabPane tab="测评" key="3">
            <ProblemTest
              testResult={testResult}
              testLoading={loading}
              dispatch={this.props.dispatch}
              problemId={problemInfo.id}
              submitStatus={submitStatus}
            />
          </TabPane>
          <TabPane tab="历史" key="4">
            <ProblemSubmission testList={testList} historyLoading={loading}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ChoiceTab
