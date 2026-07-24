import React, { useState } from 'react';

const CheckboxAllListDataCp = () => {
  const [label] = useState('sample');
  const [list, setList] = useState(['01', '02', '03', '04']);
  const [checkList, setCheckList] = useState([]);

  const onChangeEach = (e, value) => {
    if (e.target.checked) setCheckList([...checkList, value]);
    else setCheckList(checkList.filter((v) => v !== value));
  };

  return (
    <section className="content_body">
      <h3>[checkbox] - [체크항목 반복문으로 처리하는 경우]</h3>
      <div>선택 값 : {JSON.stringify(checkList)}</div>
      <ul>
        <li>
          <label htmlFor={'allchk' + label} className="checkbox">
            <input
              type="checkbox"
              id={'allchk' + label}
              onChange={(e) => setCheckList(e.target.checked ? list : [])}
              checked={list.length === checkList.length}
            />
            <span className="box"></span>
            <span>전체 선택</span>
          </label>
        </li>
        {list?.map((l, i) => {
          return (
            <li key={'checkBox' + label + i}>
              <label htmlFor={'checkBox' + label + i} className="checkbox">
                <input
                  type="checkbox"
                  id={'checkBox' + label + i}
                  onChange={(e) => onChangeEach(e, l)}
                  checked={checkList.includes(l)}
                />
                <span className="box"></span>
                <span>{l}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CheckboxAllListDataCp;
