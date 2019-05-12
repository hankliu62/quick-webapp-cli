const chalk = require('chalk');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const logger = require('./logger');

/**
 * Check if the given directory `dirPath` is empty.
 *
 * @param {String} dirPath
 */
function isEmpty(dirPath) {
  return new Promise(function(resolve, reject) {
    fs.readdir(dirPath, function(err, files) {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve(!files || !files.length);
      }
    });
  });
}

/**
 * merge directory folders
 *
 * @param {Array} folders
 */
function merge(...folders) {
  const targetFolders = [];
  for (const folder of folders) {
    switch (folder) {
      case '.': {
        break;
      }
      case '..': {
        targetFolders.pop();
        break;
      }
      default: {
        targetFolders.push(folder);
      }
    }
  }

  return targetFolders.join(path.sep);
}

/**
 * Like `echo str > path`.
 *
 * @param {String} path
 * @param {String} str
 */
function write(path, str, mode) {
  // eslint-disable-next-line
  fs.writeFileSync(path, str, { mode: mode || 438 /*=0666*/ });
  logger.log('   ' + chalk.blue('create file successfully') + ' : ' + path);
}

/**
 * Load template file.
 */
function loadTemplate(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'templates', name), 'utf-8');
}

/**
 * Copy template file.
 *
 * @param {String} fromFile
 * @param {String} toFile
 */
function copyTemplate(fromFile, toFile) {
  fromFile = path.join(__dirname, '..', 'templates', fromFile);
  write(toFile, fs.readFileSync(fromFile, 'utf-8'));
}

/**
 * Like `mkdir -p` in node.js.
 *
 * @param {String} path
 */
function mkdir(path) {
  mkdirp.sync(path, 493 /*=0755*/);
  logger.log('   ' + chalk.blue('create dir  successfully') + ' : ' + path);
}

/**
 * Like `cp -rf` in node.js, copy directory and includes files.
 *
 * @param {String} fromDir
 * @param {String} toDir
 */
function cp(fromDir, toDir) {
  const exists = fs.existsSync(toDir);
  if (!exists) {
    mkdir(toDir);
  }

  const files = fs.readdirSync(fromDir);

  if (files.length) {
    files.forEach(function(file) {
      const fromFilePath = path.join(fromDir, file);
      const toFilePath = path.join(toDir, file);

      const stats = fs.statSync(fromFilePath);

      if (stats.isDirectory()) {
        mkdir(toFilePath);
        cp(fromFilePath, toFilePath);
      } else {
        fs.copyFileSync(fromFilePath, toFilePath);
      }
    });
  }
}

/**
 * Join all arguments together and normalize the resulting path base `pwd`.
 *
 * @param  {Array} folders
 */
function joinBasePwd(...folders) {
  return path.join(process.cwd(), ...folders);
}

module.exports = {
  isEmpty,
  merge,
  cp,
  mkdir,
  write,
  loadTemplate,
  copyTemplate,
  joinBasePwd
};
