import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { getUserInfo, getCount, updateUserInfo, getRecentRank, getRecentSubmit } from '../services/user';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
    userInfo: {},
    count: {},
    submitList: [],
    rankList: [],
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

    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
