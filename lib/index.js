const fs = require('fs');
const path = require('path');

const colors = require('colors');

const ENV_SWITCHER_DIR = '.envswitcher';
const projectRootPath = process.cwd();
const envPresetPath = path.join(projectRootPath, ENV_SWITCHER_DIR);
const statusJSONPath = path.join(projectRootPath, ENV_SWITCHER_DIR, 'status', 'status.json');

// initialize .env-switcher.
function initialize(envName) {
  return fs.exists(envPresetPath, (exists) => {
    if (!exists) {
      // create .envswitcher directory
      return fs.mkdir(envPresetPath, () => {
        let defaultEnvName = 'default';
        if (envName) {
          defaultEnvName = envName;
        }
        const defaultEnvFilePath = path.join(envPresetPath, defaultEnvName);
        const sourceEnvPath = path.join(projectRootPath, '.env');

        // if .env already exists, it will be copied automatically into .envswitcher as default
        fs.exists(sourceEnvPath, (exists) => {
          if (exists) {
            fs.createReadStream(sourceEnvPath)
              .pipe(fs.createWriteStream(defaultEnvFilePath));
            console.log(`created default .env file: '${defaultEnvName}'.`);
          } else {
            fs.writeFile(defaultEnvFilePath, '', (err) => {
              if (err) throw err;
              console.log('created default .env file: default');
            });
          }
        });

        // create .env-switcher status file --> status recorded as JSON file
        const configPath = path.join(envPresetPath, 'status');
        fs.mkdir(configPath, () => {
          const configJSONPath = path.join(configPath, 'status.json');
          const statusInitString = JSON.stringify({ initialized: true });
          return fs.writeFile(configJSONPath, statusInitString, (err) => {
            if (err) throw err;
            console.log('created .env-switcher config.');
          });
        });

        // if .gitignore exists, '.envswitcher' will be ignored.
        const gitIgnorePath = path.join(projectRootPath, '.gitignore');
        fs.exists(gitIgnorePath, (exists) => {
          if (exists) {
            fs.readFile(gitIgnorePath, (err, data) => {
              if (err) throw err;
              const gitIgnoreInfo = data;
              const addIgnoreEnvPresets = `${gitIgnoreInfo}\n\n#${ENV_SWITCHER_DIR}\n${ENV_SWITCHER_DIR}`;
              fs.writeFile(gitIgnorePath, addIgnoreEnvPresets, (err) => {
                if (err) throw err;
              });
            });
          }
        });
        console.log('.env-switcher is initialized.');
      });
    }
    return console.log('.env-switcher has been initialized.')
  });
}
exports.initialize = initialize;

/**
 * ENVIRONMENT SWITCHER
 * @param params
 */
function switcher(envName) {
  const ENV_FILE_NAME = '.env'; // target env filename

  const useEnvName = envName; // environment name which you wanna set
  const sourceEnvPath = path.join(projectRootPath, ENV_SWITCHER_DIR, useEnvName);
  const targetEnvPath = path.join(projectRootPath, ENV_FILE_NAME);

  return fs.exists(sourceEnvPath, (exists) => {
    if (exists) {
      fs.readFile(statusJSONPath, (err, data) => {
        if (err) return console.log('no status file exists. init .env-switcher and set .env presets first.');
        let statusObject = JSON.parse(data);
        if (statusObject.currentEnv === envName)
          return console.log(`Your project is already under ${colors.green(envName)} env.`);
        statusObject.currentEnv = envName;
        fs.writeFile(statusJSONPath, JSON.stringify(statusObject), (err) => {
          if (err) throw err;
          console.log(`deploy environment selected: '${useEnvName}'.`);
        });
        fs.createReadStream(sourceEnvPath)
          .pipe(fs.createWriteStream(targetEnvPath));
      });
    } else {
      console.log('invalid or no environment.')
    }
  });
}
exports.switcher = switcher;

// listing usable env_files
function listEnvFiles() {
  fs.readdir(envPresetPath, (err, files) => {
    if (err) return console.log('no .env settings. init .env-switcher and set .env presets first.');

    fs.readFile(statusJSONPath, (err, data) => {
      if (err) return console.log('no status file exists. init .env-switcher and set .env presets first.');

      const statusObject = JSON.parse(data);
      const currentEnv = statusObject.currentEnv;
      const currentEnvIndex = files.indexOf(currentEnv);
      files[currentEnvIndex] = colors.green(`* ${currentEnv}`);

      const statusIndex = files.indexOf('status');
      files.splice(statusIndex, 1);  // remove status directory in the list
      for (let i = 0; i < files.length; i += 1) {
        console.log (files[i]);
      }
    });
  });
}
exports.listEnvFiles = listEnvFiles;

// show status and settings of .env-switcher
function showStatus(options) {
  fs.readFile(statusJSONPath, (err, data) => {
    if (err) return console.log('no status file exists. init .env-switcher and set .env presets first.');
    const statusObject = JSON.parse(data);
    console.log(`current env: ${statusObject.currentEnv}`);
  });
}
exports.showStatus = showStatus;
