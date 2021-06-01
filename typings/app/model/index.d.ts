// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError = require('../../../app/model/error');
import ExportForum = require('../../../app/model/forum');
import ExportProduct = require('../../../app/model/product');

declare module 'egg' {
  interface IModel {
    Error: ReturnType<typeof ExportError>;
    Forum: ReturnType<typeof ExportForum>;
    Product: ReturnType<typeof ExportProduct>;
  }
}
