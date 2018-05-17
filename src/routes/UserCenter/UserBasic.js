import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { Card, Icon, Tooltip, Avatar } from 'antd';
import styles from './index.less';


class UserBasic extends PureComponent {


  render () {
    const { userInfo, loading } = this.props;

    return (
      <Card className={styles['basic-info']}  bordered={false} loading={loading} >
        <div className={styles['info-header']}>
          <div className={styles['info-header-avator']}>
            <Avatar src={userInfo.avator} style={{width: 100, height: 100}} shape="circle" />
          </div>
          <div className={styles['info-header-basic']}>
            <h1 style={{marginLeft: 20}}>{userInfo.nick_name}</h1>
            <div style={{marginLeft: 20}}><span><Icon type={userInfo.sex === '男'? 'man' : 'woman'} />{userInfo.sex || '未公开'}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span><Icon type="calendar" />{userInfo.birthday || '未公开'}</span></div>
          </div>
          <div className={styles['info-header-editor']}>
            { userInfo.user_name === sessionStorage.getItem('userName') && (
            <Tooltip title="编辑">
              <Link to={`/usercenter/write/${userInfo.user_name}`} style={{ color: 'rgb(41, 50, 56)' }}>
                <Icon type="edit" />
              </Link>
            </Tooltip>
)}
          </div>
        </div>
        <div className={styles['other-info']}>
          <div><span>博客：</span>{userInfo.blog}</div>
          <div><span>github：</span>{userInfo.git}</div>
          <div><span>地址：</span>{userInfo.daily_address}</div>
          <div><span>最高学历：</span>{userInfo.stat_school}</div>
          <div><span>学校：</span>{userInfo.school_name}</div>
          <div><span>描述：</span>{userInfo.description}</div>
        </div>
      </Card>
    );
  }
}

export default UserBasic;
