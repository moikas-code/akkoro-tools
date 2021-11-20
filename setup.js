const fs = require('fs');
require('dotenv').config();

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
  console.log('Setup Complete');
}

setup();
