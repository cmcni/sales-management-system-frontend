import React from 'react';
import { imagesURL } from 'assets/images';

const HeaderCp = ({ headerTitle = '' }) => {
  return (
    <header>
      <div className="wrap">
        <div className="m_logo_name">
          {/* <img src={`${imagesURL}/pc_logo.webp`} width="27px" style={{ cursor: 'pointer' }} alt="logo" />{' '} */}
          <img src={`${imagesURL}/EPIKAR LOGO_1.png`} width="30px" />
        </div>
        <h1 className="FontS20B">{headerTitle}</h1>
      </div>
    </header>
  );
};

export default HeaderCp;
