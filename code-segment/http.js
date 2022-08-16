import qs from 'qs';
import service from './request';
import utils from './index';

/**
 * GET 请求
 * @param {String} url URL
 * @param {Object} params Object 参数
 * @returns {Promise} Promise
 */
export function $get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params,
      paramsSerializer: (param) => qs.stringify(param, {
        arrayFormat: 'repeat',
      }),
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
}

/**
 * POST 请求
 * @param {String} url URL
 * @param {Object} params Object 参数
 * @returns {Promise} Promise
 */
export function $post(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => resolve(response),
    ).catch((err) => {
      reject(err);
    });
  });
}

/**
 * GET 请求
 * @param {String} url URL
 * @param {Object} params Object 参数
 * @returns {Promise} Promise
 */
export function $postForm(url, data = {}) {
  return new Promise((resolve, reject) => {
    service
      .post(url, utils.object2FormData(data), { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((response) => {
        resolve(response);
      }).catch((err) => {
        reject(err);
      });
  });
}
