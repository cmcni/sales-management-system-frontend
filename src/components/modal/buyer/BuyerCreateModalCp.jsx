import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { apiBuyerCreate } from 'apis/buyer';

const BuyerCreateModalCp = ({ onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');

  const onClickSubmit = () => {
    if (!name.trim()) {
      setWarning('발주처명을 입력해 주세요.');
      return;
    }

    const apiSucc = (res) => {
      if (res.success) {
        onCreated(res.data);
        onClose();
      } else {
        alert(res?.message || '발주처 등록에 실패하였습니다.');
      }
    };
    apiBuyerCreate({ name }, apiSucc);
  };

  return (
    <div className="buyer_modal_overlay">
      <div className="buyer_create_modal">
        <div className="buyer_create_header">
          <span>발주처 추가</span>
          <button type="button" onClick={onClose}>
            <IoClose size={16} />
          </button>
        </div>

        <div className="buyer_create_body">
          <label>발주처명</label>
          <input
            type="text"
            placeholder="발주처명을 입력해 주세요."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (warning) setWarning('');
            }}
          />
          {warning && <p>{warning}</p>}
        </div>

        <div className="buyer_create_footer">
          <button type="button" className="buyer_create_footer_btn" onClick={onClickSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerCreateModalCp;
