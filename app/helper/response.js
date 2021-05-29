'use strict';

module.exports = {
  // 成功响应
  succeedUtil(res) {
    console.log('响应成功');
    const obj = res || {};
    obj.status = 'SUCCEED';
    return obj;
  },
  // 失败响应
  failedUtil(errorMessage, errorCode, data) {
    return {
      status: 'FAILED',
      errorCode,
      errorMessage,
      data,
    };
  },
};
