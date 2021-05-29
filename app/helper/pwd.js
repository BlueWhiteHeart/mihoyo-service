'use strict';
const crypto = require('crypto');

const pwdUtil = pwd => {
  const hmac = crypto.createHmac('sha256', 'Meiauto$');
  hmac.update(pwd);
  return hmac.digest('base64');
};

const pwdMD5 = pwd => {
  return crypto.createHash('md5').update(pwd, 'utf8').digest('base64');
};
// AES是一种常用的对称加密算法
const aesEncrypt = data => {
  const key = 'K_HH125';
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};
// AES解密
const aesDecrypt = data => {
  const key = 'K_HH125';
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
// 随机字符串密码
const getPwd = () => {
  const chars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g' ];
  let res = 'nx-';
  for (let i = 0; i < 5; i++) {
    const id = Math.ceil(Math.random() * 16);
    res += chars[id];
  }
  return res;
};

module.exports = {
  pwdUtil,
  pwdMD5,
  aesEncrypt,
  aesDecrypt,
  getPwd,
};
