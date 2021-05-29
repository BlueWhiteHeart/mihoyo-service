'use strict';
const { Controller } = require('egg');

class BaseController extends Controller {
  // 成功响应
  succeedUtil(res) {
    this.ctx.body = Object.assign({ status: 'SUCCEED' }, res || {});
  }

  // 失败响应
  failedUtil(errorMessage, errorCode, data) {
    this.ctx.body = {
      status: 'FAILED',
      errorCode,
      errorMessage,
      data,
    };
  }
}

module.exports = BaseController;
