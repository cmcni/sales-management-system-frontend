import React, { useState } from 'react';

const CheckboxOneCp = () => {
  const [checked, setChecked] = useState(false);
  return (
    <section className="content_body">
      <h3>[checkbox] - [한개]</h3>
      <ul>
        <li>
          <label htmlFor="chkOne">
            <input type="checkbox" id="chkOne" checked={checked} onChange={(e) => setChecked(!checked)} />
            <span>체크박스</span>
          </label>
        </li>
      </ul>
    </section>
  );
};

export default CheckboxOneCp;
