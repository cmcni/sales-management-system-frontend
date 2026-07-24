import React, { useEffect, useState } from 'react';
import LayoutCp from 'components/layout/LayoutCp';
import { ROUTES } from 'utils/const/routes';
import { useNavigate } from 'react-router-dom';
import { funcRuleEmail, funcRulePassword } from 'utils/rules/rules';
import { apiUserSignUp, apiUserSignUpRoleType } from 'apis/account';

const AccountSignUpPg = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [warningEmail, setWarningEmail] = useState('');
  const [warningPassword, setWarningPassword] = useState('');
  const [warningPasswordCheck, setWarningPasswordCheck] = useState('');
  const [warningName, setWarningName] = useState('');
  const [warningPhoneNumber, setWarningPhoneNumber] = useState('');

  const [userRoleTypeId, setUserRoleTypeId] = useState('');
  const [roleTypeList, setRoleTypeList] = useState([]);

  useEffect(() => {
    handleUserRoleTypeList();
  }, []);

  const handleUserRoleTypeList = () => {
    const apiSucc = (res) => {
      if (res.success) {
        setRoleTypeList(res.data);
        setUserRoleTypeId(res?.data[0]?.id);
      }
    };
    apiUserSignUpRoleType(apiSucc);
  };

  const onClickSubmit = () => {
    const apiSucc = (res) => {
      if (res.success) {
        navigate(ROUTES.ACCOUNT_LOGIN);
      } else {
        alert(res?.message);
      }
    };

    const obj = {
      userRoleTypeId,
      emailAddress,
      password,
      name,
      phoneNumber,
    };
    apiUserSignUp(obj, apiSucc);
  };

  const onClickValidationSignUp = (e) => {
    e.preventDefault();

    const checkEmail = funcRuleEmail(emailAddress);
    const checkPassword = funcRulePassword(password);
    const checkPasswordCheck = !!passwordCheck && passwordCheck === password;
    const checkName = !!name;
    const checkPhoneNumber = /^\d{10,11}$/.test(phoneNumber);

    if (!checkEmail) setWarningEmail('아이디 형식에 어긋납니다.');
    else setWarningEmail('');
    if (!checkPassword) setWarningPassword('비밀번호 형식에 어긋납니다.');
    else setWarningPassword('');
    if (!checkPasswordCheck) setWarningPasswordCheck('비밀번호가 일치하지 않습니다.');
    else setWarningPasswordCheck('');
    if (!checkName) setWarningName('이름을 입력해 주세요.');
    else setWarningName('');
    if (!checkPhoneNumber) setWarningPhoneNumber('휴대폰 번호 형식에 어긋납니다.');
    else setWarningPhoneNumber('');

    if (checkEmail && checkPassword && checkPasswordCheck && checkName && checkPhoneNumber) onClickSubmit();
  };

  return (
    <LayoutCp headerTitle="회원가입" button="close" onClickClose={() => navigate(ROUTES.ACCOUNT_LOGIN)}>
      <section className="content_body">
        <div className="wrap">
          <dl className="login_title_dl">
            <dd className="FontS14"></dd>
          </dl>
          <ul className="join_ul">
            <li>
              <h3 className="FontS16B">
                권한 <span>*</span>
              </h3>
              <select value={userRoleTypeId} onChange={(e) => setUserRoleTypeId(e.target.value)}>
                {roleTypeList?.map((r, i) => {
                  return (
                    <option id={'role_type_' + i} key={'role_type_' + i} value={r?.id}>
                      {r?.label}
                    </option>
                  );
                })}
              </select>
            </li>
            <li>
              <h3 className="FontS16B">
                아이디(이메일) <span>*</span>
              </h3>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="예) cmcni@cmcni.com"
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                  if (warningEmail) setWarningEmail('');
                }}
              />
              {warningEmail && <p>{warningEmail}</p>}
            </li>

            <li>
              <h3 className="FontS16B">
                비밀번호 <span>*</span>
              </h3>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="영문, 숫자 포함 8자 이상 입력해 주세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (warningPassword) setWarningPassword('');
                }}
              />
              {warningPassword && <p>{warningPassword}</p>}
            </li>

            <li>
              <h3 className="FontS16B">
                비밀번호 확인<span>*</span>
              </h3>
              <input
                id="passwordCheck"
                name="passwordCheck"
                type="password"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                value={passwordCheck}
                onChange={(e) => {
                  setPasswordCheck(e.target.value);
                  if (warningPasswordCheck) setWarningPasswordCheck('');
                }}
              />
              {warningPasswordCheck && <p>{warningPasswordCheck}</p>}
            </li>

            <li>
              <h3 className="FontS16B">
                성명 <span>*</span>
              </h3>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="예) 홍길동"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (warningName) setWarningName('');
                }}
              />
              {warningName && <p>{warningName}</p>}
            </li>

            <li>
              <h3 className="FontS16B">
                휴대폰 번호 <span>*</span>
              </h3>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="'-' 없이 입력해 주세요."
                value={phoneNumber}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(onlyNums);
                }}
                maxLength={11}
              />
            </li>
          </ul>
        </div>

        <button className="Bfix_btn" onClick={onClickValidationSignUp}>
          제출
        </button>
        <button className="Bfix_btn" onClick={() => navigate(ROUTES.ACCOUNT_LOGIN)}>
          이전
        </button>
      </section>
    </LayoutCp>
  );
};

export default AccountSignUpPg;
