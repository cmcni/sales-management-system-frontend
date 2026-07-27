import React from 'react';

const CommListTableCp = ({ columns = [], data = [], minRows = 0, rowKey = 'id' }) => {
  const emptyRowCount = Math.max(minRows - data.length, 0);

  return (
    <div className="comm_list_table">
      <table>
        <colgroup>
          {columns.map((col, i) => (
            <col key={'col_' + i} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={'th_' + i}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, ri) => (
            <tr key={row?.[rowKey] ?? 'row_' + ri}>
              {columns.map((col, ci) => (
                <td key={'td_' + ri + '_' + ci}>{row?.[col.key]}</td>
              ))}
            </tr>
          ))}
          {Array.from({ length: emptyRowCount }).map((_, i) => (
            <tr key={'empty_' + i}>
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
