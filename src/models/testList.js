import { getTestList } from '../services/api';

function getTestListResponse (response) {
  const testList = {
    pagination: {
      total: 0,
    },
    list: [],
  };

  if (response && response.data) {
    if (response.data.list &&  response.data.list.length > 0) {
      response.data.list.forEach( (item, index) => {
        testList.list.push({
          key: index,
          submitId: item.submit_id,
          problemName: {
            id: item.submit_id,
            problemName: item.problem_name,
          },
          userName: item.username,
          status: item.status,
          runningTime: item.time_cost,
          runningMemory: item.memory_cost,
          language: item.language,
          submitTime: item.timee,
        });
      });
    }

    if (response.data.total) {
      testList.pagination.total = response.data.total;
    }
  }
  return testList;
}

export default {
  namespace: 'testList',

  state: {
    list: [],
    pagination: {
      total: 0,
    },
    loading: true,
    error: '',
  },

  effects: {
    *fetch( { payload }, { put, call }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getTestList, payload);
      if (response.code === 0) {
        yield put({
          type: 'save',
          payload: getTestListResponse(response),
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            error: '服务器错误',
          },
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
        data: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  }
}
