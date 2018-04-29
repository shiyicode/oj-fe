import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userId: '',
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (response.code === 0) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            userId: response.data,
          },
        });
        sessionStorage.setItem('userId', response.data.user_id);
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
      }
    },
    *logout(_, { put }) {
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
