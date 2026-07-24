export const KEY_STORAGE = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  LOGIN_USER: 'loginUser',

  REGISTER_TERMS: 'terms',

  KAKAO_ACCOUNT: 'kakaoAccount',

  NICE_CALLBACK: 'niceCallback',
  NICE_CALLBACK_URL: 'niceCallbackUrl',
};

//===========================[LOGIN]===================================
const getToken = () => {
  const token = sessionStorage.getItem(KEY_STORAGE.TOKEN);
  return token === 'undefined' || token === null ? null : token;
};
const getRefreshToken = () => {
  const token = sessionStorage.getItem(KEY_STORAGE.REFRESH_TOKEN);
  return token === 'undefined' || token === null ? null : token;
};
const getLoginUser = () => {
  const data = sessionStorage.getItem(KEY_STORAGE.LOGIN_USER);
  return data && data !== 'undefined' ? JSON.parse(data) : null;
};

const setToken = (token) => sessionStorage.setItem(KEY_STORAGE.TOKEN, token);
const setRefreshToken = (refreshToken) => sessionStorage.setItem(KEY_STORAGE.REFRESH_TOKEN, refreshToken);
const setLoginUser = (data) => sessionStorage.setItem(KEY_STORAGE.LOGIN_USER, JSON.stringify(data));

const removeToken = () => sessionStorage.removeItem(KEY_STORAGE.TOKEN);
const removeRefreshToken = () => sessionStorage.removeItem(KEY_STORAGE.REFRESH_TOKEN);
const removeLoginUser = () => sessionStorage.removeItem(KEY_STORAGE.LOGIN_USER);

//===========================[REGISTER]===================================
const getRegisterTerms = () => {
  let terms = sessionStorage.getItem(KEY_STORAGE.REGISTER_TERMS);
  return terms ? JSON.parse(terms) : [];
};
const setRegisterTerms = (terms) => sessionStorage.setItem(KEY_STORAGE.REGISTER_TERMS, JSON.stringify(terms));
const removeRegisterTerms = () => sessionStorage.removeItem(KEY_STORAGE.REGISTER_TERMS);

export const session = Object.freeze({
  getToken,
  getRefreshToken,
  getLoginUser,

  setToken,
  setRefreshToken,
  setLoginUser,

  removeToken,
  removeRefreshToken,
  removeLoginUser,

  setRegisterTerms,
  getRegisterTerms,
  removeRegisterTerms,
});
