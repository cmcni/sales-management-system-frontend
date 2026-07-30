import React, { useState, useEffect } from 'react';
import { apiProductCategoryFindAll } from 'apis/product';

const CommCascadeCategorySelectCp = ({ title, setValue }) => {
  const [tree, setTree] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]);

  useEffect(() => {
    const apiSucc = (res) => {
      if (res.success) setTree(res.data || []);
    };
    apiProductCategoryFindAll(apiSucc);
  }, []);

  useEffect(() => {
    setValue(selectedPath.length ? String(selectedPath[selectedPath.length - 1]) : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPath]);

  const levels = [tree];
  let currentList = tree;
  for (const id of selectedPath) {
    const node = currentList.find((n) => String(n?.id) === String(id));
    if (!node || !node.children?.length) break;
    levels.push(node.children);
    currentList = node.children;
  }

  const onChangeLevel = (levelIndex) => (e) => {
    const newId = e.target.value;
    setSelectedPath((prev) => {
      const next = prev.slice(0, levelIndex);
      if (newId) next.push(newId);
      return next;
    });
  };

  return (
    <div className="search_item">
      <h3 className="FontS14">{title}</h3>
      <div className="cascade_select_row">
        {levels.map((list, i) => (
          <select key={i} value={selectedPath[i] || ''} onChange={onChangeLevel(i)}>
            <option value="">선택</option>
            {list?.map((n) => (
              <option key={n?.id} value={n?.id}>
                {n?.name}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default CommCascadeCategorySelectCp;
