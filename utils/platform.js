const isWindows = function() {
  return process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
};

module.exports = {
  isWindows
};
