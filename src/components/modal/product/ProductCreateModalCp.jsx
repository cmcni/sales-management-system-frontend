import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import CommEntitySelectCp from 'components/form/select/common/CommEntitySelectCp';
import ProductCategorySelectCp from 'components/form/select/product/ProductCategorySelectCp';
import { apiProductCreate, apiProductModelFindAll, apiProductModelCreate } from 'apis/product';

const initForm = {
  productModelId: '',
  productCategoryId: '',
  name: '',
  note: '',
  recommendedSellingPrice: '',
};

const ProductCreateModalCp = ({ onClose, onCreated }) => {
  const [form, setForm] = useState(initForm);
  const [warnings, setWarnings] = useState({});

  const setField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (warnings[key]) setWarnings((prev) => ({ ...prev, [key]: '' }));
  };

  const onChangeInput = (key) => (e) => setField(key)(e.target.value);

  const onClickSubmit = () => {
    const nextWarnings = {
      productModelId: form.productModelId ? '' : '모델명을 선택해 주세요.',
      productCategoryId: form.productCategoryId ? '' : '제품군을 선택해 주세요.',
      name: form.name.trim() ? '' : '제품명을 입력해 주세요.',
      recommendedSellingPrice: form.recommendedSellingPrice !== '' ? '' : '권장 판매 단가를 입력해 주세요.',
    };
    setWarnings(nextWarnings);
    if (Object.values(nextWarnings).some((v) => v)) return;

    const obj = {
      productModelId: Number(form.productModelId),
      productCategoryId: Number(form.productCategoryId),
      name: form.name,
      note: form.note,
      recommendedSellingPrice: Number(form.recommendedSellingPrice),
    };

    const apiSucc = (res) => {
      if (res.success) {
        onCreated?.(res.data);
        onClose();
      } else {
        alert(res?.message || '제품 등록에 실패하였습니다.');
      }
    };
    apiProductCreate(obj, apiSucc);
  };

  return (
    <div className="buyer_modal_overlay">
      <div className="buyer_create_modal product_create_modal">
        <div className="buyer_create_header">
          <span>제품 등록</span>
          <button type="button" onClick={onClose}>
            <IoClose size={16} />
          </button>
        </div>

        <div className="product_create_grid">
          <div className="sr_field">
            <label>제품군</label>
            <ProductCategorySelectCp value={form.productCategoryId} setValue={setField('productCategoryId')} />
            {warnings.productCategoryId && <p className="warning_text">{warnings.productCategoryId}</p>}
          </div>

          <div className="sr_field">
            <label>제품명</label>
            <input type="text" value={form.name} onChange={onChangeInput('name')} />
            {warnings.name && <p className="warning_text">{warnings.name}</p>}
          </div>

          <div className="sr_field">
            <label>모델명</label>
            <CommEntitySelectCp
              value={form.productModelId}
              setValue={setField('productModelId')}
              fetchApi={apiProductModelFindAll}
              createApi={apiProductModelCreate}
              addNewLabel="+) 모델 추가하기"
              fieldLabel="모델명"
              modalTitle="모델 추가"
            />
            {warnings.productModelId && <p className="warning_text">{warnings.productModelId}</p>}
          </div>

          <div className="sr_field">
            <label>권장 판매 단가</label>
            <input
              type="number"
              value={form.recommendedSellingPrice}
              onChange={onChangeInput('recommendedSellingPrice')}
            />
            {warnings.recommendedSellingPrice && <p className="warning_text">{warnings.recommendedSellingPrice}</p>}
          </div>

          <div className="sr_field full">
            <label>비고</label>
            <textarea value={form.note} onChange={onChangeInput('note')} />
          </div>
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

export default ProductCreateModalCp;
