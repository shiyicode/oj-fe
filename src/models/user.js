import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getUserInfo, getCount, updateUserInfo, getRecentRank, getRecentSubmit, getCollection } from '../services/user';
import { queryCollection } from '../services/api';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    userInfo: {},
    count: {},
    submitList: [],
    rankList: [],
    collectionList: [],
    total: 0,
    currentPage: 1,
    collection: {},
    loading: false,
  },

  effects: {

    *fetchCurrent ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getUserInfo, payload);
      if (response.code === 0) {
        sessionStorage.setItem('nickName', response.data.nick_name);
        yield put({
          type: 'saveCurrent',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *fetchUserInfo ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getUserInfo, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveUserInfo',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *fetchCount ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getCount, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveCount',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *updateUserMess ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(updateUserInfo, payload);
      if (response.code === 0) {
        message.success('修改成功');
        yield put(routerRedux.push(`/usercenter/${payload.user_name}`));
        // window.location.href  = `/#/usercenter/${payload.user_name}`;
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getRecentSubmitList ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getRecentSubmit, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveSubmitList',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getRecentRankList ({ payload }, { call, put} ) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getRecentRank, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveRankList',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getCollectProblem({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getCollection, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveCollectionList',
          payload: {
            collectionList: response.data.list,
            total: response.data.total,
            currentPage: response.data.current_page,
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    // 收藏题目
    *collection({ payload }, { call, put }) {
      const response = yield call(queryCollection, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'saveCollection',
          payload: response.data,
        });
      } else {
        yield put({
          type: 'saveCollection',
          payload: {
            error: '服务器错误',
          },
        });
      }
    },
  },


  reducers: {
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },

    saveCurrent(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },

    saveUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },

    saveCount(state, action) {
      return {
        ...state,
        count: action.payload,
      };
    },

    saveSubmitList(state, action) {
      return {
        ...state,
        submitList: action.payload,
      };
    },

    saveRankList(state, action) {
      return {
        ...state,
        rankList: action.payload,
      };
    },

    saveCollectionList(state, action) {
      return {
        ...state,
        collectionList: action.payload.collectionList,
        total: action.payload.total,
        currentPage: action.payload.currentPage,
      };
    },

    saveCollection(state, action) {
      return {
        ...state,
        collection: {
          isSuccess: action.payload,
          flag: true,
        },
      };
    },

    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
