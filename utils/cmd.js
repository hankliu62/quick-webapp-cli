const cmd = require('child_process');
const platform = require('./platform');

function install(dirPath) {
  return new Promise(function(resolve, reject) {
    const npm = platform.isWindows() ? 'npm.cmd' : 'npm';
    const args = ['install'];

    const job = cmd.spawn(npm, args, {
      stdio: 'inherit',
      cwd: dirPath
    });

    job.on('close', function(code) {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}

module.exports = {
  install
};
