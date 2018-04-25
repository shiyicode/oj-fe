import { fakeRegister, checkEmail } from '../services/api';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    userId: '',
    isExist: false,
    error: '',
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if (response.code === 0) {
        yield put({
          type: 'registerHandle',
          payload: {
            userId: response.data,
            status: true,
          },
        });
      } else {
        yield put({
          type: 'registerHandle',
          payload: {
            status: false,
            error: response.msg,
          },
        });
      }
    },

    *checkEmailExist({ payload }, { call, put }) {
      const response = yield call(checkEmail, payload);
      if (response.code === 0) {
        yield put({
          type: 'checkEmail',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        userId: payload.userId,
        error: payload.error,
      };
    },

    checkEmail(state, { payload }) {
      return {
        ...state,
        isExist: payload,
      };
    },
  },
};
