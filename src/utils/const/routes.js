export const ROUTES_BIG_KEY = Object.freeze({
  BIG_KEY: 'project',
});

export const ROUTES_KEY = Object.freeze({
  ACCOUNT: `account`,
});

export const ROUTES = Object.freeze({
  MAIN: `/${ROUTES_BIG_KEY.BIG_KEY}/main`,
  ACCOUNT_LOGIN: `/${ROUTES_BIG_KEY.BIG_KEY}/${ROUTES_KEY.ACCOUNT}/account/login`,
});
