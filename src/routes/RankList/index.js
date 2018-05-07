import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Table, Card, Pagination, Avatar, Icon } from 'antd';
import styles from './index.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const colors = ['#FCDC74', '#EFF0F4', '#F8B195'];

const columns = [{
  title: '排名',
  dataIndex: 'rankNum',
  key: 'ranNum',
  align: 'center',
  render(num){
    if (num <= 3) {
      return <span><Icon type="trophy" style={{color: colors[num - 1], fontSize: 30}} /></span>
    } else {
      return <span>{num}</span>
    }
  },
},{
  title: '用户',
  dataIndex: 'avator',
  key: 'avator',
  render: user => <Link to={`/usercenter/${user.userName}`} ><Avatar src={user.avator || 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png'} /></Link>,
},{
  title: '昵称',
  dataIndex: 'nickName',
  key: 'nickName',
  render: user => <Link to={`/usercenter/${user.userName}`} >{user.nickName}</Link>,
}, {
  title: '总通过数',
  dataIndex: 'acNum',
  key: 'acNum',
  render (num) {
    return <span style={{color: 'rgb(39, 194, 76)'}}>{num}</span>;
  },
}, {
  title: '总提交数',
  dataIndex: 'totalNum',
  key: 'totalNum',
  render: val => <span style={{color: '#4FC1E9'}}>{val}</span>,
},
];


@connect (state => ({
  rankList: state.rankList,
}))
export default class RankList extends PureComponent {

  constructor(props) {
    super(props);

    this.getRankListByPage = this.getRankListByPage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rankList/fetch',
      payload: {
        current_page: 1,
        per_page: 10,
      },
    });
  }

  // 根据分页查询
  getRankListByPage (pageNumber) {
    const { dispatch } =  this.props;
    dispatch({
      type: 'rankList/fetch',
      payload: {
        current_page: pageNumber,
        per_page: 10,
      },
    });
  }

  render() {
    const { rankList: { list, total, loading } } = this.props;
    return (
      <PageHeaderLayout title="排行榜】">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table columns={columns} dataSource={list} pagination={false} loading={loading} />
          </div>
          <Pagination
            defaultCurrent={1}
            total={total}
            onChange={this.getRankListByPage}
            style={{float: 'right', marginTop: '20px'}}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
