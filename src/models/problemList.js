import {
  queryProblem,
  queryProblemProgress,
  queryRankList,
  queryCollection,
  queryCollectionList,
} from '../services/api';

function formatProblemListData(list) {
  let data = [];
  for (var i = 0; i < list.length; i++) {
    data.push({
      key: list[i].id + list[i].title,
      id: list[i].id,
      problemId: {
        num: list[i].id,
        status: list[i].status,
      },
      problemName: {
        id: list[i].id,
        name: list[i].title,
        isCollect: list[i].isCollect,
      },
      problemDiff: Math.round(Math.random() * 3),
      problemProgress: Math.ceil(Math.random() * 100),
    });
  }
  return data;
}

function formatTag(tag) {
  let str = '';
  if (tag && tag.length > 0) {
    for (let i = 0; i < tag.length; i++) {
      if (tag[i] !== '' && i !== tag.length - 1) {
        str = str + tag[i] + ',';
      } else if (tag[i] !== '' && i === tag.length - 1) {
        str = str + tag[i];
      }
    }
    return str;
  }
  return tag;
}

export default {
  namespace: 'problemList',

  state: {
    data: {
      list: [],
      pagination: {
        total: 0,
      },
      progress: {},
      rankList: [],
      collection: {
        isSuccess: false,
        flag: '',
      },
    },
    loading: true,
    error: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      payload.origin = formatTag(payload.origin);
      payload.tag = formatTag(payload.tag);
      payload.diff = formatTag(payload.diff);
      // 请求题目信息
      const response = yield call(queryProblem, payload);
      if (response && response.code === 0) {
        // 如果用户登录了
        if (sessionStorage.getItem('userId')) {
          if (response.data && response.data.list && response.data.list.length > 0) {
            const idList = [];
            // 获取当前页题目的Id列表
            response.data.list.forEach(item => {
              idList.push(item.id);
            });
            // 获取题目的收藏信息
            const responseCollectionList = yield call(queryCollectionList, {
              ids: idList.join(','),
            });
            if (responseCollectionList && responseCollectionList.code === 0) {
              const { list } = response.data;
              const collectionList = responseCollectionList.data;
              list.forEach((item, index) => {
                list[index].isCollect = collectionList[index]; // 对题目信息和收藏信息进行合并
              });
              const tableListDataSource = formatProblemListData(list); // 格式化信息
              yield put({
                type: 'save',
                payload: {
                  list: tableListDataSource,
                  pagination: {
                    total: response.data.total,
                  },
                },
              });
            }
          }
        } else {
          const tableListDataSource = formatProblemListData(response.data.list); // 格式化信息
          yield put({
            type: 'save',
            payload: {
              list: tableListDataSource,
              pagination: {
                total: response.data.total,
              },
            },
          });
        }
      } else {
        yield put({
          type: 'save',
          payload: {
            error: '服务器错误',
            loading: false,
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getProgress({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryProblemProgress, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'saveProgress',
          payload: response.data,
        });
      } else {
        yield put({
          type: 'savProgress',
          payload: {
            error: '服务器错误',
            loading: false,
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *getRankList({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryRankList, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'saveRankList',
          payload: response.data.userList,
        });
      } else {
        yield put({
          type: 'saveRankList',
          payload: {
            error: '服务器错误',
            loading: false,
          },
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },

    *collection({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });

      const response = yield call(queryCollection, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'saveCollection',
          payload: {
            isSuccess: response.data,
          },
        });
      } else {
        yield put({
          type: 'saveCollection',
          payload: {
            error: '服务器错误',
            loading: false,
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
      };
    },

    saveProgress(state, action) {
      return {
        ...state,
        progress: action.payload,
      };
    },

    saveRankList(state, action) {
      return {
        ...state,
        rankList: action.payload,
      };
    },

    saveCollection(state, action) {
      return {
        ...state,
        collection: action.payload,
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
