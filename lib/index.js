const fs = require('fs');
const path = require('path');

function initialize(params) {
  const ENV_PRESET_DIR = '.env-presets';

  const projectRootPath = process.cwd();
  const envPresetPath = path.join(projectRootPath, ENV_PRESET_DIR);

  // create .env-presets directory
  return fs.mkdir(envPresetPath, () => {
    let defaultEnvName = 'default';
    if (params[3]) {
      defaultEnvName = params[3];
    }
    const defaultEnvFilePath = path.join(envPresetPath, defaultEnvName);
    const sourceEnvPath = path.join(projectRootPath, '.env');

    // if .env already exists, it will be copied automatically into .env-presets as default
    fs.exists(sourceEnvPath, (exists) => {
      if (exists) {
        fs.createReadStream(sourceEnvPath)
          .pipe(fs.createWriteStream(defaultEnvFilePath));
        console.log(`created default .env file: '${defaultEnvName}'.`);
      } else {
        fs.writeFile(defaultEnvFilePath, '', (err) => {
          if (err) throw err;
          console.log('created default .env file: default');
        })
      }
    });
    // if .gitignore exists, '.env-presets' will be ignored.
    const gitIgnorePath = path.join(projectRootPath, '.gitignore');
    fs.exists(gitIgnorePath, (exists) => {
      if (exists) {
        fs.readFile(gitIgnorePath, (err, data) => {
          if (err) throw err;
          const gitIgnoreInfo = data;
          const addIgnoreEnvPresets = `${gitIgnoreInfo}\n\n#.env-presets\n.env-presets`;
          fs.writeFile(gitIgnorePath, addIgnoreEnvPresets, (err) => {
            if (err) throw err;
          });
        });
      }
    });
    console.log('.env-switcher initialized.');
  })
}

exports.initialize = initialize;

/**
 * ENVIRONMENT SWITCHER
 * @param params
 */
function switcher(envName) {
  const ENV_FILE_NAME = '.env'; // target env filename
  const ENV_DIR_NAME = '.env-presets'; // directory where env files saved

  const useEnvName = envName; // environment name which you wanna set
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

exports.switcher = switcher;
