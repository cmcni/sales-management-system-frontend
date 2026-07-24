import axios from 'axios';
import { session } from 'utils/storage/storage';

const timeout = 50000;
export const axiosInstanceWithRefreshToken = axios.create({ timeout });

axiosInstanceWithRefreshToken.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    params.append(key, paramObj[key]);
  }
  return params.toString();
};

axiosInstanceWithRefreshToken.interceptors.request.use((config) => {
  let token = null;
  if (config.url.includes('refreshToken')) token = session.getRefreshToken();
  else token = session.getToken();

  if (!token) return config;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

var isRefreshToken = false;
axiosInstanceWithRefreshToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config: originalRequest, response } = error;

    if (response !== undefined && [401].includes(response.status)) {
      if (!originalRequest.url.includes('refreshToken') && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshToken) {
          // 다른 요청에서 refreshToken을 이미 요청 중인 경우, 현재 요청을 대기
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              if (!isRefreshToken) {
                clearInterval(interval);
                resolve(axiosInstanceWithRefreshToken(originalRequest));
              }
            }, 100);
          });
        } else {
          isRefreshToken = true;
          try {
            await apiGetRefreshToken(() => {
              isRefreshToken = false;
            });
          } catch (err) {
            session.removeToken();
            session.removeRefreshToken();
            session.removeLoginUser();
            console.log('apiGetRefreshToken Error');
            window.location.reload();
          }
          return axiosInstanceWithRefreshToken(originalRequest);
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export async function apiGetRefreshToken(apiSucc) {
  return await axiosInstanceWithRefreshToken.post(`auth/refreshToken`).then((res) => {
    const resResult = getResponse(res);
    if (resResult?.success) {
      const { authToken, email, name, cellNumber, birthDate, socialLogin } = resResult?.data;
      if (authToken?.accessToken) session.setToken(authToken.accessToken);
      if (authToken?.refreshToken) session.setRefreshToken(authToken.refreshToken);
      session.setLoginUser({ email, name, cellNumber, birthDate, socialLogin });
      apiSucc();
    }
  });
}

// [TODO] getResponse함수는 server에서 오는 response 형식에 맞추어 변경하여 사용
export function getResponse(res, rData = true, rDate = false) {
  const { data, status } = res;
  const { data: subData, pageInfo, success, message, date } = data;
  const result = {};
  message && (result.message = message);
  pageInfo && (result.pageInfo = pageInfo);
  result.success = success;
  if (!success) console.log('[API-FAIL-RESPONSE]::', message);

  rData && (result.data = subData);
  rDate && (result.date = date);
  return result;
}
