'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const Error = new Schema({
    paddingMessage: { // 请求信息
      type: String,
    },
    level: { // 错误级别
      type: String,
    },
    date: { // 错误发生时间
      type: Date,
    },
    year: { // 错误发生的年
      type: Number,
    },
    month: { // 错误发生的月份
      type: Number,
    },
    day: { // 错误发送的天paddingMessage
      type: Number,
    },
    user: { // 谁发生的错误
      ref: 'admin',
      type: Schema.Types.ObjectId,
      default: null,
    },
    hostname: { // 来源设备
      type: String,
    },
    errorType: { // 错误类型
      type: String,
    },
    ifInteraction: { // 是否属于用户的交互错误
      type: Boolean,
    },
    detailMessage: { // 错误详细详情
      type: String,
    },
    reasonType: { // 错误类型
      type: String,
      default: null,
    },
    mainReason: { // 错误的主要原因
      type: String,
      default: null,
    },
  }, {
    toObject: { getters: true },
    toJSON: { getters: true },
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  });

  return mongoose.model('error', Error);
};
