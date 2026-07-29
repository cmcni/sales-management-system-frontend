import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { imagesURL } from 'assets/images';
import { ROUTES } from 'utils/const/routes';
import { apiLogout } from 'apis/account';
import { session } from 'utils/storage/storage';
import { IoChevronDown } from 'react-icons/io5';

const MENU = {
  MANAGEMENT_LIST: { label: '관리 리스트', route: ROUTES.MANAGEMENT_LIST },
  SALES_STATUS_LIST: { label: '매출 현황 리스트', route: '' },
  ESTIMATE_LIST: { label: '견적 리스트', route: '' },
  ETC: { label: '기타', route: '' },
};

const HeaderCp = ({ headerTitle = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggined = session.getToken();
  const loginUser = session.getLoginUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

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

  const roleLabel = loginUser?.userRoleTypeName || '';
  const userDisplay = loginUser?.userName ? `${loginUser.userName} ${roleLabel ? `(${roleLabel})` : ''}` : '내 계정';

  return (
    <header>
      <div className="wrap">
        <div className="m_logo_name">
          <img src={`${imagesURL}/pc_logo.png`} width="300px" style={{ cursor: 'pointer' }} alt="logo" />{' '}
        </div>
        <h1 className="FontS20B">{headerTitle}</h1>
        {isLoggined && (
          <div className="user_menu" ref={menuRef}>
            <button className="user_menu_btn" onClick={() => setMenuOpen((v) => !v)}>
              {userDisplay}
              <IoChevronDown size={14} />
            </button>
            {menuOpen && (
              <ul className="user_menu_dropdown">
                <li onClick={onClickLogout}>로그아웃</li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* 메뉴 */}
      {isLoggined && (
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
      )}
    </header>
  );
};

export default HeaderCp;
