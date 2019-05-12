const readline = require('readline');

/**
 * Prompt for confirmation on STDOUT/STDIN
 *
 * @param {String} msg
 */
function confirm(msg) {
  return Promise(function(resolve) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(msg, function(input) {
      rl.close();
      resolve(/^y|yes|ok|true$/i.test(input));
    });
  });
}

module.exports = {
  confirm
};
