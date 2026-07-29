import React from 'react';

const CommObjectValueSelectCp = ({ value, setValue, rowData, placeHolder = '전체' }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      {placeHolder && <option value={''}>{placeHolder}</option>}
      {Object.values(rowData)?.map((d, i) => {
        return (
          <option key={i} value={d?.value}>
            {d?.label}
          </option>
        );
      })}
    </select>
  );
};

export default CommObjectValueSelectCp;
