import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './index.less';
import ChoiceTab from './ChoiceTab';
import Editor from './Editor';

@connect(state => ({
  problem: state.problem,
  user: state.user,
}))
export default class Problem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      left: '48%', // 题目信息区域的大小
      right: '60%', // 编辑器区域的大小
      iconType: 'left', // 方向图标，默认向左
      tabIndex: '1', // 默认选项卡的索引为1,
      codeValue: '',
      language: '',
      isSubmit: false,
    };

    this.changeEditorSize = this.changeEditorSize.bind(this);
    this.checkActive = this.checkActive.bind(this);
    this.setCodeValue = this.setCodeValue.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'problem/fetchProblemInfo',
      payload: {
        id: this.props.match.params.id,
      },
    });
  }

  setCodeValue(value) {
    this.setState({
      codeValue: value,
    });
  }

  setLanguage(lang) {
    this.setState({
      language: lang,
    });
  }

  // 改变编辑器和题目信息区域的大小
  changeEditorSize() {
    let left;
    let right;
    let iconType;
    if (this.state.left === '48%') {
      left = '38%';
      right = '73%';
      iconType = 'right';
    } else {
      left = '48%';
      right = '63%';
      iconType = 'left';
    }
    this.setState({ left, right, iconType });
  }

  // 当点击提交代码按钮时切换tabs
  checkActive(key) {
    let tabIndex;
    if (arguments.length > 0) {
      tabIndex = key;
      this.setState({ tabIndex });
    } else {
      if (this.state.tabIndex !== '3') {
        this.setState({
          tabIndex: '3',
        });
      }
    }
  }

  handleSubmit (flag) {
    this.setState({isSubmit: flag});
  }

  render() {
    const { problem, user } = this.props;
    return (
      <PageHeaderLayout title="题目">
        <Card bordered={false}>
          { problem.error === '' ? (
            <div className={styles.problemContainer}>
              <div style={{ width: this.state.left }} className={styles.animation}>
                <ChoiceTab
                  tabIndex={this.state.tabIndex}
                  changeIndex={this.checkActive}
                  {...problem}
                  dispatch={this.props.dispatch}
                  codeValue={this.state.codeValue}
                  language={this.state.language}
                  handleSubmit={this.handleSubmit}
                  loading={this.state.isSubmit}
                />
              </div>
              <div style={{ width: 25 }} className={styles.animation}>
                <Icon
                  type={this.state.iconType}
                  className={styles.backwardIcon}
                  onClick={this.changeEditorSize}
                />
              </div>
              <div style={{ width: this.state.right }} className={styles.animation}>
                <Editor
                  width="100%"
                  changeIndex={this.checkActive}
                  codeValue={problem.code}
                  language={problem.language}
                  saveStatus={problem.saveStatus}
                  dispatch={this.props.dispatch}
                  setCodeValue={this.setCodeValue}
                  setLanguage={this.setLanguage}
                  problemId={this.props.match.params.id}
                  handleSubmit={this.handleSubmit}
                  problemInfo={problem.problemInfo}
                  currentUser={user.currentUser}
                />
              </div>
            </div>
          ) : (
            <p style={{ color: '#f05050', fontSize: '20px' }}>获得题目信息失败</p>
          )}
        </Card>
      </PageHeaderLayout>
    );
  }
}
