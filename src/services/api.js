import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function queryNotices() {
  return request('/api/notices');
}

// 获得所有题目
export async function queryProblem(params) {
  return request(`/apiv1/problem/list?${stringify(params)}`);
}

// 获得所有个人题目
export async function queryPersonalProblem(params) {
  return request(`/authv1/problem/userproblem/list?${stringify(params)}`);
}

// 获得做题进度
export async function queryProblemProgress(params) {
  return request(`/apiv1/user/progress?${stringify(params)}`);
}

// 获得当前排行
export async function queryRankList(params) {
  return request(`/authv1/rank/getlist?${stringify(params)}`);
}

// 收藏和取消收藏
export async function queryCollection(params) {
  return request('/authv1/problem/collection/set', {
    method: 'POST',
    body: params,
  });
}

// 获得题目的收藏状态
export async function queryCollectionList(params) {
  return request(`/authv1/problem/collection/get?${stringify(params)}`);
}

// 获得每个题目的状态
export async function queryProblemStatus(params) {
  return request(`/authv1/problem/status?${stringify(params)}`);
}

// 注册
export async function fakeRegister(params) {
  return request('/apiv1/register', {
    method: 'POST',
    body: params,
  });
}

// 检查邮箱是否被注册
export async function checkEmail(params) {
  return request('apiv1/check', {
    method: 'POST',
    body: params,
  });
}

// 登录
export async function fakeAccountLogin(params) {
  return request('/apiv1/login', {
    method: 'POST',
    body: params,
  });
}

// 获得题目信息
export async function getProblemInfo(params) {
  return request(`/apiv1/problem/get?${stringify(params)}`);
}

// 获得提交的代码
export async function getCode(params) {
  return request(`/authv1/problem/code/get?${stringify(params)}`)
}

// 普通提交
export async function commonSubmit (params) {
  return request('/authv1/submit/common', {
    method: 'POST',
    body: params,
  })
}


// 测试提交
export async function testSubmit (params) {
  return request('/authv1/submit/test', {
    method: 'POST',
    body: params,
  });
}

// 获得详情
export async function getCommonResult (params) {
  return request(`/authv1/submit/getcommon?${stringify(params)}`);
}

// 获得详情
export async function getTestResult (params) {
  return request(`/authv1/submit/gettest?${stringify(params)}`);
}

// 保存代码
export async function saveCode (params) {
  return request('/authv1/problem/code/set', {
    method: 'POST',
    body: params,
  });
}

// 获取提交记录list
export async function getTestList (params) {
  return request(`/apiv1/submit/list?${stringify(params)}`);
}

// qq登录
export async function qqLogin (params) {
  return request(`/apiv1/getqqurl?${stringify(params)}`);
}

// 获得排行榜信息
export async function queryRankAll(params) {
  return request(`/apiv1/rank/get?${stringify(params)}`);
}




