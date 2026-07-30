import React from 'react';

const CommListTableCp = ({
  columns = [],
  data = [],
  minRows = 0,
  rowKey = 'id',
  selectable = false,
  selectedKeys = [],
  onChangeSelected,
}) => {
  const emptyRowCount = Math.max(minRows - data.length, 0);
  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;

  const onToggleAll = (e) => {
    onChangeSelected?.(e.target.checked ? data.map((row, ri) => row?.[rowKey] ?? ri) : []);
  };

  const onToggleRow = (key) => (e) => {
    if (e.target.checked) onChangeSelected?.([...selectedKeys, key]);
    else onChangeSelected?.(selectedKeys.filter((k) => k !== key));
  };

  return (
    <div className="comm_list_table">
      <table>
        <colgroup>
          {selectable && <col style={{ width: 40 }} />}
          {columns.map((col, i) => (
            <col key={'col_' + i} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {selectable && (
              <th>
                <input type="checkbox" checked={isAllSelected} onChange={onToggleAll} />
              </th>
            )}
            {columns.map((col, i) => (
              <th key={'th_' + i}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, ri) => {
            const key = row?.[rowKey] ?? ri;
            return (
              <tr key={key}>
                {selectable && (
                  <td>
                    <input type="checkbox" checked={selectedKeys.includes(key)} onChange={onToggleRow(key)} />
                  </td>
                )}
                {columns.map((col, ci) => (
                  <td key={'td_' + ri + '_' + ci}>{row?.[col.key]}</td>
                ))}
              </tr>
            );
          })}
          {Array.from({ length: emptyRowCount }).map((_, i) => (
            <tr key={'empty_' + i}>
              {selectable && <td>&nbsp;</td>}
              {columns.map((col, ci) => (
                <td key={'empty_td_' + i + '_' + ci}>&nbsp;</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommListTableCp;
