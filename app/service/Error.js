'use strict';
const BaseService = require('../base/BaseService');

class ErrorService extends BaseService {
  async sendError(objArr) {
    const { ctx } = this;
    const newArr = [];
    objArr.forEach(e => {
      let reasonType = null;
      let mainReason = null;
      if (e.paddingMessage) {
        let arr = null;
        arr = e.message.split(': ');
        reasonType = arr[0].split('.')[1];
        mainReason = arr[1];
      }
      const obj = {
        ifInteraction: Boolean(e.paddingMessage) || false, // 是否属于用户的交互错误
        paddingMessage: e.paddingMessage || null,
        date: e.date && (new Date(e.date.split(',')[0]) || null),
        hostname: e.hostname || null,
        level: e.level || null,
        detailMessage: e.message || null,
        reasonType,
        mainReason,
      };
        //   console.log('--------------------------------------------');
        //   console.log(obj);
        //   console.log('--------------------------------------------');
      newArr.push(obj);
    });
    // await ctx.model.Error.insertMany(newArr);
  }

}

module.exports = ErrorService;
