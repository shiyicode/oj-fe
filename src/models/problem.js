import {
  getProblemInfo,
  getTestResult,
  getTestListInfo,
  submitCode,
  saveCode,
} from '../services/api';

export default {
  namespace: 'problem',

  state: {
    problemInfo: {},
    submitStatus: {
      status: 0,
      testInfo: {},
    },
    saveStatus: 0,
    testResult: {
      result: 1,
    },
    testList: {
      list: [],
      totalPages: 0,
    },
    loading: true,
    error: '',
  },

  effects: {
    *getProblemInfo({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getProblemInfo, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveProblemInfo',
          payload: response.data,
        });
      } else {
        yield put({
          type: 'saveProblemInfo',
          payload: {
            error: '服务器错误！',
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *submitCode({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(submitCode, payload);

      if (response.code === 0) {
        yield put({
          type: 'saveSubmitCodeStatus',
          payload: {
            status: 1,
            submitId: response.data,
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getTestResult({ payload }, { call, put }) {
      let response = yield call(getTestResult, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveTestResult',
          payload: response.data.submit,
        });
        let status = response.data.submit.result;
        while (status < 4) {
          response = yield call(getTestResult, payload);
          if (response.code === 0) {
            status = response.data.submit.result;
            yield put({
              type: 'saveTestResult',
              payload: response.data.submit,
            });
          }
        }
      }
    },

    *getTestList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getTestListInfo, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveTestList',
          payload: getTestListResponse(response),
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *saveCode({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(saveCode, payload);
      yield put({
        type: 'saveSaveCodeStatus',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveProblemInfo(state, action) {
      return {
        ...state,
        problemInfo: action.payload,
      };
    },

    saveTestList(state, action) {
      return {
        ...state,
        testList: action.payload,
      };
    },

    saveSubmitCodeStatus(state, action) {
      return {
        ...state,
        submitStatus: action.payload,
      };
    },

    saveSaveCodeStatus(state, action) {
      return {
        ...state,
        saveStatus: action.payload,
      };
    },

    saveTestResult(state, action) {
      return {
        ...state,
        testResult: action.payload,
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
