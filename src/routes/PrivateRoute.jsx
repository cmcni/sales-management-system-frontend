import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import { session } from 'utils/storage/storage';

export default function PrivateRoute({ authRouter }) {
  const isToken = session.getToken();

  if (authRouter) return isToken ? <Outlet /> : <Navigate to={ROUTES.LOGIN_MAIN} />;
  else return isToken ? <Navigate to={ROUTES.MAIN} /> : <Outlet />;
}
