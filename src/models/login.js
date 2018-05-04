import { routerRedux } from 'dva/router';
import { fakeAccountLogin, qqLogin } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userName: '',
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.code === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            userName: response.data.user_name,
          },
        });
        sessionStorage.setItem('userId', response.data.user_id);
        sessionStorage.setItem('userName', response.data.user_name);
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
      }
    },

    *QQLogin(_, { call }){
      const response = yield call(qqLogin);
      if (response.code === 0) {
        window.location.href = response.data;
      }
    },

    *logout(_, { put }) {
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userName');
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        userName: payload.userName,
      };
    },
  },
};
