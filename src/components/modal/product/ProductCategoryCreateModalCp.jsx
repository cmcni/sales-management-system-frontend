import React, { useState, useEffect, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { apiProductCategoryFindAll, apiProductCategoryCreate } from 'apis/product';

function flattenTree(nodes, out = []) {
  nodes?.forEach((n) => {
    out.push(n);
    if (n.children?.length) flattenTree(n.children, out);
  });
  return out;
}

const ProductCategoryCreateModalCp = ({ onClose, onCreated }) => {
  const [flatList, setFlatList] = useState([]);
  const [parentQuery, setParentQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);
  const [showChildInput, setShowChildInput] = useState(false);
  const [childName, setChildName] = useState('');
  const [warning, setWarning] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const apiSucc = (res) => {
      if (res.success) setFlatList(flattenTree(res.data || []));
    };
    apiProductCategoryFindAll(apiSucc);
  }, []);

  const suggestions = useMemo(() => {
    const query = parentQuery.trim();
    if (selectedParent || !query) return [];
    return flatList.filter((c) => c?.name?.includes(query));
  }, [flatList, parentQuery, selectedParent]);

  const onChangeParentQuery = (e) => {
    setParentQuery(e.target.value);
    setSelectedParent(null);
    if (warning) setWarning('');
  };

  const onClickSuggestion = (c) => {
    setSelectedParent(c);
    setParentQuery(c.name);
  };

  const onChangeChildName = (e) => {
    setChildName(e.target.value);
    if (warning) setWarning('');
  };

  const onClickSubmit = () => {
    if (!parentQuery.trim()) {
      setWarning('제품군 명을 입력해 주세요.');
      return;
    }
    if (showChildInput && !childName.trim()) {
      setWarning('하위 제품군 명을 입력해 주세요.');
      return;
    }

    const finishWithName = (submittedName) => (res) => {
      setSubmitting(false);
      if (res.success) {
        const createdId = res?.data?.id ?? res?.data;
        onCreated({ id: createdId, name: submittedName });
        onClose();
      } else {
        alert(res?.message || '제품군 등록에 실패하였습니다.');
      }
    };

    const createChildUnder = (parentId) => {
      apiProductCategoryCreate({ name: childName, parentId }, finishWithName(childName));
    };

    setSubmitting(true);

    if (showChildInput) {
      if (selectedParent) {
        createChildUnder(selectedParent.id);
      } else {
        apiProductCategoryCreate({ name: parentQuery, parentId: null }, (res) => {
          if (res.success) {
            const newParentId = res?.data?.id ?? res?.data;
            createChildUnder(newParentId);
          } else {
            setSubmitting(false);
            alert(res?.message || '제품군 등록에 실패하였습니다.');
          }
        });
      }
    } else if (selectedParent) {
      setSubmitting(false);
      onCreated(selectedParent);
      onClose();
    } else {
      apiProductCategoryCreate({ name: parentQuery, parentId: null }, finishWithName(parentQuery));
    }
  };

  return (
    <div className="buyer_modal_overlay">
      <div className="buyer_create_modal category_create_modal">
        <div className="buyer_create_header">
          <span>제품군 추가</span>
          <button type="button" onClick={onClose}>
            <IoClose size={16} />
          </button>
        </div>

        <div className="buyer_create_body">
          <label>제품군명</label>
          <input
            type="text"
            placeholder="제품군명을 입력해 주세요."
            value={parentQuery}
            onChange={onChangeParentQuery}
            autoComplete="off"
          />

          {suggestions.length > 0 && (
            <ul className="category_suggest_list">
              {suggestions.map((c) => (
                <li key={c.id} onClick={() => onClickSuggestion(c)}>
                  {c.name}
                </li>
              ))}
            </ul>
          )}

          {selectedParent && (
            <p className="category_selected_hint">기존 제품군 "{selectedParent.name}"를 부모로 사용합니다.</p>
          )}

          {!showChildInput ? (
            <button
              type="button"
              className="add_child_category_btn"
              onClick={() => setShowChildInput(true)}
              disabled={!parentQuery.trim()}
            >
              + 하위 제품군 추가
            </button>
          ) : (
            <>
              <label>하위 제품군명</label>
              <input
                type="text"
                placeholder="하위 제품군명을 입력해 주세요."
                value={childName}
                onChange={onChangeChildName}
                autoComplete="off"
              />
            </>
          )}

          {warning && <p>{warning}</p>}
        </div>

        <div className="buyer_create_footer">
          <button type="button" className="buyer_create_footer_btn" onClick={onClickSubmit} disabled={submitting}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCreateModalCp;
