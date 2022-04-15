const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('API key', 'API secret');

// upload a single file
const fs = require('fs');
const readableStreamForFile = fs.createReadStream('./babybunny.json');
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
pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});

