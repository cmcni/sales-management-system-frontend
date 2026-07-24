import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/const/routes';
import LayoutCp from 'components/layout/LayoutCp';
import { useSelector, useDispatch } from 'react-redux';
import { changeStoreData1 } from 'store/redux/storeDataSlice';
import { imagesURL } from 'assets/images';

const MainPg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state?.store);
  const [input, setInput] = useState('');

  const onClickSetStoreData = () => {
    dispatch(changeStoreData1(input));
  };
  return (
    <LayoutCp headerTitle="">
      <h1>MainPage</h1>
      <div style={{ border: '1px solid', padding: '10px' }}>
        <h3>
          <img src={`${imagesURL}/search.png`} width="24" alt="search" /> &nbsp; Route
        </h3>
        <button onClick={() => navigate(ROUTES.ACCOUNT_LOGIN)}>Go Login Page</button>
      </div>
      <div style={{ border: '1px solid', padding: '10px' }}>
        <h3>
          <img src={`${imagesURL}/search.png`} width="24" alt="search" /> &nbsp; Store : Redux
        </h3>
        store에 저장한 값 : &nbsp;&nbsp; {storeData?.storeData1}
        <br />
        storeData 전체 : &nbsp;&nbsp;{JSON.stringify(storeData)}
        <br />
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={onClickSetStoreData}>input값을 store에 data 저장</button>
      </div>
    </LayoutCp>
  );
};

export default MainPg;
