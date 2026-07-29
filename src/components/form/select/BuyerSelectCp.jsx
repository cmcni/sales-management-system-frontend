import React, { useState, useEffect } from 'react';
import { apiBuyerFindAll } from 'apis/buyer';
import BuyerCreateModalCp from 'components/modal/BuyerCreateModalCp';

const ADD_NEW_VALUE = '__ADD_NEW__';

const BuyerSelectCp = ({ value, setValue }) => {
  const [buyerList, setBuyerList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    handleBuyerList();
  }, []);

  const handleBuyerList = () => {
    const apiSucc = (res) => {
      if (res.success) setBuyerList(res.data || []);
    };
    apiBuyerFindAll(apiSucc);
  };

  const onChangeSelect = (e) => {
    const selected = e.target.value;
    if (selected === ADD_NEW_VALUE) {
      setShowCreateModal(true);
      return;
    }
    setValue(selected);
  };

  const onCreatedBuyer = (buyer) => {
    setBuyerList((prev) => [...prev, buyer]);
    setValue(String(buyer?.id));
  };

  return (
    <>
      <select value={value} onChange={onChangeSelect}>
        <option value="">선택</option>
        {buyerList?.map((b) => (
          <option key={b?.id} value={b?.id}>
            {b?.name}
          </option>
        ))}
        <option value={ADD_NEW_VALUE}>+) 발주처 추가하기</option>
      </select>

      {showCreateModal && <BuyerCreateModalCp onClose={() => setShowCreateModal(false)} onCreated={onCreatedBuyer} />}
    </>
  );
};

export default BuyerSelectCp;
