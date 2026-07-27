import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { session } from 'utils/storage/storage';

export default function PrivateRoute({ authRouter }) {
  const isToken = session.getToken();

  if (authRouter) return isToken ? <Outlet /> : <Navigate to={ROUTES.ACCOUNT_LOGIN} />;
  else return isToken ? <Navigate to={ROUTES.MANAGEMENT_LIST} /> : <Outlet />;
}
