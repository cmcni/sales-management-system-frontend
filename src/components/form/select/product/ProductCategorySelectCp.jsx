import React, { useState, useEffect } from 'react';
import { apiProductCategoryFindAll } from 'apis/product';
import ProductCategoryCreateModalCp from 'components/modal/product/ProductCategoryCreateModalCp';

const ADD_NEW_VALUE = '__ADD_NEW__';

function flattenTree(nodes, out = []) {
  nodes?.forEach((n) => {
    out.push(n);
    if (n.children?.length) flattenTree(n.children, out);
  });
  return out;
}

const ProductCategorySelectCp = ({ value, setValue }) => {
  const [tree, setTree] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    handleList();
  }, []);

  const handleList = () => {
    const apiSucc = (res) => {
      if (res.success) setTree(res.data || []);
    };
    apiProductCategoryFindAll(apiSucc);
  };

  const flatList = flattenTree(tree);

  const onChangeSelect = (e) => {
    const selected = e.target.value;
    if (selected === ADD_NEW_VALUE) {
      setShowCreateModal(true);
      return;
    }
    setValue(selected);
  };

  const onCreatedCategory = (category) => {
    handleList();
    setValue(String(category?.id));
  };

  return (
    <>
      <select value={value} onChange={onChangeSelect}>
        <option value="">선택</option>
        {flatList.map((c) => (
          <option key={c?.id} value={c?.id}>
            {'　'.repeat(c?.depth || 0)}
            {c?.depth ? '― ' : ''}
            {c?.name}
          </option>
        ))}
        <option value={ADD_NEW_VALUE}>+) 카테고리 추가하기</option>
      </select>

      {showCreateModal && (
        <ProductCategoryCreateModalCp onClose={() => setShowCreateModal(false)} onCreated={onCreatedCategory} />
      )}
    </>
  );
};

export default ProductCategorySelectCp;
