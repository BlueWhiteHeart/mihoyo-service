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
  async getTab() {
    const { ctx } = this;
    const data = await ctx.model.Forum.find();
    ctx.body = ctx.helper.response.succeedUtil({
      data,
    });
  }
  async createTab() {
    const { ctx } = this;
    console.log('创建数据');
    console.log(ctx.model);
    // const obj = {
    //   create_type: '0',
    //   created_at: new Date(),
    //   default_tab: 1,
    //   des: '米游社深度游戏内容讨论区',
    //   edit_post: '1',
    //   game_id: '2',
    //   header_image: '',
    //   icon: '',
    //   icon_pure: 'https://upload-bbs.mihoyo.com/upload/2021/04/29/1b52a2d09df5da2f936df6c8f2251d93.png',
    //   id: '50',
    //   max_top: '3',
    //   name: '硬核',
    //   order: '7',
    //   post_limit: '3',
    //   post_num: '0',
    //   post_order: 'reply',
    //   read_me: '旅行者您好，米游社硬核讨论区正式上线啦，硬核讨论区是米游社内的深度游戏内容讨论区，欢迎旅行者们在本区内交流讨论游戏内容。为保证旅行者们的浏览体验，本区内只讨论与游戏本身相关内容，拒绝水贴以及与游戏无关帖发布~\n此外，为了给旅行者们提供更好的浏览体验与交流环境，在本区内将会设置发帖和回帖的等级限制。\n发帖等级：游戏等级≥45，原神版区等级≥6\n回帖等级：原神版区等级≥6',
    //   reply_type: '1',
    //   show_type: '1',
    //   src_type: '0',
    //   today_post: '0',
    //   updated_at: new Date(),
    //   view_type: '1',
    //   visible: '1',
    // };
    // const data = ctx.model.Forum.create(obj);
    ctx.body = ctx.helper.response.succeedUtil();
  }
}

module.exports = HomeController;
