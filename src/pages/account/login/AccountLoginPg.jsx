import React, { useState } from 'react';
import LayoutCp from 'components/layout/LayoutCp';
import { ROUTES } from 'utils/const/routes';
import { apiLogin } from 'apis/account';
import { funcRuleEmail } from 'utils/rules/rules';
import { session, local } from 'utils/storage/storage';
import { useNavigate, useLocation } from 'react-router-dom';

const AccountLoginPg = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [emailAddress, setEmailAddress] = useState(location?.state?.eamilAddress || local.getSavedEmail());
  const [password, setPassword] = useState('');
  const [warningEmail, setWarningEmail] = useState('');
  const [warningPassword, setWarningPassword] = useState('');
  const [saveId, setSaveId] = useState(!!local.getSavedEmail());

  const onClickSubmit = () => {
    const apiSucc = (res) => {
      const { data, success } = res;
      if (success) {
        const { authToken, userInfo } = data;
        if (authToken?.accessToken) session.setToken(authToken?.accessToken);
        if (authToken?.refreshToken) session.setRefreshToken(authToken?.refreshToken);
        session.setLoginUser(userInfo);
        if (saveId) local.setSavedEmail(emailAddress);
        else local.removeSavedEmail();
        navigate(ROUTES.MANAGEMENT_LIST);
      } else {
        alert(res.message);
      }
    };

    const obj = { emailAddress, password };
    apiLogin(obj, apiSucc);
  };
  const onClickValidationLogin = (e) => {
    e.preventDefault();

    const checkEmail = funcRuleEmail(emailAddress);
    if (!checkEmail) setWarningEmail('아이디 형식에 어긋납니다.');
    else setWarningEmail('');

    if (!password) setWarningPassword('비밀번호를 입력해 주세요.');
    else setWarningPassword('');

    if (checkEmail && password) onClickSubmit();
  };

  return (
    <LayoutCp headerTitle="로그인" button="close" onClickClose={() => navigate(ROUTES.LOGIN_MAIN)}>
      <section className="account_content_body">
        <div className="wrap">
          <dl className="login_title_dl"></dl>
          <ul className="join_ul">
            <li>
              <h3 className="FontS16B">아이디(이메일)</h3>
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                placeholder="아이디를 입력해 주세요."
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              {warningEmail && <p>{warningEmail}</p>}
            </li>
            <li>
              <h3 className="FontS16B">비밀번호</h3>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {warningPassword && <p>{warningPassword}</p>}
            </li>
            <li className="save_id_li">
              <label className="toggle_switch">
                <input type="checkbox" checked={saveId} onChange={(e) => setSaveId(e.target.checked)} />
                <span className="toggle_slider"></span>
              </label>
              <span className="FontS14">아이디 저장</span>
            </li>
          </ul>
        </div>

        <button className="Bfix_btn" onClick={onClickValidationLogin}>
          로그인
        </button>

        <button className="Bfix_btn" onClick={() => navigate(ROUTES.ACCOUNT_SIGN_UP)}>
          아직 계정이 없으신가요?
        </button>
      </section>
    </LayoutCp>
  );
};

export default AccountLoginPg;
