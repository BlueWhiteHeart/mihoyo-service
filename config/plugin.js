'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  helper: {
    enable: true,
    package: 'egg-helper',
  },
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
};
