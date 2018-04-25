import React, { Component } from 'react';
import { Card } from 'antd';
import styles from './css/Problem.less';

class ProblemInfo extends Component {
  render() {
    const { problemInfo, infoLoading } = this.props;
    return (
      <div style={{ padding: '0 5px' }}>
        <Card title="题目描述" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.description}</p>
        </Card>
        <Card title="输入描述" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.inputDes}</p>
        </Card>
        <Card title="输出描述" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.outputDes}</p>
        </Card>
        <Card title="样例输入" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.inputCase}</p>
        </Card>
        <Card title="样例输出" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.outputCase}</p>
        </Card>
        <Card title="数据范围及提示" className={styles.cardPlus} loading={infoLoading}>
          <p>{problemInfo.hint}</p>
        </Card>
      </div>
    );
  }
}

export default ProblemInfo;
