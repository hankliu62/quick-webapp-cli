/* eslint-disable no-console */

const chalk = require('chalk');
const prefix = '  react-cli:';

const defaultLog = function(...messages) {
  if (messages && messages.length) {
    messages[0] = prefix + messages[0];
  } else {
    messages = ['\n'];
  }

  console.log(...messages);
};

const warn = function(...messages) {
  if (messages && messages.length) {
    messages[0] = chalk.yellow(prefix) + messages[0];
  }
  console.log(...messages);
};

const log = function(...messages) {
  if (messages && messages.length) {
    messages[0] = chalk.white(prefix) + messages[0];
  }
  console.log(...messages);
};

const success = function(...messages) {
  if (messages && messages.length) {
    messages[0] = chalk.green(prefix) + messages[0];
  }
  console.log(...messages);
};

const error = function(...messages) {
  const msgs = messages.map((message) => (message instanceof Error ? message.message.trim() : message));
  if (msgs && msgs.length) {
    msgs[0] = chalk.red(prefix) + msgs[0];
  }
  console.error(...msgs);
};

const fatal = function(...messages) {
  error(...messages);

  process.exit(1);
};

module.exports = {
  default: defaultLog,
  log,
  warn,
  success,
  error,
  fatal
};
