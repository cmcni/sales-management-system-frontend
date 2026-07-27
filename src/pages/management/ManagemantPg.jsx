import React, { useState, useEffect } from 'react';
import LayoutCp from 'components/layout/LayoutCp';
import CommListTableCp from 'components/form/list/CommListTableCp';
import CommSelectBoxCp from 'components/form/search/CommSelectBoxCp';
import CommSearchDateCp from 'components/form/search/CommSearchDateCp';
import CommSearchTextInputCp from 'components/form/search/CommSearchTextInputCp';
import SalesReportModalCp from 'components/modal/SalesReportModalCp';
import { today, addDate } from 'utils/date/moment';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsFileEarmarkMinus, BsFileEarmarkPlus } from 'react-icons/bs';
import { CONST_INVOICE_TYPE, CONST_MANAGEMENT_TYPE } from 'utils/const/project';

const COLUMNS = [
  { key: 'no', label: '번호' },
  { key: 'contractDate', label: '계약일자' },
  { key: 'constructionName', label: '공사명' },
  { key: 'orderer', label: '발주처' },
  { key: 'supplyAmount', label: '공급가액' },
  { key: 'invoiceIssued', label: '계산서발행' },
  { key: 'production', label: '생산여부' },
  { key: 'shipment', label: '출고여부' },
  { key: 'deliveryDate', label: '납품일자' },
  { key: 'manager', label: '공사담당' },
];

const ManagemantPg = () => {
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(addDate(today(), 7));
  const [invoiceIssued, setInvoiceIssued] = useState('');
  const [constructionName, setConstructionName] = useState('');
  const [orderer, setOrderer] = useState('');
  const [division, setDivision] = useState('CONTRACT');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const onClickSearch = () => {
    const obj = { startDate, endDate, invoiceIssued, constructionName, orderer, division };
    console.log('[검색 조건]', obj);
  };

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(onClickSearch, 60 * 1000);
    return () => clearInterval(interval);
  }, [autoRefresh, startDate, endDate, invoiceIssued, constructionName, orderer, division]);

  return (
    <LayoutCp headerTitle="관리 리스트" button="close">
      <section className="content_body">
        <div className="search_bar">
          <CommSearchDateCp
            title={'기간'}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <CommSelectBoxCp
            title={'계산서 발행 여부'}
            value={invoiceIssued}
            setValue={setInvoiceIssued}
            rowData={CONST_INVOICE_TYPE}
            useNoneValue={true}
          />

          <CommSearchTextInputCp
            title={'공사명'}
            value={constructionName}
            setValue={setConstructionName}
            placeholder={'공사명을 입력해 주세요.'}
          />

          <CommSearchTextInputCp
            title={'발주처'}
            value={orderer}
            setValue={setOrderer}
            placeholder={'발주처를 입력해 주세요.'}
          />

          <CommSelectBoxCp
            title={'구분'}
            value={division}
            setValue={setDivision}
            rowData={CONST_MANAGEMENT_TYPE}
            useNoneValue={false}
          />

          <button className="search_btn" onClick={onClickSearch}>
            검색
          </button>

          <label className="auto_refresh">
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} />
            <span>1분마다 목록 자동 재검색</span>
          </label>

          <div className="action_btns">
            <button className="ghost_btn" onClick={onClickSearch}>
              <RiFileExcel2Line />
              저장
            </button>
            <button className="ghost_btn" onClick={() => setShowRegisterModal(true)}>
              <BsFileEarmarkPlus />
              신규
            </button>
            <button className="ghost_btn danger" onClick={onClickSearch}>
              <BsFileEarmarkMinus />
              삭제
            </button>
          </div>
        </div>
        <CommListTableCp columns={COLUMNS} data={[]} minRows={15} />
      </section>

      {showRegisterModal && <SalesReportModalCp onClose={() => setShowRegisterModal(false)} />}
    </LayoutCp>
  );
};

export default ManagemantPg;
