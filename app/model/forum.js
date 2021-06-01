'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // 版块表
  const Forum = new Schema({ // tab数据
    create_type: {
      type: String,
    },
    created_at: {
      type: Date,
    },
    default_tab: {
      type: Number,
    },
    des: {
      type: String,
    },
    edit_post: {
      type: String,
    },
    // user: {
    //   ref: 'admin',
    //   type: Schema.Types.ObjectId,
    //   default: null,
    // },
    game_id: {
      type: String,
    },
    header_image: {
      type: String,
    },
    icon: {
      type: String,
    },
    icon_pure: {
      type: String,
    },
    id: {
      type: String,
      default: null,
    },
    max_top: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    order: {
      type: String,
    },
    post_limit: {
      type: String,
    },
    post_num: {
      type: String,
    },
    post_order: {
      type: String,
    },
    read_me: {
      type: String,
    },
    reply_type: {
      type: String,
    },
    show_type: {
      type: String,
    },
    src_type: {
      type: String,
    },
    today_post: {
      type: String,
    },
    updated_at: {
      type: Date,
    },
    view_type: {
      type: String,
    },
    visible: {
      type: String,
    },
  }, {
    toObject: { getters: true },
    toJSON: { getters: true },
    timestamps: {
      createdAt: 'createTime',
      updatedAt: 'updateTime',
    },
  });

  return mongoose.model('forum', Forum);
};
