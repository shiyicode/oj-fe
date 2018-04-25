import React, { Component } from 'react';
import { Button, Popover, Icon, Radio, Tooltip } from 'antd';
import AceEditor from 'react-ace';
import getDefaultLangs from '../../utils/langFormat';
import styles from './css/Problem.less';
//语言
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/java';
//背景色
import 'brace/theme/github';
import 'brace/theme/xcode';
import 'brace/theme/monokai';

const RadioGroup = Radio.Group;

const defaultLangList = getDefaultLangs('Luwenjing');
let newCode = '';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'github',
      size: 4,
      lang: 'c',
      mode: 'c_cpp',
      defaultCode: this.props.codeValue ? this.props.codeValue : defaultLangList['c_cpp'],
    };

    this.handleTheme = this.handleTheme.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.setCodeValue(newCode);
  }

  handleLanguage(e) {
    let mode = e.target.value === 'c' || e.target.value === 'c++' ? 'c_cpp' : e.target.value;
    this.setState({
      lang: e.target.value,
      defaultCode: defaultLangList[e.target.value],
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

  handleRefresh() {
    let lang = this.state.lang;
    let defaultCode = defaultLangList['c_cpp'];
    for (let key in defaultLangList) {
      if (key === lang) {
        defaultCode = defaultLangList[key];
      }
    }
    this.setState({ defaultCode });
  }

  handleSave() {
    const { dispatch } = this.props;
    dispatch({
      type: 'problem/saveCode',
      payload: {
        problemId: this.props.problemId,
        code: newCode,
      },
    });
  }

  submitCode() {
    //切换tabs
    this.props.changeIndex();
    this.props.setCodeValue(newCode);
    const { dispatch } = this.props;
    dispatch({
      type: 'problem/submitCode',
      payload: {
        problemId: this.props.problemId,
        code: newCode,
        language: this.state.lang,
      },
    });
  }

  onChange(newValue) {
    if (newValue !== '') {
      // this.props.setCodeValue(newValue);
      newCode = newValue;
      this.setState({
        defaultCode: newCode,
      });
    }
  }

  render() {
    newCode = this.state.defaultCode;

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

    return (
      <div className={styles.editorContainer} style={{ width: this.props.editorWidth }}>
        <AceEditor
          mode={this.state.mode}
          theme={this.state.theme}
          onChange={this.onChange}
          tabSize={this.state.size}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={this.state.defaultCode}
          fontSize={14}
          style={{ width: '100%', height: 460 }}
        />
        <div className={styles.editorFooter}>
          <select className={styles.codeLanguage} onChange={this.handleLanguage}>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
          <Popover content={content} trigger="click">
            <Tooltip title="设置">
              <Button className={styles.iconButton}>
                <Icon type="setting" />
              </Button>
            </Tooltip>
          </Popover>
          <Tooltip title="重做">
            <Button className={styles.iconButton} onClick={this.handleRefresh}>
              <Icon type="reload" />
            </Button>
          </Tooltip>
          <Tooltip title="保存">
            <Button className={styles.iconButton}>
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
