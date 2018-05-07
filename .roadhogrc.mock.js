import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';
import {
  getProblemList,
  getProblemProgress,
  getRankList,
  collection,
  getCollectionList,
} from './mock/problemList';
import { getProblemInfo, getTestResult, getCommomResult, submitCode, saveCode, getCode } from './mock/problem';
import { getTestList } from './mock/testList';
import { getUserInfo, getCount, getRecentRank, getRecentSubmit, updateUserInfo, getColloctProblem } from './mock/user';
import { getTopList } from './mock/rankList';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    $desc: '获取当前用户接口',
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /apiv1/login': (req, res) => {
    const { password, email, type } = req.body;
    if (password === '888888' && email === 'admin') {
      res.send({
        code: 0,
        data: {
          user_id: '123',
          user_name: 'luwenjing',
        },
      });
    }
    else if (password === '123456' && email === 'user') {
      res.send({
        code: 0,
        data: {
          user_id: '123',
          user_name: 'luwening',
        },
      });
    } else {
      res.send({
        code: 1,
        type,
        currentAuthority: 'guest',
      });
    }
  },
  'POST /apiv1/register': (req, res) => {
    res.send({
      code: 0,
      data: {
        status: true,
        userId: '123456',
      },
    });
  },
  'POST /apiv1/check': (req, res) => {
    res.send({
      code: 0,
      data: false,
    });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /apiv1/problem/list': getProblemList,
  'GET /authv1/problem/userproblem/list': getProblemList,
  'GET /authv1/rank/getlist': getRankList,
  'GET /apiv1/user/progress': getProblemProgress,
  'POST /authv1/problem/collection/set': collection,
  'GET /authv1/problem/collection/get': getCollectionList,
  'GET /apiv1/problem/get': getProblemInfo,
  'POST /authv1/submit/common': submitCode,
  'POST /authv1/submit/test': submitCode,
  'POST /authv1/problem/code/set': saveCode,
  'GET /authv1/problem/code/get': getCode,
  'GET /apiv1/submit/list': getTestList,
  'GET /authv1/submit/getcommon': getCommomResult,
  'GET /authv1/submit/gettest': getTestResult,
  'GET /apiv1/user/getmess': getUserInfo,
  'GET /apiv1/user/count': getCount,
  'POST /authv1/user/updatemess': updateUserInfo,
  'GET /apiv1/user/recentsubmit': getRecentSubmit,
  'GET /apiv1/user/recentrank': getRecentRank,
  'GET /authv1/user/collection': getColloctProblem,
  'GET /apiv1/rank/get': getTopList,
};

export default (noProxy ? {} : delay(proxy, 1000));
