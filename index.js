const switcher = require('./lib');

const PARAM_ERROR = 'no target parameters';

function envSwitcher(params) {
  if (params.length < 3) {
    return console.log(PARAM_ERROR);
  }
  return switcher.switcher(params);
}

exports.envSwitcher = envSwitcher;