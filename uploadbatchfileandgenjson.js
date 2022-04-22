const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('API key', 'API secret');
const path = require('path');
const fs = require('fs');
const config = require('./bbcmetadata.json');
const { time } = require('console');



const pinHash = async () => {
    for (var i = 0; i < 2; i++) {
        if (config.collection[i].name = "#" + i) {
            var info = config.collection[i].attributes
            // upload a single file
            var readableStreamForFile = fs.createReadStream('./test/' + (i + 1) + '.png');
            var file = path.join(__dirname, './imgjson/' + (i + 1) + '.json');
            const options = {
                pinataMetadata: {
                    name: "babybunny",
                    keyvalues: {
                        customKey: 'bunny',
                        customKey2: 'NFT avatar'
                    }
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
            const result = await pinata.pinFileToIPFS(readableStreamForFile, options)

            hash = "https://ipfs.io/ipfs/" + result.IpfsHash

            //handle results here
            var data = {
                img: hash,
                attributes: info
            };
            var content = JSON.stringify(data);
            await fs.writeFile(file, content, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log('file create：' + file);
            });
            console.log(hash);

        }

    }
}
pinHash()



