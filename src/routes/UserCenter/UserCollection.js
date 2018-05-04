import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Pagination, Alert, Tag, Checkbox, Popover, Button } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';

const CheckboxGroup = Checkbox.Group;

const origin = ['官方', 'CodeVs', 'HDU'];
const algorithm = [
  '分治',
  '贪心',
  '字符串',
  '动态规划',
  '搜索',
  '线性结构',
  '链表',
  '堆结构',
  '树结构',
  '图论',
];
const diff = ['简单', '中等', '困难', '极难'];

@connect(state => ({
  problemList: state.problemList,
}))
class OpenProblemList extends PureComponent {

  componentDidMount() {
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: this.state.originArray,
        tag: this.state.algorithmArray,
        diff: this.state.diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  // 根据页码获得题库数据
  getProblemListByPage(pageNumber) {
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        current_page: pageNumber,
        per_page: 10,
        origin: this.state.originArray,
        tag: this.state.algorithmArray,
        diff: this.state.diffArray,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  fetchProblemList(options) {
    const { dispatch } = this.props;
    dispatch({
      type: options.url,
      payload: options.params,
    });
  }

  render() {
    const {
      problemList: { loading, error, list, pagination, collection },
    } = this.props;

    return (
      <PageHeaderLayout title="题库">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              loading={loading}
              data={list}
              collection={collection}
              dispatch={this.props.dispatch}
            />
            {pagination &&
            pagination.total > 0 && (
              <Pagination
                defaultCurrent={1}
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

export default OpenProblemList;
