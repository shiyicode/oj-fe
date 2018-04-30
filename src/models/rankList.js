import {
  getTopList,
} from '../services/api';

export default {
  namespace: 'rankList',

  state: {
    data: {
      list: [],
    },
    loading: true,
    error: '',
  },

  effects: {
    * fetch({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      // 请求排行榜
      const response = yield call(getTopList, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'save',
          payload: response.data,
        });
        // 如果用户登录了
        // if (sessionStorage.getItem('userId')) {
        //   if (response.data && response.data.list && response.data.list.length > 0) {
        //     const idList = [];
        //     // 获取当前页题目的Id列表
        //     response.data.list.forEach(item => {
        //       idList.push(item.id);
        //     });
        //   }
        // }
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
  },
};
