import React from 'react';
import HeaderCp from './HeaderCp';

const LayoutCp = ({ children, header = true, headerTitle = '' }) => {
  return (
    <div className="body">
      {header && <HeaderCp headerTitle={headerTitle} />}
      {children}
    </div>
  );
};

export default LayoutCp;
