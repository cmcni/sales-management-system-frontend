import { axiosInstance, getResponse, KEY_API } from './index';

export async function apiBuyerCreate(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.BUYER}/create`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

export async function apiBuyerFindAll(apiSucc) {
  await axiosInstance
    .get(`${KEY_API.BUYER}/find-all`)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}
