const fs = require('fs');
const path = require('path');
require('dotenv').config();
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (
      element !== 'node_modules' &&
      element !== '.next' &&
      element !== '.git' &&
      element !== 'cli' &&
      element !== 'fair-launch' &&
      element !== 'gumdrop'
    )
      if (fs.lstatSync(path.join(from, element)).isFile()) {
        fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else {
        copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}
async function setup() {
  const folders = ['assets'];
  const files = ['metadata.json'];
  console.log('Writing Assets Folder');
  folders.map((folder) => {
    if (!fs.existsSync(__dirname + `/${folder}`))
      fs.mkdirSync(__dirname + `/${folder}`, function (err) {
        if (err) {
          return console.log(err);
        }
      });
  });
  console.log('Writing Metadata');
  files.map((folder) => {
    fs.writeFile(__dirname + `/${files}`, '', function (err) {
      if (err) {
        return console.log(err);
      }
    });
  });
  if (fs.existsSync(__dirname + `/package-lock.json`))
    fs.unlink(__dirname + `/package-lock.json`, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });

  copyFolderSync(`${__dirname}/metaplex/js/`, `${__dirname}/client`);

  console.log('Setup Complete');
}

setup();
