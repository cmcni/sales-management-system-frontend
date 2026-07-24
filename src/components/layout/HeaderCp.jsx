import React from 'react';
import { imagesURL } from 'assets/images';

const HeaderCp = ({ headerTitle = '' }) => {
  return (
    <header>
      <div className="wrap">
        <div className="m_logo_name">
          <img src={`${imagesURL}/pc_logo.png`} width="300px" style={{ cursor: 'pointer' }} alt="logo" />{' '}
        </div>
        <h1 className="FontS20B">{headerTitle}</h1>
      </div>
    </header>
  );
};

export default HeaderCp;
