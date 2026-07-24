import { axiosInstanceWithRefreshToken, getResponse } from './indexRefreshToken';
export { getResponse };

const baseURL = process.env.REACT_APP_SERVER;

export const axiosInstance = axiosInstanceWithRefreshToken;
axiosInstance.defaults.baseURL = baseURL;
axiosInstance.defaults.headers['Accept-Language'] = 'ko-KR';

export const KEY_API = {
  AUTH: '/auth',
  ACCOUNT: '/account',
};
export const defaultSort = {
  sort: 'createdDate',
  desc: true,
};
export const defaultPage = {
  size: 10,
  page: 0,
};

export const defaultParam = () => {
  const obj = {
    ...defaultSort,
    ...defaultPage,
  };
  return obj;
};

export const paramNoPage = { size: -1 };
export const defaultParamNoPage = () => {
  const obj = {
    ...paramNoPage,
    ...defaultSort,
  };
  return obj;
};
