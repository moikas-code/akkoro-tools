const fs = require('fs');
const path = require('path');
require('dotenv').config();
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to);
  fs.readdirSync(from).forEach((element) => {
    if (element !== 'routes' &&element !== 'node_modules' && element !== '.next' && element !== '.git')
      if (fs.lstatSync(path.join(from, element)).isFile()) {
        fs.copyFileSync(path.join(from, element), path.join(to, element));
      } else {
        if (
          element !== 'node_modules' &&
          element !== '.next' &&
          element !== '.git' &&
          element !== 'cli' &&
          element !== 'fair-launch' &&
          element !== 'gumdrop' &&
          element !== 'home' &&
          element !== 'artwork'
        )
          copyFolderSync(path.join(from, element), path.join(to, element));
      }
  });
}
async function setup() {
  copyFolderSync(`${__dirname}/metaplex/js/`, `${__dirname}/client`);
  console.log('Migration Complete');
}

setup();
