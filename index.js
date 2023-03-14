const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { Readable } = require('stream');

/// pinata
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('PK', 'PRK');
const fs = require('fs');

// create express app
const app = express();

// upload file path
const FILE_PATH = 'uploads';


const upload = multer({
    dest: `${FILE_PATH}/`,
    limits: {
        files: 5, // allow up to 5 files per request,
        fieldSize: 200 * 1024 * 1024 // 200 MB (max file size)
    }
    // fileFilter: (req, file, cb) => {
    //     // allow images only
    //     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //         return cb(new Error('Only image are allowed.'), false);
    //     }
    //     cb(null, true);
    // }
});

// enable CORS
app.use(cors());

// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// start the app 
const port = process.env.PORT || 8081;


app.listen(port, "0.0.0.0", () =>
    console.log(`App is listening on port ${port}.`)
);

const pinFileToIPFS = async (readableStreamForFile) => {
    try {
        const options = {
            pinataMetadata: {
                name: "plian",
                keyvalues: {
                    customKey: 'plian',
                    customKey2: 'plian file'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
        return `https://ipfs.io/ipfs/${result.IpfsHash}`.toString();

    } catch (err) {
        console.log("pinata err", err);
        throw new ApiError(httpStatus[400], 'Error pinning data to ipfs');
    }
};

app.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        const uploadFile = req.file;
        let ipfsHash;
        // make sure file is available
        if (!uploadFile) {
            res.status(400).send({
                errcode: 400,
                msg: 'No file is selected.',
                data: {
                }
            });
        } else {
            const readableStreamForFile = fs.createReadStream(uploadFile.path);
            ipfsHash = await pinFileToIPFS(readableStreamForFile);
            // send response
            res.send({
                errcode: 0,
                msg: 'Success.',
                data: {
                    name: uploadFile.originalname,
                    type: uploadFile.mimetype,
                    size: uploadFile.size,
                    ipfshash: ipfsHash
                }
            });
        }

    } catch (err) {
        res.status(500).send(err)({
            errcode: 500,
            msg: 'API ERROR.',
            data: {
            }
        });
    }
});