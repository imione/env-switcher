const switcher = require('./lib');

const PARAM_ERROR = 'no target parameters';

function envSwitcher(params) {
  if (params.length < 3) {
    return console.log(PARAM_ERROR);
  }

  if (params[2] === 'init') { // init command
    return switcher.initialize(params);
  }

  return switcher.switcher(params[2]);
}

exports.envSwitcher = envSwitcher;