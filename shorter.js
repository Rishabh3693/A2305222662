const { customAlphabet } = require('nanoid');

const generateShortcode = () => {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
  return nanoid();
};

module.exports = { generateShortcode };