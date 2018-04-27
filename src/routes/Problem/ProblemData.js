import React, { Component } from 'react';
import { Input, Button, Card, Spin } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

// 进度条的变化
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

class ProblemData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testValue: '',
      loading: false,
    };
    this.submitCode = this.submitCode.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.testResult && nextProps.testResult.status > -1) || nextProps.isSuccess === 0) {
      this.setState({
        loading: false,
      });
    }
  }
  setValue(e) {
    this.setState({
      testValue: e.target.value,
    });
  }

  submitCode() {
    const { codeValue, language, dispatch } = this.props;
    const { testValue } = this.state;
    this.setState({loading: true});
    dispatch({
      type: 'problem/testSubmitCode',
      payload: {
        user_id: '123456',
        language,
        input: testValue.split('\n').join(','),
        code: codeValue,
      },
    });
  }

  showResult (testResult, isSuccess) {
    if (testResult && testResult.status > -1) {
      const num = testResult.status > 4 ? 5 : testResult.status;
      return <div>
        <div style={{ fontSize: '20px' }}>
          <span style={{ color: colors[num] }}>{arr[testResult.status]}</span>
          <Spin spinning={num < 4} size="large" />
        </div>
        { testResult.status >= 4 &&
          <div>
            <Card title="你的输入" className={styles.cardPlus}>
              <p>{this.state.testValue}</p>
            </Card>
            <Card title="你的输出" className={styles.cardPlus}>
              <p>{testResult.output}</p>
            </Card>
            <Card title="期待输出" className={styles.cardPlus}>
              <p>{testResult.expected}</p>
            </Card>
          </div>
        }
      </div>
    }

    if (isSuccess === 0) {
      return <p style={{ color: '#f05050', fontSize: '20px' }}>提交失败</p>
    }
  }

  render() {
    const { testResult, isSuccess } = this.props;
    const { loading } = this.state;
    return (
      <div style={{paddingRight: 10}}>
        <div style={{ padding: '20px 0' }}>每行一个参数</div>
        <TextArea rows={4} value={this.state.testValue} onChange={this.setValue} />
        <Button
          type="primary"
          style={{ float: 'right', marginTop: '10px' }}
          onClick={this.submitCode}
        >
          测试运行
        </Button>
        <div style={{clear: 'both', marginBottom: 20}} />
        {
          loading ? <Spin spinning={loading} size="large" /> : this.showResult(testResult, isSuccess)
        }
      </div>
    );
  }
}

export default ProblemData;
