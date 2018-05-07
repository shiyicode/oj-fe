import React, { PureComponent } from 'react';
import { Menu, Icon,  Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link, routerRedux } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {

  constructor(props) {
    super(props);
    this.saveUrlBeforeLogin = this.saveUrlBeforeLogin.bind(this);
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  saveUrlBeforeLogin () {
    const url = window.location.href;
    localStorage.setItem("nowUrl", url);
    this.props.dispatch(routerRedux.push('/user/login'));
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="user">
          <Icon type="user" />我的主页
        </Menu.Item>
        <Menu.Item key="collection">
          <Icon type="star-o" />收藏的题目
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
          />
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            // onItemClick={(item, tabProps) => {
            //   console.log(item, tabProps); // eslint-disable-line
            // }}
            // onClear={onNoticeClear}
            // onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            {/*<NoticeIcon.Tab*/}
              {/*list={noticeData['通知']}*/}
              {/*title="通知"*/}
              {/*emptyText="你已查看所有通知"*/}
              {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"*/}
            {/*/>*/}
            {/*<NoticeIcon.Tab*/}
              {/*list={noticeData['消息']}*/}
              {/*title="消息"*/}
              {/*emptyText="您已读完所有消息"*/}
              {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"*/}
            {/*/>*/}
            {/*<NoticeIcon.Tab*/}
              {/*list={noticeData['待办']}*/}
              {/*title="待办"*/}
              {/*emptyText="你已完成所有待办"*/}
              {/*emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"*/}
            {/*/>*/}
          </NoticeIcon>
          {sessionStorage.getItem('userId') ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avator || 'https://gw.alipayobjects.com/zos/rmsportal/UjusLxePxWGkttaqqmUI.png'} />
                <span className={styles.name}>{currentUser.nick_name}</span>
              </span>
            </Dropdown>
          ) : (
            <div className={styles.loginAction} >
              <span onClick={this.saveUrlBeforeLogin} className={styles.login}>登录</span>
              <Link to="/user/register" className={styles.register}>注册</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
