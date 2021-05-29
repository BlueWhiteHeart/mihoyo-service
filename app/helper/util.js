'use strict';
module.exports = {
  // type 转换成$match格式
  searchParamsClearEmptyValue(params, type) {
    const $and = [];
    for (const key in params) {
      if (params[ key ] === '' || params[ key ] === undefined) {
        delete params[ key ];
      }
      if (type === 'match') {
        const value = params[ key ];
        $and.push({ [ key ]: { $in: value } });
      }
    }
    if (type) {
      return {
        $and,
      };
    }
  },

  changeArraySearch(params) {
    for (const item in params) {
      if (Array.isArray(params[ item ])) {
        params[ item ] = { $in: params[ item ] };
      }
    }
  },

  /**
   * 转换数组内部类型
   * @param {string|array} params 数据
   * @param {string} type 需要转换的类型
   * @param {*} config 自定义类型
   * @return {Array} 返回整理的数组
   */
  arrayType(params, type, config) {
    const data = Array.isArray(params) ? params : params.split(',');
    if (config) {
      return data.map(item => [ config ](item));
    }
    let computedData;
    switch (type) {
      case 'number':
        computedData = data.map(item => parseInt(item));
        break;
      default:
        computedData = data;
        break;
    }
    return computedData;
  },

  /**
   * 处理失去精度
   * @param {number} float 小数
   * @return {number} 处理失精后的小数
   */
  handleFloat(float) {
    return parseFloat(float.toFixed(10));
  },

  /**
   * 通过最新已轧账年月计算待轧账年月
   * @param {object} last 最新轧账年月
   * @return {object} 对象
   */
  awaitAccounts(last) {
    const awaitDate = {};
    if (last) {
      if (Number(last.month) === 12) {
        awaitDate.year = Number(last.year) + 1;
        awaitDate.month = 1;
      } else {
        awaitDate.year = Number(last.year);
        awaitDate.month = Number(last.month) + 1;
      }
    } else {
      if (new Date().getMonth() === 0) { // 如果启动月份在明年1月份
        // 跨年1月份
        awaitDate.year = new Date().getFullYear() - 1;
        awaitDate.month = 12;
      } else {
        awaitDate.year = new Date().getFullYear();
        awaitDate.month = new Date().getMonth();
      }
    }
    return awaitDate;
  },
};
