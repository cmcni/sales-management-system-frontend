import React, { useState, useEffect } from 'react';
import ProductModelCreateModalCp from 'components/modal/product/ProductModelCreateModalCp';

const ADD_NEW_VALUE = '__ADD_NEW__';

const ProductModelSelectCp = ({ value, setValue, categoryId, initialModels }) => {
  const [list, setList] = useState(initialModels || []);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setList(initialModels || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const onChangeSelect = (e) => {
    const selected = e.target.value;
    if (selected === ADD_NEW_VALUE) {
      setShowCreateModal(true);
      return;
    }
    setValue(selected);
  };

  const onCreatedModel = (models, createdName) => {
    setList(models);
    const matches = models.filter((m) => m?.name === createdName);
    const created = matches[matches.length - 1];
    setValue(created?.id ? String(created.id) : '');
  };

  return (
    <>
      <select value={value} onChange={onChangeSelect} disabled={!categoryId}>
        <option value="">{categoryId ? '선택' : '제품군을 먼저 선택해 주세요.'}</option>
        {list?.map((m) => (
          <option key={m?.id} value={m?.id}>
            {m?.name}
          </option>
        ))}
        {categoryId && <option value={ADD_NEW_VALUE}>+) 모델 추가하기</option>}
      </select>

      {showCreateModal && (
        <ProductModelCreateModalCp
          categoryId={categoryId}
          onClose={() => setShowCreateModal(false)}
          onCreated={onCreatedModel}
        />
      )}
    </>
  );
};

export default ProductModelSelectCp;
