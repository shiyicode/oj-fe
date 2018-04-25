import React, { Component } from 'react';
import { Input, Button, Card } from 'antd';
import styles from './index.less';

const { TextArea } = Input;

const colors = ['#000', '#bbb', '#fad733', '#4FC1E9', 'rgb(39, 194, 76)', '#f05050'];
const arr = [
  '答案错误Wrong Answer',
  '编译错误Compile Error',
  '时间超限Time Limit Exceeded',
  '内存超限Memory Limit Exceeded',
  '输出格式错误Output Limit Exceeded',
  '运行时错误Runtime Error',
  '系统错误System Error',
];

class ProblemData extends Component {
  constructor(props) {
    super(props);
    this.submitCode = this.submitCode.bind(this);
  }

  submitCode() {
    let codeValue = this.props.codeValue;
    let testValue = this.refs.test.value;
    console.log(codeValue, testValue);
  }

  render() {
    const { testResult } = this.props;
    return (
      <div>
        <div style={{ padding: '20px 0' }}>每行一个参数</div>
        <TextArea rows={4} ref="test" />
        <Button
          type="primary"
          style={{ float: 'right', marginTop: '10px' }}
          onClick={this.submitCode}
        >
          测试运行
        </Button>
        <div style={{clear: 'both', marginBottom: 20}}></div>
        {/*
        testResult &&
          <div>
            <div>{testResult.result}</div>
            <Card title="你的输入" className={styles.cardPlus}>
              <p>{testResult.input}</p>
            </Card>
            <Card title="你的输出" className={styles.cardPlus}>
              <p>{testResult.output}</p>
            </Card>
            <Card title="期待输出" className={styles.cardPlus}>
              <p>{testResult.exception}</p>
            </Card>
          </div>
        */}
        <div>
          <div></div>
          <Card title="你的输入" className={styles.cardPlus}>
            <p>1<br/>2</p>
          </Card>
          <Card title="你的输出" className={styles.cardPlus}>
            <p>10</p>
          </Card>
          <Card title="期待输出" className={styles.cardPlus}>
            <p>11</p>
          </Card>
        </div>
      </div>
    );
  }
}

export default ProblemData;
