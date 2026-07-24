import { formatDate, addTime } from 'utils/date/moment';

//=================================[Array]=======================================
//[sort]
export const sortArrayObjectAsc = (_data, sortKey) => {
  _data.sort((a, b) => a[sortKey] - b[sortKey]);
  return _data;
};

//[DateTime]
export function timeListWithTerm(termP, startTimeP, finishTimeP) {
  if (!termP | !startTimeP | !finishTimeP) return [];

  const term = Number(termP);
  const today = formatDate(new Date(), 'YYYY-MM-DD');
  const _formatDate = (time) => today + ' ' + time;

  const timeList = [];
  let forT = formatDate(_formatDate(startTimeP), 'HH:mm');
  const endT = _formatDate(addTime(finishTimeP, -term));

  while (_formatDate(forT) <= endT) {
    timeList.push(forT);
    forT = addTime(forT, term);
  }
  return timeList;
}

//====================================[Object]====================================
//[isNull]
export const isNullObject = (obj) => {
  return !obj || JSON.stringify(obj) === '{}';
};

//====================================[Calculation]====================================
//[overlab dateTime]
export function overlabDateTime(start1Param, end1Param, start2Param, end2Param, format = 'YYYY-MM-DD HH:mm:ss') {
  const start1 = formatDate(start1Param, format);
  const end1 = formatDate(end1Param, format);

  const start2 = formatDate(start2Param, format);
  const end2 = formatDate(end2Param, format);

  if (start1 < end2 && end1 > start2) return true;
  else return false;
}
