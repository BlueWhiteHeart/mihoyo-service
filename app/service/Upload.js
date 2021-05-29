'use strict';

const { Service } = require('egg');
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const path = require('path');
const mem = require('mem');
const uuidV4 = require('uuid/v4');

class UploadService extends Service {
  async create(file, isImg, ifHeadImg) { // 公告栏编辑专用，可上传富文本图片
    const { config } = this;
    return new Promise((resolve, reject) => {
      const filename = ifHeadImg ? file.fieldname : file.filename;
      const ext = filename.substring(filename.lastIndexOf('.'));
      const parms = {
        Bucket: isImg ? config.static.imgBucket : config.static.bucket, // 如果是富文本图片要用img命名空间
        Region: config.static.region,
        Key: isImg ? uuidV4() + ext : filename, // 如果是富文本图片要生成uuid上传
        FilePath: file.filepath,
      };
      this.init().sliceUploadFile(parms, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async createUUID(file) { // uuid生成专用
    const { config } = this;
    return new Promise((resolve, reject) => {
      const filename = file.filename;
      const ext = filename.substring(filename.lastIndexOf('.'));
      this.init().sliceUploadFile({
        Bucket: config.static.bucket,
        Region: config.static.region,
        Key: uuidV4() + ext,
        FilePath: file.filepath,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async show(id) {
    const { config } = this;
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(path.join(config.baseDir, `app/public/${id}`));
      this.init().getObject({
        Bucket: config.static.bucket,
        Region: config.static.region,
        Key: id,
        Output: output,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
    ;
  }

  init() {
    const _this = this;
    return mem(_this.createCos.bind(_this))();
  }

  createCos() {
    const { config } = this;
    return new COS({
      SecretId: config.static.secretId,
      SecretKey: config.static.secretKey,
    });
  }

  findFile(where) {
    return this.ctx.model.File.findOne(where);
  }
  findFileImportHistory(where) {
    return this.ctx.model.ImportHistory.findOne(where);
  }

  saveFile(where) {
    return this.ctx.model.File.create(where);
  }
}

module
  .
  exports = UploadService;
