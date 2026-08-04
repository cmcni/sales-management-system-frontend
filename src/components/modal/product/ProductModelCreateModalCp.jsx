import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { apiProductModelCreate } from 'apis/product';

const ProductModelCreateModalCp = ({ categoryId, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [warning, setWarning] = useState('');

  const onClickSubmit = () => {
    if (!name.trim()) {
      setWarning('모델명을 입력해 주세요.');
      return;
    }

    const apiSucc = (res) => {
      if (res.success) {
        onCreated(res.data || [], name);
        onClose();
      } else {
        alert(res?.message || '모델 등록에 실패하였습니다.');
      }
    };
    apiProductModelCreate({ productCategoryId: Number(categoryId), name }, apiSucc);
  };

  return (
    <div className="buyer_modal_overlay">
      <div className="buyer_create_modal">
        <div className="buyer_create_header">
          <span>모델 추가</span>
          <button type="button" onClick={onClose}>
            <IoClose size={16} />
          </button>
        </div>

        <div className="buyer_create_body">
          <label>모델명</label>
          <input
            type="text"
            placeholder="모델명을 입력해 주세요."
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

export default ProductModelCreateModalCp;
