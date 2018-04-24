import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Pagination, Select, Alert, Tag } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import PieGraph from './PieGraph';
import UserTopList from './UserTopList';

const { Option } = Select;

function setOptions(arr) {
  return arr.map(value => <Option value={value}>{value}</Option>);
}

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
class TableList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      originArray: [],
      algorithmArray: [],
      diffArray: [],
    };

    this.getProblemsBySearch = this.getProblemsBySearch.bind(this);
    this.getOriginTag = this.getOriginTag.bind(this);
    this.getAlgorithmTag = this.getAlgorithmTag.bind(this);
    this.getDiffTag = this.getDiffTag.bind(this);
    this.getProblemListByPage = this.getProblemListByPage.bind(this);
  }

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

  // 根据题目name或id来查找题目
  getProblemsBySearch(value) {
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        search: value,
        requestPage: 1,
      },
    });
  }

  // 根据标签获得题库数据
  getProblemsByTags() {
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

  getOriginTag(value) {
    const { originArray } = this.state;
    if (originArray.indexOf(value) === -1) {
      originArray.push(value);
      this.setState({
        originArray,
      });
      this.getProblemsByTags();
    }
  }

  getAlgorithmTag(value) {
    const { algorithmArray } = this.state;
    if (algorithmArray.indexOf(value) === -1) {
      algorithmArray.push(value);
      this.setState({
        algorithmArray,
      });
      this.getProblemsByTags();
    }
  }

  getDiffTag(value) {
    const { diffArray } = this.state;
    if (diffArray.indexOf(value) === -1) {
      diffArray.push(value);
      this.setState({
        diffArray,
      });
      this.getProblemsByTags();
    }
  }

  // 根据页码获得题库数据
  getProblemListByPage(pageNumber) {
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        current_pag: pageNumber,
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

  deleteOriginTag(index) {
    const { originArray } = this.state;
    originArray[index] = '';
    this.setState({ originArray });
    // originArray.splice(index, 1);
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: originArray,
        tag: this.state.algorithmArray,
        diff: this.state.diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
    this.setState({ originArray });
  }

  deleteAlgorithmTag(index) {
    const { algorithmArray } = this.state;
    algorithmArray[index] = '';
    this.setState({ algorithmArray });
    // algorithmArray.splice(index, 1);
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: this.state.originArray,
        tag: algorithmArray,
        diff: this.state.diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  deleteDiffTag(index) {
    const { diffArray } = this.state;
    diffArray[index] = '';
    this.setState({ diffArray });
    // diffArray.splice(index, 1);
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: this.state.originArray,
        tag: this.state.algorithmArray,
        diff: diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  render() {
    const {
      problemList: { loading, error, list, pagination, progress, rankList, collection },
    } = this.props;
    const { originArray, algorithmArray, diffArray } = this.state;
    return (
      <PageHeaderLayout title="题库">
        <Card bordered={false}>
          <div className={styles['problem-container']}>
            <div className={styles['problem-list']}>
              <div style={{ marginBottom: 10 }}>
                <Select value="按题目来源筛选" style={{ width: 150 }} onChange={this.getOriginTag}>
                  {setOptions(origin)}
                </Select>{' '}
                &nbsp;&nbsp;
                <Select value="按算法源筛选" style={{ width: 150 }} onChange={this.getAlgorithmTag}>
                  {setOptions(algorithm)}
                </Select>{' '}
                &nbsp;&nbsp;
                <Select value="按难度筛选" style={{ width: 150 }} onChange={this.getDiffTag}>
                  {setOptions(diff)}
                </Select>
                &nbsp;&nbsp;
                {originArray &&
                  originArray.length > 0 && (
                    <span>
                      {originArray.map((item, index) => {
                        return (
                          <Tag
                            closable
                            onClose={this.deleteOriginTag.bind(this, index)}
                            color="#2db7f5"
                          >
                            {item}
                          </Tag>
                        );
                      })}
                    </span>
                  )}&nbsp;&nbsp;&nbsp;&nbsp;
                {algorithmArray &&
                  algorithmArray.length > 0 && (
                    <span>
                      {algorithmArray.map((item, index) => {
                        return (
                          <Tag
                            closable
                            onClose={this.deleteAlgorithmTag.bind(this, index)}
                            color="#2db7f5"
                          >
                            {item}
                          </Tag>
                        );
                      })}
                    </span>
                  )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {diffArray &&
                  diffArray.length > 0 && (
                    <span>
                      {diffArray.map((item, index) => {
                        return (
                          <Tag
                            closable
                            onClose={this.deleteDiffTag.bind(this, index)}
                            color="#2db7f5"
                          >
                            {item}
                          </Tag>
                        );
                      })}
                    </span>
                  )}
              </div>
              <div className={styles.tableList}>
                {
                  <StandardTable
                    loading={loading}
                    data={list}
                    collection={collection}
                    dispatch={this.props.dispatch}
                  />
                }
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
            </div>
            <div className={styles['problem-other']}>
              <div className={styles.pieGraph}>
                <h3 className={styles['title-h3']}>当前进度</h3>
                <PieGraph
                  dispatch={this.props.dispatch}
                  progress={progress}
                  loading={loading}
                  error={error}
                />
              </div>
              <div className={styles.avatorList}>
                <h3 className={styles['title-h3']}>我的排名</h3>
                <UserTopList
                  dispatch={this.props.dispatch}
                  rankList={rankList}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </div>
          {error && <Alert style={{ marginBottom: 24 }} message={error} type="error" showIcon />}
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default TableList;
