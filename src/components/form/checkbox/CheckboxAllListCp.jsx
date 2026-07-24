import React, { useState } from 'react';

const CheckboxAllListCp = () => {
  const [list, setList] = useState(['01', '02', '03', '04']);
  const [checkList, setCheckList] = useState([]);

  const onChangeEach = (e, value) => {
    if (e.target.checked) setCheckList([...checkList, value]);
    else setCheckList(checkList.filter((v) => v !== value));
  };

  return (
    <section className="content_body">
      <h3>[checkbox] - [체크항목 직접나열하는 경우]</h3>
      <div>선택 값 : {JSON.stringify(checkList)}</div>
      <div className="wrap">
        <ul className="agree_ul">
          <li className="allchk">
            <label htmlFor="allchkTerms" className="chkbox">
              <input
                type="checkbox"
                id="allchkTerms"
                onChange={(e) => setCheckList(e.target.checked ? list : [])}
                checked={list.length === checkList.length}
              />
              <span></span>
              <p className="fw_B FontS16B">전체 선택</p>
            </label>
          </li>

          <li>
            <label htmlFor="chkTerms1" className="chkbox">
              <input
                type="checkbox"
                id="chkTerms1"
                onChange={(e) => onChangeEach(e, '01')}
                checked={checkList.includes('01')}
              />
              <span></span>
              <p className="FontS14">체크 01</p>
            </label>
          </li>
          <li>
            <label htmlFor="chkTerms2" className="chkbox">
              <input
                type="checkbox"
                id="chkTerms2"
                onChange={(e) => onChangeEach(e, '02')}
                checked={checkList.includes('02')}
              />
              <span></span>
              <p className="FontS14">체크 02</p>
            </label>
          </li>
          <li>
            <label htmlFor="chkTerms3" className="chkbox">
              <input
                type="checkbox"
                id="chkTerms3"
                onChange={(e) => onChangeEach(e, '03')}
                checked={checkList.includes('03')}
              />
              <span></span>
              <p className="FontS14">체크 03</p>
            </label>
          </li>
          <li>
            <label htmlFor="chkTerms4" className="chkbox">
              <input
                type="checkbox"
                id="chkTerms4"
                onChange={(e) => onChangeEach(e, '04')}
                checked={checkList.includes('04')}
              />
              <span></span>
              <p className="FontS14">체크 04</p>
            </label>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CheckboxAllListCp;
