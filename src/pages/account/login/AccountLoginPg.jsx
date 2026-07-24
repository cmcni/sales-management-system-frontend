import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import LayoutCp from 'components/layout/LayoutCp';
import { apiLogin } from 'apis/account';
import { funcRuleEmail, funcRulePassword } from 'utils/rules/rules';
import { session } from 'utils/storage/storage';

const AccountLoginPg = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location?.state?.email ? location.state.email : '');
  const [password, setPassword] = useState('');
  const [warningEmail, setWarningEmail] = useState('');
  const [warningPassword, setWarningPassword] = useState('');

  const onClickSubmit = () => {
    const apiSucc = (res) => {
      const { data, success } = res;
      if (success) {
        const { authToken, email, name, cellNumber, birthDate, socialLogin } = data;
        if (authToken?.accessToken) session.setToken(authToken?.accessToken);
        if (authToken?.refreshToken) session.setRefreshToken(authToken?.refreshToken);
        session.setLoginUser({
          email,
          name,
          cellNumber,
          birthDate,
          socialLogin,
        });
        navigate(ROUTES.MAIN);
      } else {
        alert(
          '로그인에 실패하였습니다 \n .env파일에 server url (REACT_APP_SERVER)를 변경해 주세요. \n .env 파일 변경 시 project 재시작 해야 합니다. '
        );
      }
    };
    apiLogin(email, password, apiSucc);
  };
  const onClickValidationLogin = (e) => {
    e.preventDefault();

    const checkEmail = funcRuleEmail(email);
    const checkPassword = funcRulePassword(password);

    if (!checkEmail) setWarningEmail('아이디 형식에 어긋납니다.');
    else setWarningEmail('');
    if (!checkPassword) setWarningPassword('비밀번호 형식에 어긋납니다.');
    else setWarningPassword('');

    if (checkEmail && checkPassword) onClickSubmit();
  };

  return (
    <LayoutCp headerTitle="로그인" button="close" onClickClose={() => navigate(ROUTES.LOGIN_MAIN)}>
      <section className="content_body">
        <div className="wrap">
          <dl className="login_title_dl">
            <dd className="FontS14">회원가입시 입력한 메일주소를 입력해 주세요.</dd>
          </dl>
          <ul className="join_ul">
            <li>
              <h3 className="FontS16B">아이디(이메일)</h3>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="a@a.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {warningEmail && <p>{warningEmail}</p>}
            </li>
            <li>
              <h3 className="FontS16B">비밀번호</h3>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="영문, 숫자 포함 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {warningPassword && <p>{warningPassword}</p>}
            </li>
          </ul>
        </div>

        <button className="Bfix_btn" onClick={onClickValidationLogin}>
          로그인
        </button>
      </section>
    </LayoutCp>
  );
};

export default AccountLoginPg;
