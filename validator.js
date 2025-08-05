module.exports = function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    throw new Error('Invalid URL format');
  }
};