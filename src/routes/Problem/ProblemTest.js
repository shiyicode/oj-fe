import React, { Component } from 'react';
import { Spin, Progress, Row, Col, Card } from 'antd';

// 进度条的变化
const arr = [
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
const colors = ['#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050'];
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


class ProblemTest extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isSubmit: 0,
    };
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.isSuccess === 0) {
      this.setState({
        isSubmit: -1,
      });
    } else if (nextProps.testResult.status > -1) {
      this.setState({
        isSubmit: 1,
      });
      this.props.handleSubmit(false);
    }
  }

  showResult (testResult) {
    if (testResult && testResult.status > -1) {
      const num = testResult.status > 4 ? 5 : testResult.status;
      return <div>
        <div style={{ fontSize: '20px' }}>
          <span style={{ color: colors[num] }}>{arr[testResult.status]}</span>
          <Spin spinning={num < 4} size="large" />
        </div>
        {
          testResult.status >= 4 &&
          <Row style={{ marginTop: '15px' }}>
            <Col span={12}>
              <span>占用内存：{testResult.memory_cost}kb</span>
            </Col>
            <Col span={12}>
              <span style={{ float: 'right' }}>总耗时：{testResult.time_cost}ms</span>
            </Col>
          </Row>
        }
      </div>
    }
  }

  render() {
    const { testResult, loading } = this.props;
    const { isSubmit } = this.state;
    if (isSubmit === 0) {
      return (
        <Card>
          <p style={{ color: '#fcc44d', fontSize: '20px' }}>尚未提交</p>
        </Card>
      );
    } else if (isSubmit === -1) {
      return (
        <Card>
          <p style={{ color: '#f05050', fontSize: '20px' }}>提交失败</p>
        </Card>
      );
    } else {
      return (
        loading ? <Spin spinning={loading} size="large" /> : this.showResult(testResult)
      );
    }
  }
}

export default ProblemTest;
