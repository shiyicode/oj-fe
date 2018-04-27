
// import fetch from 'dva/fetch';
import { notification } from 'antd';
import axios from 'axios';

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   notification.error({
//     message: `请求错误 ${response.status}: ${response.url}`,
//     description: response.statusText,
//   });
//   const error = new Error(response.statusText);
//   error.response = response;
//   throw error;
// }

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   const defaultOptions = {
//     credentials: 'include',
//   };
//   let newOptions = { ...defaultOptions, ...options };
//   if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
//     newOptions.headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json; charset=utf-8',
//       ...newOptions.headers,
//     };
//     newOptions.body = JSON.stringify(newOptions.body);
//   }

//   return fetch(url, newOptions)
//     .then(checkStatus)
//     .then(response => {
//       return response.json();
//     })
//     .catch((error) => {
//       if (error.code) {
//         notification.error({
//           message: error.name,
//           description: error.message,
//         });
//       }
//       if ('stack' in error && 'message' in error) {
//         notification.error({
//           message: `请求错误: ${url}`,
//           description: error.message,
//         });
//       }
//       return error;
//     });
// }

export default function request (path, options) {
  // const url = `http://192.168.1.101:9001${path}`; // 联调测试
  const url = `http://www.fightcoder.com:9001${path}`; // 线上环境
  // const url = path; // 本地测试
  if (arguments.length < 2) {
    return axios.get(url, {withCredentials: true})
      .then( response => {
        return response.data;
      })
      .catch( error => {
        if (error.code) {
          notification.error({
            message: error.name,
            description: error.message,
          });
        }
        if ('stack' in error && 'message' in error) {
          notification.error({
            message: `请求错误: ${url}`,
            description: error.message,
          });
        }
        return {
          error: '出错了！',
        };
      });
  }

  else {
    const params = new URLSearchParams();
    for (const item in options.body) {
      params.append(item, options.body[item]);
    }
    return axios.post(url, params, {withCredentials: true})
      .then( response => {
        return response.data;
      })
      .catch( error => {
        if (error.code) {
          notification.error({
            message: error.name,
            description: error.message,
          });
        }
        if ('stack' in error && 'message' in error) {
          notification.error({
            message: `请求错误: ${url}`,
            description: error.message,
          });
        }
        return {
          error: '出错了',
        }
      });
  }
}
