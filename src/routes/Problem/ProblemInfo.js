import React, { Component } from 'react';
import { Card } from 'antd';
import styles from './index.less';

class ProblemInfo extends Component {
  render() {
    const { problemInfo, infoLoading } = this.props;
    return (
      <div style={{paddingRight: 10}}>
        <Card title="题目描述" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.description}} />
        </Card>
        <Card title="输入描述" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.input_des}} />
        </Card>
        <Card title="输出描述" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.output_des}} />
        </Card>
        <Card title="样例输入" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.input_case}} />
        </Card>
        <Card title="样例输出" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.output_case}} />
        </Card>
        <Card title="数据范围及提示" className={styles.cardPlus} loading={infoLoading}>
          <p dangerouslySetInnerHTML={{__html: problemInfo.hint}} />
        </Card>
      </div>
    );
  }
}

export default ProblemInfo;
