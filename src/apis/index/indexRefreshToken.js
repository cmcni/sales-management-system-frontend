import axios from 'axios';
import { session } from 'utils/storage/storage';
import { ROUTES } from 'utils/const/routes';

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

    // 로그인/회원가입처럼 토큰 없이 보낸 요청의 401은 갱신 대상이 아니라 호출부에서 그대로 처리
    const isAuthenticatedRequest = !!originalRequest?.headers?.Authorization;
    const isRefreshTokenRequest = originalRequest?.url?.includes('refreshToken');

    if (response?.status === 401 && isAuthenticatedRequest && !isRefreshTokenRequest) {
      if (!originalRequest._retry) {
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
            isRefreshToken = false;
            session.removeToken();
            session.removeRefreshToken();
            session.removeLoginUser();
            window.location.href = ROUTES.ACCOUNT_LOGIN;
            return Promise.reject(error);
          }
          return axiosInstanceWithRefreshToken(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

export async function apiGetRefreshToken(apiSucc) {
  return await axiosInstanceWithRefreshToken.post(`authentication/refreshToken`).then((res) => {
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
