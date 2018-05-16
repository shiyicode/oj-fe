import {
  queryProblem,
  queryProblemProgress,
  queryRankList,
  queryCollection,
  queryCollectionList,
  queryPersonalProblem,
  queryProblemStatus,
} from '../services/api';

function formatProblemListData(list) {
  const data = [];
  for (let i = 0; i < list.length; i += 1) {
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
      problemDiff: list[i].difficulty,
      problemProgress: list[i].ac_rate,
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
        currentPage: 1,
      },
      progress: {},
      rankList: [],
      collection: {
        isSuccess: false,
        flag: '',
      },
      personalList: [],
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
        if (sessionStorage.getItem('userId')) { // 如果用户登录了
          if (response.data && response.data.list) {
            if (response.data.list.length > 0) {
              const idList = [];
              // 获取当前页题目的Id列表
              response.data.list.forEach(item => {
                idList.push(item.id);
              });
              // 获取题目的收藏信息
              const responseCollectionList = yield call(queryCollectionList, {
                problem_ids: idList.join(','),
              });

              if (responseCollectionList && responseCollectionList.code === 0) {
                const { list } = response.data;
                let statusList = [];
                const collectionList = responseCollectionList.data;
                list.forEach((item, index) => {
                  list[index].isCollect = collectionList[index]; // 对题目信息和收藏信息进行合并
                });
                // 获得题目状态信息
                const responseStatusList = yield call(queryProblemStatus, {
                  problem_ids: idList.join(','),
                });

                if (responseStatusList && responseStatusList.code === 0) {
                  statusList = responseStatusList.data;
                  list.forEach((item, index) => {
                    list[index].status = statusList[index]; // 对题目信息和状态信息进行合并
                  });
                }
                const tableListDataSource = formatProblemListData(list); // 格式化信息
                yield put({
                  type: 'save',
                  payload: {
                    list: tableListDataSource,
                    pagination: {
                      total: response.data.total,
                      currentPage: response.data.current_page,
                    },
                  },
                });
              }
            } else {
              const tableListDataSource = formatProblemListData(response.data.list); // 格式化信息
              yield put({
                type: 'save',
                payload: {
                  list: tableListDataSource,
                  pagination: {
                    total: response.data.total,
                    currentPage:response.data.current_page,
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
                currentPage:response.data.current_page,
              },
            },
          });
        }
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

    *getProgress({ payload }, { call, put }) {
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
          },
        });
      }
    },

    *getRankList({ payload }, { call, put }) {
      const response = yield call(queryRankList, payload);
      if (response && response.code === 0) {
        yield put({
          type: 'saveRankList',
          payload: response.data,
        });
      } else {
        yield put({
          type: 'saveRankList',
          payload: {
            error: '服务器错误',
          },
        });
      }
    },

    *collection({ payload }, { call, put }) {
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
          },
        });
      }
    },

    *getPersonalList( {payload}, {put, call}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryPersonalProblem, payload);
      if (response.code === 0) {
        const tableListDataSource = formatProblemListData(response.data.list); // 格式化信息
        yield put({
          type: 'savePersonal',
          payload: {
            personalList: tableListDataSource,
            pagination: {
              total: response.data.total,
              currentPage:response.data.current_page,
            },
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

    savePersonal(state, action) {
      return {
        ...state,
        personalList: action.payload.personalList,
        pagination: action.payload.pagination,
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
