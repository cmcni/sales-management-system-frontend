export const ROUTES_BIG_KEY = Object.freeze({
  BIG_KEY: 'sms',
});

export const ROUTES_KEY = Object.freeze({
  ACCOUNT: `account`,
  MANAGEMENT_LIST: `management-list`,
  PRODUCT_LIST: `product-list`,
});

export const ROUTES = Object.freeze({
  MAIN: `/${ROUTES_BIG_KEY.BIG_KEY}/main`,
  ACCOUNT_LOGIN: `/${ROUTES_BIG_KEY.BIG_KEY}/${ROUTES_KEY.ACCOUNT}/login`,
  ACCOUNT_SIGN_UP: `/${ROUTES_BIG_KEY.BIG_KEY}/${ROUTES_KEY.ACCOUNT}/sign-up`,

  MANAGEMENT_LIST: `/${ROUTES_BIG_KEY.BIG_KEY}/${ROUTES_KEY.MANAGEMENT_LIST}`,
  PRODUCT_LIST: `/${ROUTES_BIG_KEY.BIG_KEY}/${ROUTES_KEY.PRODUCT_LIST}`,
});
