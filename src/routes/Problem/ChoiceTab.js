import React, { Component } from 'react';
import { Tabs, Row, Col, Avatar, Icon, Tooltip, notification } from 'antd';
import { Link, routerRedux } from 'dva/router';
import ProblemInfo from './ProblemInfo';
import ProblemTest from './ProblemTest';
import ProblemData from './ProblemData';
import styles from './index.less';

const { TabPane } = Tabs;

let count = 0;

let target = {};

let flag = ''; // 收藏和取消收藏标志

class ChoiceTab extends Component {
  constructor(props) {
    super(props);

    this.getTestList = this.getTestList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 收藏和取消收藏返回时的显示逻辑
    if (nextProps.collection && nextProps.collection.flag) {
      if (count === 0) {
        const { isSuccess } = nextProps.collection; // 失败和成功标志
        let collectionInfo = '';
        let warnIcon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />;
        if (isSuccess) {
          if (flag === 'set') {
            collectionInfo = '收藏成功';
          } else {
            collectionInfo = '取消收藏成功';
          }
        } else if (flag === 'cancel') {
          collectionInfo = '取消收藏失败';
          warnIcon = <Icon type="frown-o" style={{ color: '#108ee9' }} />;
        } else {
          collectionInfo = '收藏失败';
          warnIcon = <Icon type="frown-o" style={{ color: '#108ee9' }} />;
        }
        notification.success({
          message: '收藏提示',
          description: collectionInfo,
          icon: warnIcon,
          duration: 2,
        });
        if (isSuccess && flag === 'set') {
          target.style.color = 'orange';
        }
        if (isSuccess && flag === 'cancel') {
          target.style.color = '';
        }
      }
      count += 1;
    }
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

  collection(e) {
    const { dispatch, problemInfo } = this.props;
    if (sessionStorage.getItem('userId')) {
      target = e.target;
      count = 0;
      if (target.style.color === 'orange') {
        flag = 'cancel';
      } else {
        flag = 'set';
      }
      dispatch({
        type: 'problem/collection',
        payload: {
          problem_id: problemInfo.id,
          flag,
        },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  render() {
    const { problemInfo, loading, testResult } = this.props;
    // const discussBtn = <Link to="/discuss">前往讨论&nbsp;<Icon type="right" /></Link>
    return (
      <div className={styles.problemTab}>
        <div className={styles['problem-header']}>
          <div className={styles['problem-title']}>
            <h1>
              <span dangerouslySetInnerHTML={{__html: problemInfo.title}} />&nbsp;&nbsp;
              <span
                style={{fontSize: 26, fontWeight: 500, cursor: 'pointer'}}
                onClick={e => {
                  this.collection(e);
                }}
              >
                {
                  problemInfo.is_collection === true ?
                    <Icon type="star-o"  style={{color: 'orange'}} /> :
                    <Icon type="star-o" />
                }
              </span>
            </h1>
            <div>
              <Link to={`/usercenter/${problemInfo.user_name}`}>
                <Tooltip title="出题者">
                  <Avatar src={problemInfo.user_avator || "https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png"} style={{marginTop: -20}} />
                </Tooltip>
              </Link>
            </div>
          </div>
          <Row>
            <Col md={8} xs={24}>
              <Icon type="clock-circle" />&nbsp;
              {problemInfo.time_limit}ms
            </Col>
            <Col md={8} xs={24}>
              <Icon type="pie-chart" />&nbsp;
              {problemInfo.memory_limit}kb
            </Col>
            <Col md={8} xs={24}>
              <Icon type="check-square" />&nbsp;
              {problemInfo.ac_rate}%
            </Col>
          </Row>
        </div>
        <Tabs
          activeKey={this.props.tabIndex}
          onChange={this.getTestList}
          // tabBarExtraContent={discussBtn}
          className={styles['tab-margin']}
        >
          <TabPane tab={<span><Icon type="file-text" />描述</span>} key="1" >
            <ProblemInfo problemInfo={problemInfo} infoLoading={loading} />
          </TabPane>
          <TabPane tab={<span><Icon type="code-o" />数据</span>} key="2">
            <ProblemData
              codeValue={this.props.codeValue}
              language={this.props.language}
              dispatch={this.props.dispatch}
              testResult={testResult}
            />
          </TabPane>
          <TabPane tab={<span><Icon type="dashboard" />测评</span>} key="3">
            <ProblemTest
              testResult={this.props.commonResult}
              isSuccess={this.props.isSuccess}
              testLoading={loading}
              dispatch={this.props.dispatch}
              problemId={problemInfo.id}
              handleSubmit={this.props.handleSubmit}
              loading={this.props.loading}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default ChoiceTab;
