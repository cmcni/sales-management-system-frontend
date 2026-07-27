import React from 'react';

const CommSelectBoxCp = ({ value, setValue, title, rowData, useNoneValue }) => {
  return (
    <div className="search_item">
      <h3 className="FontS14">{title}</h3>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        {useNoneValue && <option value={''}>전체</option>}
        {Object.values(rowData)?.map((d, i) => {
          return (
            <option key={i} value={d?.value}>
              {d?.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CommSelectBoxCp;
