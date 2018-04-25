import React, { PureComponent } from 'react';
import { Icon, Tabs, Spin, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const rankList = [];
for (let i = 0; i < 5; i += 1) {
  rankList.push({
    user_id: i,
    rank_num: 60 + i,
    avator: 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png',
    nick_name: '一棵树',
  });
}

class UserTopList extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.getRankList = this.getRankList.bind(this);
  // }

  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'problemList/getRankList',
  //     payload: {
  //       user_id: 1,
  //       isWeek: 1,
  //     },
  //   });
  // }

  // getRankList(key) {
  //   const { dispatch } = this.props;
  //   let isWeek = 1;
  //   if (key === '2') {
  //     isWeek = 2;
  //   }
  //   dispatch({
  //     type: 'problemList/getRankList',
  //     payload: {
  //       user_id: 1,
  //       isWeek,
  //     },
  //   });
  // }

  render() {
    const { loading } = this.props;
    if (rankList && rankList.length > 0) {
      return (
        <Tabs defaultActiveKey="1" load={loading.toString()}>
          <TabPane tab="本周" key="1">
            <ul>
              {rankList.map((item, index) => {
                return (
                  <li key={item.rank_num} style={{ backgroundColor: index === 2 ? '#C7F3FF' : '' }}>
                    <span>{item.rank_num}</span>
                    <Avatar src={item.avator} style={{ margin: '0 10px 5px 20px' }} />
                    <Link to={`/user/${item.user_id}`} style={{ color: '#000' }}>
                      {item.nick_name}
                    </Link>
                    <Icon type="right" style={{ float: 'right', paddingTop: 10 }} />
                  </li>
                );
              })}
            </ul>
          </TabPane>
          <TabPane tab="上周" key="2">
            <ul>
              {rankList.map((item, index) => {
                return (
                  <li key={item.rank_num} style={{ backgroundColor: index === 2 ? '#C7F3FF' : '' }}>
                    <span>{item.rank_num}</span>
                    <Avatar src={item.avator} style={{ margin: '0 10px 5px 20px' }} />
                    <Link to={`/user/${item.user_id}`} style={{ color: '#000' }}>
                      {item.nick_name}
                    </Link>
                    <Icon type="right" style={{ float: 'right', paddingTop: 10 }} />
                  </li>
                );
              })}
            </ul>
          </TabPane>
        </Tabs>
      );
    } else {
      return <Spin style={{ height: 200 }} loading={loading.toString()} tip="正在加载..." />;
    }
  }
}

export default UserTopList;
