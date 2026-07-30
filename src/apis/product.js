import { axiosInstance, getResponse, KEY_API } from './index';

// 제품을 조회합니다.
export async function apiProductSearch(obj, apiSucc) {
  await axiosInstance
    .get(`${KEY_API.PRODUCT}/search`, { params: obj })
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}
