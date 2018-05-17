import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, Pagination, Icon, notification } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';

const colors = ['#2EB872', '#E70000', '#58DADA'];
const statusArr = ['通过', '失败', '待做'];
let count = 0;

@connect(state => ({
  user: state.user,
}))
class UserCollection extends PureComponent {

  constructor(props) {
    super(props);

    this.getCollectionByPage = this.getCollectionByPage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getCollectProblem',
      payload: {
        current_page: 1,
        per_page: 9,
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    // 取消收藏返回时的显示逻辑
    if (nextProps.user.collection && nextProps.user.collection.flag) {
      if (count === 0) {
        const { isSuccess } = nextProps.user.collection; // 失败和成功标志
        let collectionInfo = '';
        let warnIcon = <Icon type="smile-circle" style={{ color: '#108ee9' }} />;
        if (isSuccess) {
          collectionInfo = '取消收藏成功';
        } else {
          collectionInfo = '取消收藏失败';
          warnIcon = <Icon type="frown-o" style={{ color: '#108ee9' }} />;
        }
        notification.success({
          message: '收藏提示',
          description: collectionInfo,
          icon: warnIcon,
          duration: 2,
        });
        if (isSuccess){
          const { dispatch } = this.props;
          dispatch({
            type: 'user/getCollectProblem',
            payload: {
              current_page: 1,
              per_page: 9,
            },
          });
        }
      }
      count += 1;
    }
  }

  getCollectionByPage(pageNum) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/getCollectProblem',
      payload: {
        current_page: pageNum,
        per_page: 9,
      },
    });
  }

  collection(id) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/collection',
      payload: {
        problem_id: id,
        flag: 'cancel',
      },
    });
    count = 0;
  }

  render() {
    const { user: { collectionList, total, currentPage, loading } } = this.props;
    return (
      <PageHeaderLayout title="题库">
        <Card bordered={false} title="我收藏的题目" loading={loading}>
          <div style={{overflow: 'auto', padding: '0 1px 10px 0px'}}>
            { collectionList && collectionList.length > 0 && collectionList.map(item => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card bodyStyle={{ padding: 0 }} bordered={false}>
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <div style={{background: colors[statusArr.indexOf(item.status)]}} className={styles['card-status']}>
                          {item.status}
                        </div>
                        <Link to={`/problem/detail/${item.id}`}>{item.title}</Link>
                      </div>
                  }
                    description={<div className={styles['collection-content']} dangerouslySetInnerHTML={{__html: item.description}} />}
                  />
                  <div className={styles.projectItemContent} style={{float: 'right', cursor: 'pointer', marginTop: 10}}>
                    <span className={styles.datetime} onClick={() => this.collection(item.id)}>取消收藏</span>
                  </div>
                </Card>
              </Card.Grid>
          ))}
            { collectionList && collectionList.length === 0 && <div>暂无收藏题目</div>}
          </div>
          <Pagination
            current={currentPage}
            total={total}
            onChange={this.getCollectionByPage}
            style={{ float: 'right', marginTop: '20px' }}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default UserCollection;
