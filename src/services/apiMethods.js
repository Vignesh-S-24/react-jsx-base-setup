import instance from './axiosInstance';

export const apiPost = async (url, data, config = {}) =>
  instance({
    method: 'post',
    url,
    data,
    ...config,
  });

export const apiDelete = async (url, data) =>
  instance({
    method: 'delete',
    url,
    data,
  });

export const apiGet = async (url, config = {}) =>
  instance({
    method: 'get',
    url,
    ...config,
  });

export const apiGetParams = (url, params = {}) => instance.get(url, { params });

export const apiUpdate = async (url, data, config = {}) =>
  instance({
    method: 'put',
    url,
    data,
    ...config,
  });

export const apiPatch = async (url, data) =>
  instance({
    method: 'patch',
    url,
    data,
  });
