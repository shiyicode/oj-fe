import { stringify } from 'qs';
import request from '../utils/request';


// 获得用户信息
export async function getUserInfo (params) {
  return request(`/apiv1/user/getmess?${stringify(params)}`);
}

// 获得每种提交的比例
export async function getCount (params) {
  return request(`/apiv1/user/count?${stringify(params)}`);
}

// 更新用户信息
export async function updateUserInfo (params) {
  return request('/authv1/user/updatemess', {
    method: 'POST',
    body: params,
  });
}

export async function getRecentSubmit (params) {
  return request(`/apiv1/user/recentsubmit?${stringify(params)}`);
}

export async function getRecentRank (params) {
  return request(`/apiv1/user/recentrank?${stringify(params)}`);
}

// 获得个人收藏列表
export async function getCollection (params) {
  return request(`/authv1/user/collection?${stringify(params)}`);
}
