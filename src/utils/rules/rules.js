export const RULES = Object.freeze({
  required: (v) => !!v,
  number: (v) => (!v ? v : v.replace(/\D/g, '')),
  numberLimit: (v, limitNumber) => {
    const regex = new RegExp('^\\d{' + limitNumber + '}$');
    return regex.test(v);
  },

  // 빈값이 아니면서 영문 이메일 형식
  email: (v) => /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
  phone: (v) => !v || /^\d{10}$/.test(v),
  date_yyyymmdd: (v) => /^\d{4}[-.]\d{2}[-.]\d{2}$/.test(v),
  deleted_hyphen: (v) => (!v ? v : v.replace(/\-/g, '')),
  // 영문,숫자 포함 8자 이상
  password: (v) => /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(v),
});

export const funcRuleDate = (v) => RULES.date_yyyymmdd(v);
export const funcRuleEmail = (v) => RULES.email(v);
export const funcRulePassword = (v) => RULES.password(v);

export const funcRuleNumberLimit = (v, limitNumber) => RULES.numberLimit(v, limitNumber);
export function funcOnChangeNumberLimit(event, limitNumber) {
  const inputValue = event.target.value;
  const numericValue = inputValue.replace(/\D/g, ''); // 숫자만 추출

  if (numericValue.length > limitNumber) {
    event.target.value = numericValue.slice(0, limitNumber); // limitNumbe 글자까지만 유지
  } else {
    event.target.value = numericValue; // 숫자 값 유지
  }
}
