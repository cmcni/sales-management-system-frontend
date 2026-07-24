import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { imagesURL } from 'assets/images';
import { ROUTES } from 'utils/const/routes';
import { apiLogout } from 'apis/account';
import { session } from 'utils/storage/storage';

const MENU = {
  MANAGEMENT_LIST: { label: '관리 리스트', route: '' },
  SALES_STATUS_LIST: { label: '매출 현황 리스트', route: '' },
  ESTIMATE_LIST: { label: '견적 리스트', route: '' },
  ETC: { label: '기타', route: '' },
};

const HeaderCp = ({ headerTitle = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
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

      {/* 메뉴 */}
      <nav className="gnb">
        <ul>
          {Object.entries(MENU)?.map(([key, m]) => {
            const active = !!m?.route && location.pathname === m.route;
            return (
              <li key={key} className={active ? 'active' : ''} onClick={() => m?.route && navigate(m.route)}>
                {m?.label}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderCp;
