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

// 제품 목록을 검색 조건에 맞춰 엑셀로 다운로드합니다.
// 파일(blob) 응답이라 success/data 규격이 아닌 별도 shape으로 콜백에 넘깁니다.
export async function apiProductExportExcel(obj, apiSucc) {
  await axiosInstance
    .get(`${KEY_API.PRODUCT}/excel/export`, { params: obj, responseType: 'blob' })
    .then((res) => {
      apiSucc({ success: true, blob: res.data, headers: res.headers });
    })
    .catch((error) => {
      apiSucc({ success: false, message: error.message });
    });
}
