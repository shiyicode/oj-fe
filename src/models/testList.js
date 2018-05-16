import { getTestList } from '../services/api';

function getTestListResponse (response) {
  const testList = {
    pagination: {
      total: 0,
      currentPage: 0,
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
            problemId: item.problem_id,
            problemName: item.problem_name,
          },
          userName: {
            userName: item.user_name,
            userId: item.user_id,
            nickName: item.nick_name,
          },
          status: {
            status: item.status,
            submitId: item.submit_id,
          },
          runningTime: item.time_cost,
          runningMemory: item.memory_cost,
          language: item.lang,
          submitTime: item.time,
        });
      });
    }

    if (response.data.total) {
      testList.pagination.total = response.data.total;
      testList.pagination.currentPage = response.data.current_page;
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
      currentPage: 1,
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
        const data = getTestListResponse(response);
        yield put({
          type: 'save',
          payload: data,
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            list: [],
            pagination: {
              total: 0,
            },
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
        list: action.payload.list,
        pagination: action.payload.pagination,
        error: action.payload.error,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
}
