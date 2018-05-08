import React, { PureComponent } from 'react';
import { Link, routerRedux } from 'dva/router';
import { Table, Badge, Progress, Icon, notification } from 'antd';
import styles from './index.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['简单', '中等', '困难', '极难'];
// const colors = ['', 'green', 'orange', 'pink', 'blue'];

let count = 0;

let target = {};

let flag = ''; // 收藏和取消收藏标志

class StandardTable extends PureComponent {

  componentWillReceiveProps(nextProps) {
    // 收藏和取消收藏返回时的显示逻辑
    if (nextProps.collection && nextProps.collection !== {}) {
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
        if (isSuccess && flag === 'set') target.style.color = 'orange';
        if (isSuccess && flag === 'cancel') {
          target.style.color = '';
        }
      }
      count += 1;
    }
  }

  collection(e, problemId) {
    const { dispatch } = this.props;
    if (sessionStorage.getItem('userId')) {
      target = e.target;
      count = 0;
      if (target.style.color === 'orange') {
        flag = 'cancel';
      } else {
        flag = 'set';
      }
      dispatch({
        type: 'problemList/collection',
        payload: {
          problem_id: problemId,
          flag,
        },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  // 渲染对应的收藏按钮
  renderStar(isCollect) {
    if (isCollect === true) {
      return <Icon type="star-o" style={{ color: 'orange' }} />;
    } else {
      return <Icon type="star-o" />;
    }
  }

  render() {
    const columns = [
      {
        key: 'problemId',
        title: '编号',
        dataIndex: 'problemId',
        render: val => {
          if (val.status === 1) {
            return (
              <span>
                <Icon type="smile-o" style={{ color: '#4EF037', fontWeight: 'bold' }} />&nbsp;&nbsp;{
                  val.num
                }
              </span>
            );
          } else if (val.status === 2) {
            return (
              <span>
                <Icon type="meh-o" style={{ color: '#FD2E2E', fontWeight: 'bold' }} />&nbsp;&nbsp;{
                  val.num
                }
              </span>
            );
          } else {
            return (
              <span>
                <span style={{ display: 'inline-block', width: 14, height: 14 }} />&nbsp;&nbsp;{
                  val.num
                }
              </span>
            );
          }
        },
        sorter: (a, b) => a.problemId.num - b.problemId.num,
      },
      {
        key: 'problemName',
        title: '题目名称',
        dataIndex: 'problemName',
        render: val => {
          if (val.name) {
            return (
              <div>
                <Link to={`/problem/detail/${val.id}`}><span dangerouslySetInnerHTML={{__html: val.name}} /></Link>&nbsp;&nbsp;
                <span
                  onClick={e => {
                    this.collection(e, val.id);
                  }}
                  id={`collect-${val.id}`}
                  style={{ display: 'none' }}
                >
                  {this.renderStar(val.isCollect)}
                </span>
              </div>
            );
          }
        },
        sorter: (a, b) => a.problemName - b.problemName,
      },
      {
        key: 'problemDiff',
        title: '难度等级 ',
        dataIndex: 'problemDiff',
        render(val) {
          return <Badge status={statusMap[status.indexOf(val)]} text={val} />;
        },
        sorter: (a, b) => a.problemDiff - b.problemDiff,
      },
      {
        key: 'problemProgress',
        title: '通过率',
        dataIndex: 'problemProgress',
        render: val => <Progress percent={val} />,
        sorter: (a, b) => a.problemProgress - b.problemProgress,
      },
    ];

    const { data, loading } = this.props;

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          dataSource={data}
          columns={columns}
          pagination={false}
          onRow={record => {
            return {
              onMouseEnter: () => {
                // 鼠标移入行，显示收藏按钮
                const elem = document.getElementById(`collect-${record.problemName.id}`);
                if (elem) {
                  elem.style.display = '';
                }
              },
              onMouseLeave: () => {
                // 鼠标移出行，不显示收藏按钮
                const elem = document.getElementById(`collect-${record.problemName.id}`);
                if (elem) {
                  elem.style.display = 'none';
                }
              },
            };
          }}
        />
      </div>
    );
  }
}

export default StandardTable;
