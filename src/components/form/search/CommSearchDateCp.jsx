import React from 'react';

const CommSearchDateCp = ({ startDate, endDate, setStartDate, setEndDate, title }) => {
  return (
    <div className="search_item">
      <h3 className="FontS14">{title}</h3>
      <div className="search_date_range">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span>~</span>
        <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
    </div>
  );
};

export default CommSearchDateCp;
