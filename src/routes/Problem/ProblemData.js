import React, { Component } from 'react';
import { Input, Button } from 'antd';
const { TextArea } = Input;

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
    return (
      <div>
        <div style={{ padding: '20px 0' }}>每行一个参数</div>
        <TextArea rows={4} ref="test" />
        <Button
          type="primary"
          style={{ float: 'right', marginTop: '20px' }}
          onClick={this.submitCode}
        >
          测试运行
        </Button>
      </div>
    );
  }
}

export default ProblemData;
