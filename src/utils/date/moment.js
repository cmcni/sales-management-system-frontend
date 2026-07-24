import moment from 'moment';

moment.locale('en', {
  week: {
    dow: 1, // 월요일을 첫 번째 요일로 지정 (0: 일요일, 1: 월요일, ..., 6: 토요일),
  },
});

export function getNoon() {
  const str = '12:00';
  return moment(str, 'HH:mm').format('HH:mm');
}
export function today(format = 'YYYY-MM-DD') {
  return moment().format(format);
}

export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(format);
}
export function formatTime(time, format = 'HH:mm', currentFormat = 'HH:mm') {
  return moment(time, currentFormat).format(format);
}
export function formatTimeShort(date, format1 = 'h', format2 = 'h:mm') {
  const isMinutes = moment(date).format('mm');
  if (isMinutes === '00') return moment(date).format(format1);
  else return moment(date).format(format2);
}

// [특정일]
export function startOf(date = '', type = 'week', format = 'YYYY-MM-DD HH:mm:ss') {
  const d = date ? moment(date) : moment();
  return d.startOf(type).format(format);
}
export function endOf(date = '', type = 'week', format = 'YYYY-MM-DD HH:mm:ss') {
  const d = date ? moment(date) : moment();
  return d.endOf(type).format(format);
}
export function startOfWeekIso(date = '', format = 'YYYY-MM-DD') {
  const d = date ? moment(date) : moment();
  const startOfWeek = moment(d).startOf('isoWeek').format(format);
  return startOfWeek;
}
export function startOfWeek(date = '', format = 'YYYY-MM-DD HH:mm:ss') {
  return startOf(date, 'week', format);
}
export function startOfMonth(date = '', format = 'YYYY-MM-DD HH:mm:ss') {
  return startOf(date, 'month', format);
}
export function endOfWeek(date = '', format = 'YYYY-MM-DD HH:mm:ss') {
  return endOf(date, 'week', format);
}
export function endOfMonth(date = '', format = 'YYYY-MM-DD HH:mm:ss') {
  return endOf(date, 'month', format);
}
export function EndOfAddMonth(date = '', count = 0, format = 'YYYY-MM-DD') {
  const d = date ? moment(date) : moment();
  return d.add(count, 'month').endOf('month').format(format);
}
export function startOfEndOfMonthByCalendar(_month = '', format = 'YYYY-MM-DD') {
  const month = _month - 1;
  const startOf = moment().month(month).startOf('month');
  const endOf = moment().month(month).endOf('month');

  const startOfByCalendar = startOf.startOf('isoWeek').format(format);
  const endOfByCalendar = endOf.endOf('isoWeek').format(format);
  return [startOfByCalendar, endOfByCalendar];
}

// [add]
export function addMonth(date, count, format = 'YYYY-MM-DD') {
  const d = date ? moment(date) : moment();
  return d.add(count, 'month').format(format);
}
export function addWeek(date, count, format = 'YYYY-MM-DD') {
  return moment(date).add(count, 'week').format(format);
}
export function addDate(date, count, format = 'YYYY-MM-DD') {
  return moment(date).add(count, 'days').format(format);
}
export function addTime(time, term, format = 'HH:mm', type = 'minutes') {
  return moment(time, 'hh:mm').add(term, type).format(format);
}
export function addTime2(date, term, type = 'm', format = 'YYYY-MM-DD HH:mm:ss') {
  const d = date ? moment(date) : moment();
  return d.add(term, type).format(format);
}
export function subtractTime(date, term, type = 'm', format = 'YYYY-MM-DD HH:mm:ss') {
  const d = date ? moment(date) : moment();
  return d.subtract(term, type).format(format);
}

// [between]
export function termMinutes(dt1, dt2) {
  const dt1F = moment(dt1);
  const dt2F = moment(dt2);
  const diff = dt2F.diff(dt1F); // 밀리초 단위의 차이

  const duration = moment.duration(diff);
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  return [days, hours, minutes];
}
export function termMinutesReturnMinutes(dt1, dt2) {
  const dt1F = moment(dt1);
  const dt2F = moment(dt2);
  const diff = dt2F.diff(dt1F, 'minutes'); // 밀리초 단위의 차이
  return diff;
}
export function diffWeek(date1 = '', date2) {
  const d1 = date1 ? moment(date1) : moment();
  const thisWeek = d1.startOf('isoWeek');
  const targetWeek = moment(date2).startOf('isoWeek');
  const diff = moment(thisWeek).diff(targetWeek, 'weeks');
  return diff === 0 ? 0 : moment(thisWeek).diff(targetWeek, 'weeks') * -1;
}

