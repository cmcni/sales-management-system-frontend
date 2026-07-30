import React, { useState, useEffect } from 'react';
import CommEntityCreateModalCp from 'components/modal/common/CommEntityCreateModalCp';

const ADD_NEW_VALUE = '__ADD_NEW__';

const CommEntitySelectCp = ({ value, setValue, fetchApi, createApi, addNewLabel, fieldLabel, modalTitle }) => {
  const [list, setList] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const apiSucc = (res) => {
      if (res.success) setList(res.data || []);
    };
    fetchApi(apiSucc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allowCreate = !!createApi;

  const onChangeSelect = (e) => {
    const selected = e.target.value;
    if (selected === ADD_NEW_VALUE) {
      setShowCreateModal(true);
      return;
    }
    setValue(selected);
  };

  const onCreatedEntity = (entity) => {
    setList((prev) => [...prev, entity]);
    setValue(String(entity?.id));
  };

  return (
    <>
      <select value={value} onChange={onChangeSelect}>
        <option value="">선택</option>
        {list?.map((d) => (
          <option key={d?.id} value={d?.id}>
            {d?.name}
          </option>
        ))}
        {allowCreate && <option value={ADD_NEW_VALUE}>{addNewLabel}</option>}
      </select>

      {allowCreate && showCreateModal && (
        <CommEntityCreateModalCp
          title={modalTitle}
          fieldLabel={fieldLabel}
          createApi={createApi}
          onClose={() => setShowCreateModal(false)}
          onCreated={onCreatedEntity}
        />
      )}
    </>
  );
};

export default CommEntitySelectCp;
