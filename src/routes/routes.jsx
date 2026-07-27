import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES_BIG_KEY, ROUTES } from 'utils/const/routes';

import PrivateRoute from './PrivateRoute';

import AccountSignUpPg from 'pages/account/sign-up/AccountSignUpPg';
import AccountLoginPg from 'pages/account/login/AccountLoginPg';
import ManagemantPg from 'pages/management/ManagemantPg';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 인증을 하지 않아야만 접속가능 페이지 (로그인 성공 시, 해당페이지 접속 불가) */}
        <Route element={<PrivateRoute authRouter={false} />}>
          <Route path={ROUTES.ACCOUNT_LOGIN} element={<AccountLoginPg />} />
          <Route path={ROUTES.ACCOUNT_SIGN_UP} element={<AccountSignUpPg />} />
        </Route>

        {/* 인증을 해야만 접속가능 페이지 (로그인후 accessToken이 브라우저에 저장되어 있는지 체크) */}
        <Route element={<PrivateRoute authRouter />}>
          <Route path={ROUTES.MANAGEMENT_LIST} element={<ManagemantPg />} />
          <Route path="/" element={<Navigate to={ROUTES.MANAGEMENT_LIST} />} />
          <Route path={ROUTES_BIG_KEY.BIG_KEY} element={<Navigate to={ROUTES.MANAGEMENT_LIST} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
