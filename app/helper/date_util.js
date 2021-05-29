'use strict';
const moment = require('moment');

function assignWeekDays(mo, defaultStatus) {
  const year = mo.year();
  const month = mo.month() + 1;
  const week = mo.isoWeek();
  const weeks = [];
  for (let i = 1; i <= 7; i++) {
    const d = mo.isoWeekday(i);
    weeks.push({
      date: d.format('YYYY-MM-DD'),
      week: '星期' + i,
      select: defaultStatus === undefined ? i <= 5 : defaultStatus,
    });
  }

  return {
    year,
    month,
    week,
    weeks,
  };
}

module.exports = () => {
  return {
    /**
     * 比较年月周是否相等
     * @param {number} year 年份
     * @param {number} month 月份
     * @param {number} week 年第几周
     * @return {boolean} 比较所传入的时间与当前时间是否相符
     */
    equalRuleDate(year, month, week) {
      const mo = moment().weekday(1);
      const y = mo.year();
      const m = mo.month() + 1;
      const w = mo.week();
      return (y === year && (m ? m === month : true) && w === week);
    },

    /**
     * 获取当前时间的 年份 月份 周[从周一到周天的日期]
     * @param {*} defaultWeek number 可以传入任意周来生成数据
     * @param {*} defaultStatus boolean 周一到周天的选中情况（不传递则为周一到周五默认选中）
     * @return {*} {year: number, month: number, week: number, weeks: Array}
     */
    getNowWeekDaysList(defaultWeek, defaultStatus) {
      const mo = defaultWeek ? moment().week(Number(defaultWeek)).weekday(1) : moment().weekday(1);
      return assignWeekDays(mo, defaultStatus);
    },
    getCrossYearWeekDaysList(mo, defaultStatus) {
      // const mo = moment().weekday(7);
      return assignWeekDays(mo, defaultStatus);
    },
    formatYMD(Date, format = 'YYYY-MM-DD') {
      if (Date) {
        return moment(Date).format(format);
      }
      return '';
    },
    formatYearMonth(y, m) {
      m = m.toString();
      return y.toString() + (m[ 1 ] ? m : '0' + m);
    },
  };
};

