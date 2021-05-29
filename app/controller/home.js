'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log('进入');
    ctx.body = 'hi, egg';
  }
  async test() {
    const { ctx } = this;
    console.log('进入测试');
    console.log(ctx.helper);
    console.log('进入测试');
    ctx.body = ctx.helper.response.succeedUtil();
  }
}

module.exports = HomeController;
