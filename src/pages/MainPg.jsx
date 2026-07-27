import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import LayoutCp from 'components/layout/LayoutCp';
import { useSelector, useDispatch } from 'react-redux';
import { changeStoreData1 } from 'store/redux/storeDataSlice';
import { imagesURL } from 'assets/images';

const MainPg = () => {
  const navigate = useNavigate();

  return <LayoutCp headerTitle=""></LayoutCp>;
};

export default MainPg;
