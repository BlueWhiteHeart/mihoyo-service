'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 游戏产品表
  const Product = new Schema({
    name: { // 项目名称
      type: String,
      required: true,
    },
    number: { // 项目编号
      type: String,
      required: true,
    },
    type: { // 项目类型 eg: ACT,MOBA,FPS
      type: String,
    },
    icon: {
      type: 'String', // 项目小图标
    },
    totalSum: { // 项目总金额（含税）
      type: Number,
      default: 0,
    },
    module: [ // 下属那几个模块 eg：推荐，同人，COS
      {
        type: Schema.Types.ObjectId,
        ref: 'forum', // 关联的版块表
      },
    ],
    desc: { // 描述信息
      type: String,
    },
    receiveSum: { // 累计收入金额
      type: Number,
      default: 0,
    },
    normalUsers: [ // 普通用户
      {
        type: Schema.Types.ObjectId,
        ref: 'admin',
      },
    ],
    coreUsers: [ // 普通用户
      {
        type: Schema.Types.ObjectId,
        ref: 'admin',
      },
    ],
    richUsers: [ // 土豪用户
      {
        type: Schema.Types.ObjectId,
        ref: 'admin',
      },
    ],
    costSum: { // 累计成本费用
      type: Number,
      default: 0,
    },
    grossProfitSum: { // 总毛利金额
      type: Number,
      default: 0,
    },
    grossProfitRate: { // 总毛利率
      type: Number,
      default: 0,
    },
    createBy: { // 创造人
      ref: 'admin',
      type: Schema.Types.ObjectId,
    },
    updateBy: { // 更新人
      ref: 'admin',
      type: Schema.Types.ObjectId,
    },
    updateTimeBy: { // 最后操作时间
      type: Date,
    },
  }, {
    toObject: { getters: true },
    toJSON: { getters: true },
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  });

  return mongoose.model('product', Product);
};
