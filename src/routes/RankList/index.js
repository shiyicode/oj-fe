import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/fr';
import {Table, Avatar, Progress} from 'antd';
import {connect} from "dva/index";

moment.locale('fr');

const columns = [{
  title: '排行',
  dataIndex: 'rankingList',
  sorter: true,
  width: '10%',
  // render: (text, record) => (<span>{record.rankingList}</span>)
  render: (text, record) => (record.rankingList <= 3 ?
    <span> <img src="../../../public/top%20.png"/>&nbsp;{record.rankingList}</span> :
    <span> &nbsp;&nbsp; &nbsp;&nbsp;{record.rankingList}</span>),
}, {
  title: '用户名',
  dataIndex: 'userName',
  width: '20%',
  render: (text, record) => (
    <div style={{height: 50}}>
      <Avatar src={record.userPic}/>
      &nbsp;&nbsp;
      <span> {record.userName}  </span>

    </div>
  ),
},
  {
    title: '用户描述',
    dataIndex: 'userInfo',
    width: '40%',
    render: (text, record) => (<span>{record.userInfo}</span>),
  },
  {
    title: 'AC数',
    dataIndex: 'passNum',
    width: '10%',
    render: (text, record) => <div>{record.passNum}</div>,
  }, {
    title: '通过率',
    dataIndex: 'passRate',
    width: '15%',
    render: (text, record) => <Progress percent={record.passRate} size="small"/>,
  }];


@connect(state => ({
  rankList: state.rankList,
}))

class RankList extends React.Component {

  componentDidMount() {
    this.fetchRankList({
      url: 'rankList/fetch',
      params: {
        page: 1,
        // origin: this.state.originArray,
        // tag: this.state.algorithmArray,
        // diff: this.state.diffArray,
        // current_page: 1,
        // per_page: 10,
        // sort: 1,
        // is_asc: 1,
      },
    });
  }

  fetchRankList(options) {
    const {dispatch} = this.props;
    dispatch({
      type: options.url,
      payload: options.params,
    });
  }


  render() {
    const {rankList: {data, loading, error}} = this.props;
    let list = [];
    console.log(data);
    if (data && data.list && data.list.length > 0) {
      list = data.list;
    }
    return (
      <Table
        columns={columns}
        dataSource={list}
      />


    );
  }
}

export default RankList;