// [주차]
export const getWeekOfMonthDate = (dateP, formatMonth = 'MM', formatYaer = 'YYYY', targetDdd = 3) => {
  const result = {
    targetDate: '',
    addCount: 0,
    year: 0,
    month: 0,
    weekOfMonth: 0,
  };
  const date = moment(dateP);
  const _date = date.weekday(targetDdd); // 국제표준(목요일)
  const baseDays = _date.date();
  result.targetDate = formatDate(dateP, 'YYYY-MM-DD');

  const thisWeek = moment().startOf('isoWeek');
  const targetWeek = moment(date).startOf('isoWeek');
  const diff = moment(thisWeek).diff(targetWeek, 'weeks');
  result.addCount = diff === 0 ? 0 : moment(thisWeek).diff(targetWeek, 'weeks') * -1;

  const weekOfMonth = Math.ceil(baseDays / 7);

  result.year = date.format(formatYaer);
  result.month = date.format(formatMonth);
  result.weekOfMonth = weekOfMonth;
  return result;
};
export const getWeekOfMonthAddCount = (addCount = 0, formatMonth = 'MM', formatYaer = 'YYYY', targetDdd = 3) => {
  const date = moment().add(addCount, 'isoWeek');
  const resultDate = getWeekOfMonthDate(date, formatMonth, formatYaer, targetDdd);
  return { addCount, ...resultDate };
};
export const getWeekOfMonthBtween = (
  startDate = '',
  endDate = '',
  addCountMonthStart = 0,
  addCountMonthEnd = 0,
  formatMonth = 'MM',
  formatYaer = 'YYYY',
  targetDdd = 3
) => {
  const result = [];
  const firstDay = startDate ? moment(startDate) : moment().add(addCountMonthStart, 'month');
  const lastDay = endDate ? moment(endDate) : moment().add(addCountMonthEnd, 'month');
  let date = firstDay.clone().startOf('isoWeek');

  while (date.isSameOrBefore(lastDay, 'day')) {
    const weekOfMonth = getWeekOfMonthDate(date, formatMonth, formatYaer, targetDdd);
    result.push(weekOfMonth);
    date.add(1, 'week').startOf('isoWeek');
  }
  return result;
};

// [dates]
export const getDatesOfWeek = (targetDate, formatDates = 'YYYY-MM-DD') => {
  let result = {
    dates: [],
    baseDates: [],
    start: '',
    end: '',
  };
  const weekStart = moment(targetDate).startOf('isoWeek');
  const weekEnd = moment(targetDate).endOf('isoWeek');
  result.start = weekStart.format('YYYY-MM-DD');
  result.end = weekEnd.format('YYYY-MM-DD');

  let currentDate = weekStart.clone();
  while (currentDate.isSameOrBefore(weekEnd, 'day')) {
    result.dates.push(currentDate.format(formatDates));
    result.baseDates.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }
  return result;
};
export const getDatesOfMonth = (targetDate, formatDates = 'YYYY-MM-DD', formatMonth = 'MM', formatYaer = 'YYYY') => {
  const result = {
    year: 0,
    month: 0,
    dates: [],
    baseDates: [],
    start: '',
    end: '',
  };
  const startDate = moment(targetDate).startOf('month');
  const endDate = moment(targetDate).endOf('month');

  result.start = startDate.format('YYYY-MM-DD');
  result.end = endDate.format('YYYY-MM-DD');

  const dates = [];
  const baseDates = [];
  let currentDate = startDate.clone();
  while (currentDate.isSameOrBefore(endDate, 'day')) {
    dates.push(currentDate.format(formatDates));
    baseDates.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'day');
  }

  result.year = moment(targetDate).format(formatYaer);
  result.month = moment(targetDate).format(formatMonth);
  result.dates = dates;
  result.baseDates = baseDates;
  return result;
};
