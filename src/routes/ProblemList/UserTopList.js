import React, { PureComponent } from 'react';
import { Icon, Tabs, Avatar } from 'antd';
import { Link } from 'dva/router';

const { TabPane } = Tabs;

// const rankList = [];
// for (let i = 0; i < 5; i += 1) {
//   rankList.push({
//     user_id: i,
//     rank_num: 60 + i,
//     avator: 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png',
//     nick_name: '一棵树',
//     ac_rate: 90,
//   });
// }

class UserTopList extends PureComponent {
  constructor(props) {
    super(props);
    this.getRankList = this.getRankList.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem('userId')) {
      const { dispatch } = this.props;
      dispatch({
        type: 'problemList/getRankList',
        payload: {
          is_week: 1,
        },
      });
    }
  }

  getRankList(key) {
    const { dispatch } = this.props;
    let isWeek = 1;
    if (key === '2') {
      isWeek = 2;
    }
    dispatch({
      type: 'problemList/getRankList',
      payload: {
        is_week: isWeek,
      },
    });
  }

  render() {
    const { loading, rankList } = this.props;
    return (
      <Tabs defaultActiveKey="1" load={loading.toString()} onChange={this.getRankList}>
        <TabPane tab="本周" key="1">
        {
          rankList && rankList.length > 0 ?
          <ul>
            {rankList.map((item, index) => {
              return (
                <li key={item.rank_num} style={{ backgroundColor: index === 2 ? '#C7F3FF' : '' }}>
                  <span>{item.rank_num}</span>
                  <Avatar src={item.avator || 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png'} style={{ margin: '0 10px 5px 20px' }}/>
                  <Link to={`/user/${item.user_id}`} style={{ color: '#000' }}>
                    {item.nick_name}
                  </Link>
                  <span style={{ fontSize: '14px', float: 'right' }}>
                  <span style={{ fontSize: '14px', color: 'rgb(39, 194, 76)' }}>AC</span>
                  <span style={{ fontSize: '14px', padding: '0 3px' }}>{item.ac_num}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon type="right" style={{ paddingTop: 10 }} />
                  </span>
                </li>
              );
            })}
          </ul> :
          <div style={{height: '200px'}}>暂无排名信息</div>
        }
        </TabPane>
        <TabPane tab="上周" key="2">
          {
            rankList && rankList.length > 0 ?
            <ul>
              {rankList.map((item, index) => {
                return (
                  <li key={item.rank_num} style={{ backgroundColor: index === 2 ? '#C7F3FF' : '' }}>
                    <span>{item.rank_num}</span>
                    <Avatar src={item.avator || 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png'} style={{ margin: '0 10px 5px 20px' }}/>
                    <Link to={`/user/${item.user_id}`} style={{ color: '#000' }}>
                      {item.nick_name}
                    </Link>
                    <span style={{ fontSize: '14px', float: 'right' }}>
                    <span style={{ fontSize: '14px', color: 'rgb(39, 194, 76)' }}>AC</span>
                    <span style={{ fontSize: '14px', padding: '0 3px' }}>{item.ac_num}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Icon type="right" style={{ paddingTop: 10 }}/>
                    </span>
                  </li>
                );
              })}
            </ul> :
            <div style={{height: '200px'}}>暂无排名信息</div>
          }
        </TabPane>
      </Tabs>
     );
  }
}

export default UserTopList;
