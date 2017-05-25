const fs = require('fs');
const path = require('path');

/**
 * ENVIRONMENT SWITCHER
 * @param params
 */
function switcher(params) {
  const ENV_FILE_NAME = '.env'; // target env filename
  const ENV_DIR_NAME = '.env-presets'; // directory where env files saved

  const useEnvName = params[2]; // environment name which you wanna set
  const projectRootPath = process.cwd();  // path which project root
  const sourceEnvPath = path.join(projectRootPath, ENV_DIR_NAME, useEnvName);
  const targetEnvPath = path.join(projectRootPath, ENV_FILE_NAME);

  return fs.exists(sourceEnvPath, (exists) => {
    if (exists) {
      fs.createReadStream(sourceEnvPath)
        .pipe(fs.createWriteStream(targetEnvPath));
      console.log(`deploy environment selected: '${useEnvName}'.`);
    } else {
      console.log('invalid or no environment.')
    }
  });
}

module.exports = {
  switcher,
};
