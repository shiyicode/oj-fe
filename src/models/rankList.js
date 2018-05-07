import { queryRankAll } from '../services/api';

function formatData(list) {
  const tableList = [];
  if (list && list.length > 0) {
    list.forEach( (item, index) => {
      tableList.push({
        key: `000${index}`,
        rankNum: item.rank_num,
        avator: {
          avator: item.avator,
          userName: item.user_name,
        },
        nickName: {
          nickName: item.nick_name,
          userName: item.user_name,
        },
        acNum: item.ac_num,
        totalNum: item.total_num,
      });
    });
  }
  return tableList;
}

export default {
  namespace: 'rankList',

  state: {
    list: [],
    total: 0,
    loading: false,
  },

  effects: {
    *fetch({ payload }, { put, call }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryRankAll, payload);
      if (response.code === 0) {
        yield put({
          type: 'saveList',
          payload: {
            list: formatData(response.data.list),
            total: response.data.total,
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
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    saveList(state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
      };
    },
  },
};
