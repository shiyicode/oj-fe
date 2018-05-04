import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import UserBasic from './UserBasic';
import UserPie from './UserPie';
import UserLine from './UserLine';
import styles from './index.less';

@connect(state => ({
  user: state.user,
}))
class UserCenter extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchUserInfo',
      payload: {
        user_name: this.props.match.params.userName,
      },
    });

    dispatch({
      type: 'user/fetchCount',
      payload: {
        user_name: this.props.match.params.userName,
      },
    });

    dispatch({
      type: 'user/getRecentSubmitList',
      payload: {
        user_name: this.props.match.params.userName,
      },
    });

    dispatch({
      type: 'user/getRecentRankList',
      payload: {
        user_name: this.props.match.params.userName,
      },
    });
  }

  render () {

    const { user: { userInfo, count, submitList, rankList, loading } } = this.props;
    return (
      <PageHeaderLayout title="用户详情">
        <Card bordered={false} loading={loading} title={`${userInfo.nick_name}的个人主页`} style={{minHeight: 500}}>
          <div className={styles['info-main']}>
            <UserBasic  userInfo={userInfo} loading={loading} />
            <UserPie count={count} loading={loading} />
          </div>
          <div>
            <UserLine
              submitList={submitList}
              rankList={rankList}
              dispatch={this.props.dispatch}
              userName={userInfo.user_name}
              loading={loading}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default UserCenter;
