/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    logger: {
      // maxFileSize: 2 * 1024 * 1024 * 1024,
      outputJSON: true,
      frontLogger: {
        maxFileSize: 1,
        file: path.join(appInfo.baseDir),
        contextFormatter(meta) {
          return `${meta.date} ${meta.message}`;
        },
      },
    },
    swaggerdoc: {
      scandir: './app/controller',
      apiInfo: {
        title: 'mihoyo后台接口API',
        description: 'swagger展示',
        version: '1.0.0',
      },
      schemes: [ 'http' ],
      enable: true,
      enableSecurity: false,
    },
    swagger: {
      enable: true,
      mountPath: '/test-mount', // swagger-ui  address  <domain>/test-mount
      swaggerFilePath: '/test-swagger.json', // swagger file default path
      enableGoogleFont: false,
    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: 'auth',
        db: 0,
      },
    },
    // 开发环境
    mongoose: {
      client: {
        url: 'mongodb://172.25.1.8:27017/oa',
        options: {
          useNewUrlParser: true,
          authSource: 'admin',
          auth: {
            user: 'ne-fe',
            password: 'n5oTWZU7bVH@1HqG',
          },
        },
      },
    },
    static: {
      dir: path.resolve(appInfo.baseDir, 'app/public'),
      secretId: 'AKIDf9NK1ScV7TYMs7ZkdHgofFYaLvFJ6bpn',
      secretKey: 'i9KFtGL9k47uSjiQv95lBLEqBG3ZpqZ1',
      bucket: 'mihoyo-1300125425',
      region: 'ap-nanjing',
      // imgBaseUrl: 'https://img-oa.nx-engine.com',
      // imgBucket: 'oa-img-1256488924',
    },
    multipart: {
      fileSize: '5mb',
      mode: 'file',
      fileExtensions: [ '.txt', '.doc', '.xls', '.xlsx', '.docx', '.ppt', '.pdf', '.eml', '.pptx', '.msg', '.rar' ],
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_12345';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
