'use strict';
const { Service } = require('egg');

class BaseService extends Service {
  get model() {
    return 'Model';
  }

  index(where, pager) {
    const { ctx } = this;
    BaseService.searchParamsClearEmptyValue(where);

    const { pageSize, pageIndex } = pager;

    return Promise.all([
      ctx.model[ this.model ].find(where).count(),
      ctx.model[ this.model ].find(where)
        .limit(pageSize)
        .skip((pageIndex - 1) * pageSize),
    ]);
  }

  count(where) {
    return this.ctx.model[ this.model ].count(where);
  }

  find(where) {
    return this.ctx.model[ this.model ].find(where);
  }

  findOne(where) {
    return this.ctx.model[ this.model ].findOne(where);
  }

  show(id) {
    return this.ctx.model[ this.model ].findById(id);
  }

  create(params) {
    return this.ctx.model[ this.model ].create(params);
  }

  update(where, params) {
    return this.ctx.model[ this.model ].updateMany(where, { $set: params });
  }

  updateById(id, params) {
    return this.ctx.model[ this.model ].findByIdAndUpdate(id, { $set: params });
  }

  destroy(where) {
    return this.ctx.model[ this.model ].deleteMany(where);
  }

  destroyById(id) {
    return this.ctx.model[ this.model ].findByIdAndDelete(id);
  }

  bulkWrite(params) {
    return this.ctx.model[ this.model ].bulkWrite(params, { ordered: false });
  }

  static searchParamsClearEmptyValue(params, type) {
    const $and = [];
    for (const key in params) {
      if (params[ key ] === '' || params[ key ] === undefined) {
        delete params[ key ];
      }
      if (type === 'match') {
        const value = params[ key ];
        $and.push({ [ key ]: { $in: value } });
      }
    }
    if (type) {
      return {
        $and,
      };
    }
  }
}

module.exports = BaseService;

