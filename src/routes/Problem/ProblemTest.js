import React, { Component } from 'react';
import { Spin, Progress, Row, Col, Card } from 'antd';

//进度条的变化
const arr = [
  '正在提交Submiting',
  '等待测试Pending',
  '正在编译Compiling',
  '正在评测Running',
  '测试通过Accepted',
  '答案错误Wrong Answer',
  '编译错误Compile Error',
  '时间超限Time Limit Exceeded',
  '内存超限Memory Limit Exceeded',
  '输出格式错误Output Limit Exceeded',
  '运行时错误Runtime Error',
  '系统错误System Error',
];
const colors = ['#000', '#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050'];
function changeProgress(testResult) {
  if (testResult.result < 4) {
    return <Progress percent={testResult.acCase} status="active" />;
  } else if (testResult.result === 4) {
    return <Progress percent={testResult.acCase} />;
  } else if (testResult.result > 4) {
    return <Progress percent={testResult.acCase} status="exception" />;
  } else {
    return <Progress percent={0} />;
  }
}

let count = 0;

class ProblemTest extends Component {
  //当props改变时触发
  componentDidUpdate(nextProps) {
    const id = nextProps.submitStatus.submitId;
    const { dispatch } = this.props;
    if (nextProps.submitStatus.status === 1 && count === 0) {
      count++;
      dispatch({
        type: 'problem/getTestResult',
        payload: {
          id: id,
        },
      });
    } else if (nextProps.submitStatus.status === 1 && nextProps.testResult.submit.result >= 4) {
      count = 0;
    }
  }

  render() {
    const { testResult, testLoading, submitStatus } = this.props;
    if (submitStatus.status === 0) {
      return (
        <Card loading={testLoading}>
          <p style={{ color: '#fcc44d', fontSize: '20px' }}>尚未提交</p>
        </Card>
      );
    } else if (submitStatus.status === -1) {
      return (
        <Card loading={testLoading}>
          <p style={{ color: '#f05050', fontSize: '20px' }}>提交失败</p>
        </Card>
      );
    } else {
      let num = testResult.result > 4 ? 5 : testResult.result;
      return (
        <Card loading={testLoading}>
          <div style={{ fontSize: '14px' }}>
            <span style={{ color: colors[num] }}>{arr[testResult.result]}</span>
            <Spin spinning={num < 4} size="large" />
          </div>
          {changeProgress(testResult)}
          <Row style={{ marginTop: '15px' }}>
            <Col span={12}>
              <span>{testResult.acCase}%数据通过测试</span>
            </Col>
            <Col span={12}>
              <span style={{ float: 'right' }}>总耗时：{testResult.runningTime}ms</span>
            </Col>
          </Row>
        </Card>
      );
    }
  }
}

export default ProblemTest;
