import React, { useEffect, useState } from 'react';
import LayoutCp from 'components/layout/LayoutCp';
import CommListTableCp from 'components/form/list/CommListTableCp';
import CommSearchTextInputCp from 'components/form/search/CommSearchTextInputCp';
import CommCascadeCategorySelectCp from 'components/form/select/common/CommCascadeCategorySelectCp';
import CommEntitySelectCp from 'components/form/select/common/CommEntitySelectCp';
import ProductCreateModalCp from 'components/modal/product/ProductCreateModalCp';
import { RiFileExcel2Line } from 'react-icons/ri';
import { BsFileEarmarkPlus, BsFileEarmarkMinus } from 'react-icons/bs';
import { apiProductSearch, apiProductModelFindAll, apiProductDelete, apiProductExportExcel } from 'apis/product';
import { today } from 'utils/date/moment';

const buildCategoryPath = (category) => {
  const names = [];
  let node = category;
  while (node) {
    names.push(node.name);
    node = node.children?.[0];
  }
  return names.join(' > ');
};

const COLUMNS = [
  { key: 'productGroup', label: '제품군' },
  { key: 'productName', label: '제품명' },
  { key: 'modelName', label: '모델명' },
  { key: 'recommendedPrice', label: '권장 판매 단가' },
  { key: 'note', label: '비고' },
  { key: 'createdAt', label: '등록일' },
];

const ProductListPg = () => {
  const [productGroup, setProductGroup] = useState('');
  const [productName, setProductName] = useState('');
  const [modelName, setModelName] = useState('');
  const [recommendedPrice, setRecommendedPrice] = useState('');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    onClickSearch();
  }, []);

  const buildSearchParams = () => {
    const params = {};
    if (productGroup) params.productCategoryId = productGroup;
    if (modelName) params.productModelId = modelName;
    if (productName) params.productModelName = productName;
    if (recommendedPrice) params.productRecommendedSellingPrice = recommendedPrice;
    return params;
  };

  const onClickSearch = () => {
    const apiSucc = (res) => {
      if (res.success) {
        const rows = (res?.data || []).map((p) => ({
          productId: p?.productId,
          productGroup: buildCategoryPath(p?.productCategory),
          productName: p?.name || '',
          modelName: p?.productModel?.name || '',
          recommendedPrice: p?.recommendedSellingPrice?.toLocaleString() || '',
          note: p?.note || '',
          createdAt: p?.createdAt ? p.createdAt.replace('T', ' ').slice(0, 16) : '',
        }));
        setData(rows);
        setSelectedIds([]);
      }
    };
    apiProductSearch(buildSearchParams(), apiSucc);
  };

  const onClickDownload = () => {
    const apiSucc = (res) => {
      if (!res.success) {
        alert(res.message || '엑셀 다운로드에 실패하였습니다.');
        return;
      }
      const disposition = res.headers?.['content-disposition'];
      const filenameMatch = disposition?.match(/filename\*?=(?:UTF-8''|")?([^;"\n]+)/i);
      const filename = filenameMatch ? decodeURIComponent(filenameMatch[1].replace(/"/g, '')) : `제품목록_${today()}.xlsx`;

      const url = window.URL.createObjectURL(new Blob([res.blob]));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    };
    apiProductExportExcel(buildSearchParams(), apiSucc);
  };

  const onClickDelete = () => {
    if (selectedIds.length === 0) {
      alert('삭제할 항목을 선택해 주세요.');
      return;
    }
    if (!window.confirm(`선택한 ${selectedIds.length}건을 삭제하시겠습니까?`)) return;

    let remaining = selectedIds.length;
    let failCount = 0;

    selectedIds.forEach((productId) => {
      apiProductDelete(productId, (res) => {
        if (!res.success) failCount += 1;
        remaining -= 1;
        if (remaining === 0) {
          if (failCount > 0) alert(`${failCount}건 삭제에 실패했습니다.`);
          onClickSearch();
        }
      });
    });
  };

  return (
    <LayoutCp headerTitle="제품 목록" button="close">
      <section className="content_body">
        <div className="search_bar">
          <CommCascadeCategorySelectCp title={'제품군'} value={productGroup} setValue={setProductGroup} />

          <CommSearchTextInputCp
            title={'제품명'}
            value={productName}
            setValue={setProductName}
            placeholder={'제품명을 입력해 주세요.'}
          />

          <div className="search_item">
            <h3 className="FontS14">모델명</h3>
            <CommEntitySelectCp
              value={modelName}
              setValue={setModelName}
              fetchApi={apiProductModelFindAll}
              fieldLabel="모델명"
              modalTitle="모델 추가"
            />
          </div>

          <CommSearchTextInputCp
            title={'권장 판매 단가'}
            value={recommendedPrice}
            setValue={setRecommendedPrice}
            placeholder={'권장 판매 단가를 입력해 주세요.'}
          />

          <button className="search_btn" onClick={onClickSearch}>
            검색
          </button>

          <div className="action_btns">
            <button className="ghost_btn" onClick={onClickDownload}>
              <RiFileExcel2Line />
              다운로드
            </button>
            <button className="ghost_btn" onClick={() => setShowCreateModal(true)}>
              <BsFileEarmarkPlus />
              신규
            </button>
            <button className="ghost_btn danger" onClick={onClickDelete}>
              <BsFileEarmarkMinus />
              삭제
            </button>
          </div>
        </div>

        <span className="list_count">조회 {data.length}건</span>
        <CommListTableCp
          columns={COLUMNS}
          data={data}
          rowKey="productId"
          selectable
          selectedKeys={selectedIds}
          onChangeSelected={setSelectedIds}
        />
      </section>

      {showCreateModal && <ProductCreateModalCp onClose={() => setShowCreateModal(false)} onCreated={onClickSearch} />}
    </LayoutCp>
  );
};

export default ProductListPg;
