import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const CommEntityCreateModalCp = ({ title, fieldLabel, createApi, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');

  const onClickSubmit = () => {
    if (!name.trim()) {
      setWarning(`${fieldLabel}을(를) 입력해 주세요.`);
      return;
    }

    const apiSucc = (res) => {
      if (res.success) {
        onCreated(res.data);
        onClose();
      } else {
        alert(res?.message || '등록에 실패하였습니다.');
      }
    };
    createApi({ name }, apiSucc);
  };

  return (
    <div className="buyer_modal_overlay">
      <div className="buyer_create_modal">
        <div className="buyer_create_header">
          <span>{title}</span>
          <button type="button" onClick={onClose}>
            <IoClose size={16} />
          </button>
        </div>

        <div className="buyer_create_body">
          <label>{fieldLabel}</label>
          <input
            type="text"
            placeholder={`${fieldLabel}을(를) 입력해 주세요.`}
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

export default CommEntityCreateModalCp;
