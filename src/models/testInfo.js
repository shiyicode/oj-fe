import { getCommonResult } from '../services/api';

export default {
  namespace: 'testInfo',

  state: {
    info: {},
    loading: false,
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getCommonResult, payload);
      if (response.code === 0) {
        yield put({
          type: 'save',
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
    save(state, action) {
      return {
        ...state,
        info: action.payload,
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
