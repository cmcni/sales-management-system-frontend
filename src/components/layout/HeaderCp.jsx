import React from 'react';
import { useNavigate } from 'react-router-dom';
import { imagesURL } from 'assets/images';
import { ROUTES } from 'utils/const/routes';
import { apiLogout } from 'apis/account';
import { session } from 'utils/storage/storage';

const HeaderCp = ({ headerTitle = '' }) => {
  const navigate = useNavigate();
  const isLoggined = session.getToken();

  const onClickLogout = () => {
    const apiSucc = (res) => {
      if (res.success) {
        session.removeToken();
        session.removeRefreshToken();
        session.removeLoginUser();
        navigate(ROUTES.ACCOUNT_LOGIN);
      }
    };
    apiLogout(apiSucc);
  };

  return (
    <header>
      <div className="wrap">
        <div className="m_logo_name">
          <img src={`${imagesURL}/pc_logo.png`} width="300px" style={{ cursor: 'pointer' }} alt="logo" />{' '}
        </div>
        <h1 className="FontS20B">{headerTitle}</h1>
        {isLoggined && (
          <button className="logout_btn" onClick={onClickLogout}>
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
};

export default HeaderCp;
