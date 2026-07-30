export const CONST_YN = {
  Y: { label: 'Y', value: 'Y' },
  N: { label: 'N', value: 'N' },
};

export const CONST_INVOICE_TYPE = {
  ISSUED: { label: '계산서발행', value: 'ISSUED' },
  NOT_ISSUED: { label: '미발행', value: 'NOT_ISSUED' },
  NON_SALES: { label: '비매출', value: 'NON_SALES' },
  SPLIT_ISSUED: { label: '분할 발행', value: 'SPLIT_ISSUED' },
};

export const CONST_MANAGEMENT_TYPE = {
  CONTRACT: { label: '계약', value: 'CONTRACT' },
  PRE_ORDER: { label: '선발주', value: 'PRE_ORDER' },
};

// 대금결제 (결제 방법)
export const CONST_PAYMENT_TYPE = {
  INVOICE: { label: '계산서발행', value: 'INVOICE' },
  CARD: { label: '카드', value: 'CARD' },
  BANK_DEPOSIT: { label: '통장입금', value: 'BANK_DEPOSIT' },
  NONE: { label: '결제없음', value: 'NONE' },
};

// 배송방법
export const CONST_DELIVERY_TYPE = {
  ROZEN_PREPAID: { label: '로젠(선불)', value: 'ROZEN_PREPAID' },
  KYUNGDONG_PREPAID: { label: '경동(선불)', value: 'KYUNGDONG_PREPAID' },
  COURIER: { label: '용달', value: 'COURIER' },
  DIRECT: { label: '직접배송', value: 'DIRECT' },
  NONE: { label: '배송없음', value: 'NONE' },
};

// 매출구분
export const SALES_TYPE = {
  SALE: { label: '판매', value: 'SALE' },
  INSTALL: { label: '설치', value: 'INSTALL' },
  CONSTRUCTION: { label: '공사', value: 'CONSTRUCTION' },
  CONSUMABLE: { label: '소모품', value: 'CONSUMABLE' },
  PAID_AS: { label: '유상AS', value: 'PAID_AS' },
  MAINTENANCE: { label: '유지보수', value: 'MAINTENANCE' },
  ETC_ACCIDENT: { label: '기타(사고)', value: 'ETC_ACCIDENT' },
  OPERATION: { label: '운영사업', value: 'OPERATION' },
  INSTALLMENT: { label: '할부판매', value: 'INSTALLMENT' },
  INTEGRATED_CONTROL: { label: '통합관제', value: 'INTEGRATED_CONTROL' },
  SHARED_ENTRANCE: { label: '공동현관', value: 'SHARED_ENTRANCE' },
  PAYMENT_MANAGEMENT: { label: '입금관리', value: 'PAYMENT_MANAGEMENT' },
};
