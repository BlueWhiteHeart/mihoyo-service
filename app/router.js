'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  router.get('/getTab', controller.home.getTab); // 获取tab相关的数据
  router.get('/createTab', controller.home.createTab); // 创建一条模拟数据
};
