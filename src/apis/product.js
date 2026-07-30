import { axiosInstance, getResponse, KEY_API } from './index';

// 제품 카테고리를 생성합니다.
export async function apiProductCategoryCreate(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.PRODUCT_CATEGORY}/create`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

// 제품 카테고리 목록을 조회합니다.
export async function apiProductCategoryFindAll(apiSucc) {
  await axiosInstance
    .get(`${KEY_API.PRODUCT_CATEGORY}/find-all`)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

// 제품 모델을 생성합니다.
export async function apiProductModelCreate(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.PRODUCT_MODEL}/create`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

// 제품 모델 목록을 조회합니다.
export async function apiProductModelFindAll(apiSucc) {
  await axiosInstance
    .get(`${KEY_API.PRODUCT_MODEL}/find-all`)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

// 제품을 등록합니다.
export async function apiProductCreate(obj, apiSucc) {
  await axiosInstance
    .post(`${KEY_API.PRODUCT}/create`, obj)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

// 제품을 삭제합니다.
export async function apiProductDelete(productId, apiSucc) {
  await axiosInstance
    .delete(`${KEY_API.PRODUCT}/delete/${productId}`)
    .then((res) => {
      const resResult = getResponse(res);
      apiSucc(resResult);
    })
    .catch((error) => {
      apiSucc(error?.response?.data ?? { success: false, message: error.message });
    });
}

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
