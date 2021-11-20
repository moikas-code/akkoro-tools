const fs = require('fs');
require('dotenv').config();

async function write() {
  console.log('Writing Metadata');
  const metaData = require('./metadata.json');
  var i =1
  for (var key in metaData) {
    metaData[key].name = 'Jack In The Blocks #' + i;
    metaData[key].symbol = 'JITB';

    metaData[key].description =
      '2978 Jack In the Blocks living on the Solana Blockchain.';
    metaData[key].image = key + '.png';
    metaData[key]['seller_fee_basis_points'] = 500;
    metaData[key]['external_url'] = 'https://jackintheblocks.io';
    metaData[key].collection = {
      name: 'Jack In The Blocks #' + i,
      family: 'Jack In The Blocks',
    };
    metaData[key]['properties'] = {};
    metaData[key]['properties'].files = [
      {uri: key + '.png', type: 'image/png'},
    ];
    
    metaData[key]['properties'].category = 'image';
    metaData[key]['properties'].creators = [
      {address: 'HNi6XrBPvsvVzFhJqup87EvfPCEsXJBPzEi6jwRaLZxA', share: 100},
    ];

    // const oldPath = __dirname + `/assets/${parseInt(key)}.png}`;

    // // lowercasing the filename
    // const newPath = __dirname + `/assets/${parseInt(key)}.png`;

    // // Rename file
    // fs.rename(oldPath, newPath, (err) => console.log(err));

    let _obj = JSON.stringify(metaData[key]);
    fs.writeFile(__dirname + `/assets/${key}.json`, _obj, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    i++;
  }
}

write();
