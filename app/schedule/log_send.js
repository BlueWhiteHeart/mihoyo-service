'use strict';
// 定时任务 每天检查 日志存储
const fs = require('fs');
module.exports = () => {
  return {
    schedule: {
      cron: '0 0 9 1 1-12 ?',
      //   interval: '5s',
      type: 'worker', // 指定所有的 worker 都需要执行
      immediate: true,
    },
    async task(ctx) {
      // console.log('发送定时任务');
      const baseDir = process.cwd() + '/logs/mihoyo/common-error.json.log';
      const date = fs.readFileSync(baseDir, 'utf-8');
      const objArr = [];
      try {
        const arr = date.split('\n');
        arr.forEach(e => {
          if (e.indexOf('}') > -1) { // 这一条数据必须完整
            objArr.push(JSON.parse((e)));
          }
        });
        await ctx.service.error.sendError(objArr);
      } catch (error) {
        console.log(String(error).split(': '));
      }
      console.log('发送定时任务');
    },
  };
};

