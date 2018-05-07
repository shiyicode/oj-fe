import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Card, Pagination, Alert, Progress, Table, Badge } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['简单', '中等', '困难', '极难'];

@connect(state => ({
  problemList: state.problemList,
}))
class PersonalProblemList extends PureComponent {
  constructor(props) {
    super(props);

    this.getProblemListByPage = this.getProblemListByPage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if (sessionStorage.getItem('userId')) {
      dispatch({
        type: 'problemList/getPersonalList',
        payload: {
          current_page: 1,
          per_page: 10,
        },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  // 根据页码获得题库数据
  getProblemListByPage(pageNumber) {
    const { dispatch } = this.props;
    dispatch({
      type: 'problemList/getPersonalList',
      payload: {
        current_page: pageNumber,
        per_page: 10,
      },
    });
  }

  render() {
    const {
      problemList: { loading, error, personalList, pagination },
    } = this.props;

    const columns = [
      {
        key: 'problemId',
        title: '编号',
        dataIndex: 'problemId',
        render: (val) => val.num,
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
              </div>
            );
          }
        },
      },
      {
        key: 'problemDiff',
        title: '难度等级 ',
        dataIndex: 'problemDiff',
        render(val) {
          return <Badge status={statusMap[val]} text={status[val]} />;
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


    return (
      <PageHeaderLayout title="题库">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              loading={loading}
              dataSource={personalList}
              columns={columns}
              pagination={false}
            />
            {pagination &&
            pagination.total > 0 && (
              <Pagination
                current={pagination.currentPage}
                total={pagination.total}
                onChange={this.getProblemListByPage}
                style={{ float: 'right', marginTop: '20px' }}
              />
            )}
          </div>
          {error && <Alert style={{ marginBottom: 24 }} message={error} type="error" showIcon />}
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default PersonalProblemList;
