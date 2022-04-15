const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('API key', 'API secret');

// upload a file path
const sourcePath = './test/';
const options = {
    pinataMetadata: {
        name: 'test',
        keyvalues: {
            customKey: 'customValue',
            customKey2: 'customValue2'
        }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinFromFS(sourcePath, options).then((result) => {
    //handle results here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
});