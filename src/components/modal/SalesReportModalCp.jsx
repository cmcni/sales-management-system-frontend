import React, { useState } from 'react';
import { IoIosClose, IoIosSquareOutline, IoMdClose, IoMdSquareOutline } from 'react-icons/io';
import { MdMinimize } from 'react-icons/md';
import { CONST_MANAGEMENT_TYPE } from 'utils/const/project';

const initForm = {
  orderer: '',
  constructionName: '',
  contractDone: false,
  contractDate: '',
  contractAmount: '',
  contractRate: '',
  constructionPeriodStart: '',
  salesManager: '',
  constructionPeriodEnd: '',
  paymentMethod: '',
  deliveryMethod: '',
  orderDate: '',
  companyName: '',
  etc: '',
  deliveryConstructionDate: '',
  receivePlace: '',
  constructionManagerTel: '',
  receiver: '',
  fieldManagerTel: '',
  receiverTel: '',
  purchaseType: '',
  middlePayment: '',
  collectedAmount: '',
  collectionDueDate: '',
  taxInvoiceDate: '',
};

const SalesReportModalCp = ({ onClose }) => {
  const [division, setDivision] = useState('CONTRACT');
  const [form, setForm] = useState(initForm);

  const onChangeField = (key) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="modal_overlay">
      <div className="sales_report_modal">
        <div className="sales_report_titlebar">
          <span>세일즈 리포트</span>
          <div className="win_controls">
            <button type="button">
              <MdMinimize size={15} />
            </button>
            <button type="button">
              <IoMdSquareOutline size={15} />
            </button>
            <button type="button" onClick={onClose}>
              <IoMdClose size={15} />
            </button>
          </div>
        </div>

        <div className="sales_report_body">
          <nav className="sales_report_tabs">
            <div className="tab_title">구분</div>
            {Object.values(CONST_MANAGEMENT_TYPE)?.map((d) => (
              <button
                key={d.value}
                type="button"
                className={division === d.value ? 'active' : ''}
                onClick={() => setDivision(d.value)}
              >
                {d.label}
              </button>
            ))}
          </nav>

          <div className="sales_report_main">
            {/* <h2>세일즈 레포트</h2> */}

            <div className="sales_report_actions">
              <button type="button">
                <span>CD</span>
              </button>
              <button type="button">
                <span>저장</span>
              </button>
              {/* <button type="button" onClick={onClose}>
                <span>닫기</span>
              </button> */}
            </div>

            <div className="sales_report_section_title">영업부</div>
            <div className="sales_report_grid">
              <div className="sr_field">
                <label>발주처</label>
                <input type="text" value={form.orderer} onChange={onChangeField('orderer')} />
              </div>
              <div className="sr_field">
                <label>공사명</label>
                <input type="text" value={form.constructionName} onChange={onChangeField('constructionName')} />
              </div>
              <div className="sr_field checkbox_field">
                <input type="checkbox" checked={form.contractDone} onChange={onChangeField('contractDone')} />
                <label>완료</label>
              </div>

              <div className="sr_field">
                <label>계약일</label>
                <input type="date" value={form.contractDate} onChange={onChangeField('contractDate')} />
              </div>
              <div className="sr_field">
                <label>계약금액</label>
                <input type="text" value={form.contractAmount} onChange={onChangeField('contractAmount')} />
              </div>
              <div className="sr_field">
                <label>계약금율</label>
                <input type="text" value={form.contractRate} onChange={onChangeField('contractRate')} />
              </div>

              <div className="sr_field">
                <label>공사기간(시작)</label>
                <input
                  type="date"
                  value={form.constructionPeriodStart}
                  onChange={onChangeField('constructionPeriodStart')}
                />
              </div>
              <div className="sr_field">
                <label>영업담당자</label>
                <input type="text" value={form.salesManager} onChange={onChangeField('salesManager')} />
              </div>
              <div className="sr_field">
                <label>공사기간(종료)</label>
                <input
                  type="date"
                  value={form.constructionPeriodEnd}
                  onChange={onChangeField('constructionPeriodEnd')}
                />
              </div>

              <div className="sr_field">
                <label>대금결제방법</label>
                <select value={form.paymentMethod} onChange={onChangeField('paymentMethod')}>
                  <option value="">선택</option>
                  <option value="CASH">현금</option>
                  <option value="TRANSFER">계좌이체</option>
                </select>
              </div>
              <div className="sr_field">
                <label>배송방법</label>
                <select value={form.deliveryMethod} onChange={onChangeField('deliveryMethod')}>
                  <option value="">선택</option>
                  <option value="DIRECT">직송(창고)</option>
                  <option value="TRUCK">화물</option>
                </select>
              </div>
              <div className="sr_field">
                <label>발주일</label>
                <input type="date" value={form.orderDate} onChange={onChangeField('orderDate')} />
              </div>

              <div className="sr_field">
                <label>회사명</label>
                <input type="text" value={form.companyName} onChange={onChangeField('companyName')} />
              </div>
              <div className="sr_field">
                <label>납품/시공일자</label>
                <input
                  type="date"
                  value={form.deliveryConstructionDate}
                  onChange={onChangeField('deliveryConstructionDate')}
                />
              </div>
              <div className="sr_field">
                <label>물품수령지</label>
                <input type="text" value={form.receivePlace} onChange={onChangeField('receivePlace')} />
              </div>

              <div className="sr_field full">
                <label>기타사항</label>
                <textarea value={form.etc} onChange={onChangeField('etc')} />
              </div>

              <div className="sr_field">
                <label>공사담당자(TEL)</label>
                <input
                  type="text"
                  value={form.constructionManagerTel}
                  onChange={onChangeField('constructionManagerTel')}
                />
              </div>
              <div className="sr_field">
                <label>물품수령자</label>
                <input type="text" value={form.receiver} onChange={onChangeField('receiver')} />
              </div>
              <div className="sr_field">
                <label>현장담당자(TEL)</label>
                <input type="text" value={form.fieldManagerTel} onChange={onChangeField('fieldManagerTel')} />
              </div>

              <div className="sr_field">
                <label>물품수령자(TEL)</label>
                <input type="text" value={form.receiverTel} onChange={onChangeField('receiverTel')} />
              </div>
            </div>

            <div className="sales_report_section_title">관리부</div>
            <div className="sales_report_grid">
              <div className="sr_field">
                <label>매입구분</label>
                <select value={form.purchaseType} onChange={onChangeField('purchaseType')}>
                  <option value="">선택</option>
                  <option value="PURCHASE">매입</option>
                  <option value="SALE">매매</option>
                </select>
              </div>
              <div className="sr_field">
                <label>중도금</label>
                <input type="text" value={form.middlePayment} onChange={onChangeField('middlePayment')} />
              </div>
              <div className="sr_field">
                <label>수금액</label>
                <input type="text" value={form.collectedAmount} onChange={onChangeField('collectedAmount')} />
              </div>

              <div className="sr_field">
                <label>수금 예정일</label>
                <input type="date" value={form.collectionDueDate} onChange={onChangeField('collectionDueDate')} />
              </div>
              <div className="sr_field">
                <label>세금계산서발행일자</label>
                <input type="date" value={form.taxInvoiceDate} onChange={onChangeField('taxInvoiceDate')} />
              </div>
            </div>

            <div className="sales_report_bottom_actions">
              <button type="button">
                <span className="badge a">A</span>
                <span className="label">제품가격</span>
              </button>
              <button type="button">
                <span className="badge b">B</span>
                <span className="label">자재발주</span>
              </button>
              <button type="button">
                <span className="badge c">C</span>
                <span className="label">수주보고서</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportModalCp;
