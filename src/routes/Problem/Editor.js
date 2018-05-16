import React, { PureComponent } from 'react';
import { Button, Popover, Icon, Radio, Tooltip, Select, } from 'antd';
import { routerRedux } from 'dva/router';
import AceEditor from 'react-ace';
import getDefaultLangs from '../../utils/langFormat';
import styles from './index.less';
// 语言
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/golang';
// 背景色
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/monokai';


const RadioGroup = Radio.Group;
const { Option } = Select;
let count = 0;

const userName = sessionStorage.getItem('userName') || 'FightCoder';

const defaultLangList = getDefaultLangs(userName);


class Editor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'github',
      size: 4,
      lang: 'c',
      mode: 'c_cpp',
      defaultCode: defaultLangList['c_cpp'],
    };

    this.handleTheme = this.handleTheme.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount () {
    if (sessionStorage.getItem('userId')) {
      const { dispatch } = this.props;
      dispatch({
        type: 'problem/fetchCode',
        payload: {
          problem_id: this.props.problemId,
        },
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    if (count === 1) {
      let { language, codeValue } = nextProps;
      language = language || 'c';
      codeValue = codeValue || defaultLangList['c_cpp'];
      const mode = language === 'c' || language === 'c++' ? 'c_cpp' : language;
      this.setState({
        defaultCode: codeValue,
        lang: language.toLowerCase(),
        mode,
      });
      this.props.setCodeValue(codeValue); // 设置代码
      this.props.setLanguage(language); // 设置语言
    }
    count += 1;
  }

  componentWillUnmount() {
    count = 0;
  }

  // 当编辑器代码改变时触发
  onChange(newValue) {
    if (newValue !== '') {
      this.props.setCodeValue(newValue); // 将代码同步给自测页面
      this.setState({
        defaultCode: newValue,
      });
    }
  }

  handleLanguage(value) {
    const mode = value === 'c' || value === 'c++' ? 'c_cpp' : value;
    this.props.setLanguage(value);
    this.props.setCodeValue(defaultLangList[mode]);
    this.setState({
      lang: value,
      defaultCode: defaultLangList[mode],
      mode,
    });
  }

  handleTheme(e) {
    this.setState({
      theme: e.target.value,
    });
  }

  handleSize(e) {
    this.setState({
      size: e.target.value,
    });
  }

  handleRefresh(e) {
    const { value } = e.target;
    if (value === 'default') {
      const { lang } = this.state;
      let defaultCode = defaultLangList.c_cpp;
      for (const key in defaultLangList) {
        if (key === lang) {
          defaultCode = defaultLangList[key];
        }
      }
      this.setState({
        defaultCode,
      });
    } else {
      if (sessionStorage.getItem('userId')) {
        const { dispatch } = this.props;
        dispatch({
          type: 'problem/fetchCode',
          payload: {
            problem_id: this.props.problemId,
          },
        });
        count = 0;
      }
    }
  }

  handleSave() {
    const { dispatch, problemId } = this.props;
    if (sessionStorage.getItem('userId')) {
      const { lang, defaultCode } = this.state;
      dispatch({
        type: 'problem/saveCode',
        payload: {
          problem_id: problemId,
          save_code: defaultCode,
          language: lang,
        },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  submitCode() {
    const { dispatch, problemId } = this.props;
    const { defaultCode, lang } = this.state;
    // 切换tabs
    if (sessionStorage.getItem('userId')) {
      this.props.changeIndex();
      this.props.handleSubmit(true);
      dispatch({
        type: 'problem/commonSubmitCode',
        payload: {
          problem_id: problemId,
          code: defaultCode,
          language: lang,
        },
      });
    } else {
      dispatch(routerRedux.push('/user/login'));
    }
  }

  render() {
    const { language_limit } = this.props.problemInfo;
    const content = (
      <div>
        <h4>环境配色</h4>
        <RadioGroup onChange={this.handleTheme} value={this.state.theme}>
          <Radio value="xcode">xcode</Radio>
          <Radio value="github">github</Radio>
          <Radio value="monokai">monokai</Radio>
        </RadioGroup>
        <h4 className={styles.codeSize}>代码缩进</h4>
        <RadioGroup onChange={this.handleSize} value={this.state.size}>
          <Radio value={2}>2</Radio>
          <Radio value={4}>4</Radio>
          <Radio value={8}>8</Radio>
        </RadioGroup>
      </div>
    );

    const choice = (
      <RadioGroup onChange={this.handleRefresh}>
        <Radio value="default">返回默认</Radio>
        <Radio value="before">返回上一次保存</Radio>
      </RadioGroup>
    );

    return (
      <div className={styles.editorContainer} >
        <AceEditor
          mode={this.state.mode}
          theme={this.state.theme}
          onChange={this.onChange}
          tabSize={this.state.size}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={this.state.defaultCode}
          fontSize={14}
          style={{ width: '100%', height: 510 }}
        />
        <div className={styles.editorFooter}>
          <Select className={styles.codeLanguage} onChange={this.handleLanguage} defaultValue={this.state.lang}>
            {
              language_limit && language_limit.length > 0 &&  language_limit.map( (item) => {
                return <Option value={item} key={item}>{item}</Option>
              })
            }
          </Select>
          <Popover content={content} trigger="click">
            <Tooltip title="设置">
              <Button className={styles.iconButton}>
                <Icon type="setting" />
              </Button>
            </Tooltip>
          </Popover>
          <Popover content={choice} trigger="click">
            <Tooltip title="重做">
              <Button className={styles.iconButton} onClick={this.handleRefresh}>
                <Icon type="reload" />
              </Button>
            </Tooltip>
          </Popover>
          <Tooltip title="保存">
            <Button className={styles.iconButton} onClick={this.handleSave}>
              <Icon type="save" />
            </Button>
          </Tooltip>
          <Button type="primary" onClick={this.submitCode} style={{ float: 'right' }}>
            提交代码
          </Button>
        </div>
      </div>
    );
  }
}

export default Editor;
