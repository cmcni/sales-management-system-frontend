import { axiosInstance, getResponse, KEY_API } from './index';

export async function apiUserSignUp(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.USER}/sign-up`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

export async function apiUserSignUpRoleType(apiSucc) {
  await axiosInstance
    .get(`${KEY_API.USER}/sign-up/role-type`)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      if (error?.response?.data) apiSucc(error.response.data);
    });
}

export async function apiLogin(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.AUTHENTICATION}/login`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error);
    });
}

export async function apiLogout(email, apiSucc) {
  const obj = {
    email,
  };
  await axiosInstance.post(`${KEY_API.ACCOUNT}/logout`, obj).then((res) => {
    const resResult = getResponse(res);
    apiSucc(resResult);
  });
}

export async function apiWithdrawal(obj, apiSucc) {
  await axiosInstance.post(`${KEY_API.ACCOUNT}/withdrawal`, obj).then((res) => {
    const resResult = getResponse(res);
    apiSucc(resResult);
  });
}
