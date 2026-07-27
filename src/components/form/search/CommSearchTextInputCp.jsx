import React from 'react';

const CommSearchTextInputCp = ({ value, setValue, title, placeholder }) => {
  return (
    <div className="search_item">
      <h3 className="FontS14">{title}</h3>
      <input type="text" placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default CommSearchTextInputCp;
