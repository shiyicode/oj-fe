import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Pagination, Alert, Tag, Checkbox, Popover, Button } from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './TableList.less';
import PieGraph from './PieGraph';
import UserTopList from './UserTopList';

const CheckboxGroup = Checkbox.Group;


function setCheckbox (arr) {
  return arr.map( (value) => (
    <div key={value} style={{padding: '5px 0'}}>
      <Checkbox value={value}>{value}</Checkbox>
    </div>
));
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
class OpenProblemList extends PureComponent {
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
    this.deleteAlgorithmTag = this.deleteAlgorithmTag.bind(this);
    this.deleteOriginTag = this.deleteOriginTag.bind(this);
    this.deleteDiffTag = this.deleteDiffTag.bind(this);
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

  getOriginTag(values) {
    const originArray = values;
    this.setState({
      originArray,
    }, () => {
      this.getProblemsByTags();
    });
  }

  getAlgorithmTag(values) {
    const algorithmArray = values;
    this.setState({
      algorithmArray,
    }, () => {
      this.getProblemsByTags();
    });
  }

  getDiffTag(values) {
    const diffArray = values;
    this.setState({
      diffArray,
    }, () => {
      this.getProblemsByTags();
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

  deleteOriginTag() {
    this.setState({originArray: []});
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: [],
        tag: this.state.algorithmArray,
        diff: this.state.diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  deleteAlgorithmTag() {
    this.setState({algorithmArray: []});
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: this.state.originArray,
        tag: [],
        diff: this.state.diffArray,
        current_page: 1,
        per_page: 10,
        sort: 1,
        is_asc: 1,
      },
    });
  }

  deleteDiffTag() {
    this.setState({ diffArray: [] });
    this.fetchProblemList({
      url: 'problemList/fetch',
      params: {
        origin: this.state.originArray,
        tag: this.state.algorithmArray,
        diff: [],
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

    const content1 = (
      <CheckboxGroup onChange={this.getOriginTag} value={this.state.originArray}>
        {setCheckbox(origin)}
      </CheckboxGroup>
)

    const content2 = (
      <CheckboxGroup onChange={this.getAlgorithmTag} value={this.state.algorithmArray}>
        {setCheckbox(algorithm)}
      </CheckboxGroup>
)

    const content3 = (
      <CheckboxGroup onChange={this.getDiffTag} value={this.state.diffArray}>
        {setCheckbox(diff)}
      </CheckboxGroup>
)

    return (
      <PageHeaderLayout title="题库">
        <Card bordered={false}>
          <div className={styles['problem-container']}>
            <div className={styles['problem-list']}>
              <div style={{ marginBottom: 10 }}>
                <Popover
                  placement="bottom"
                  content={content1}
                  trigger="hover"
                  key="struct"
                >
                  <Button>按来源筛选</Button>
                </Popover>
                {/*
                <Popover
                  placement="bottom"
                  content={content2}
                  trigger="hover"
                  key="algorithm"
                >
                  <Button className={styles.popover}>按算法筛选</Button>
                </Popover>
                */}
                <Popover
                  placement="bottom"
                  content={content3}
                  trigger="hover"
                  key="diff"
                >
                  <Button className={styles.popover}>按难度筛选</Button>
                </Popover>
                &nbsp;&nbsp;
                {originArray &&
                  originArray.length > 0 && (
                    <span>
                      <Tag
                        closable
                        onClose={this.deleteOriginTag}
                        color="#2db7f5"
                      >
                        {originArray.join(',')}
                      </Tag>

                    </span>
                  )}&nbsp;&nbsp;&nbsp;&nbsp;
                {algorithmArray &&
                  algorithmArray.length > 0 && (
                    <span>
                      <Tag
                        closable
                        onClose={this.deleteAlgorithmTag}
                        color="#2db7f5"
                      >
                        {algorithmArray.join(',')}
                      </Tag>
                    </span>
                  )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {diffArray &&
                  diffArray.length > 0 && (
                    <span>
                      <Tag
                        closable
                        onClose={this.deleteDiffTag}
                        color="#2db7f5"
                      >
                        {diffArray.join(',')}
                      </Tag>
                    </span>
                  )}
              </div>
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
                      current={pagination.currentPage}
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

export default OpenProblemList;
