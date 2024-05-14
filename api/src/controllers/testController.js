import mongoose from "mongoose";
import {v2 as cloudinary} from 'cloudinary';
import crypto from 'crypto';
import ImageHandler from "../util/imageHandler.js";

const imageHandler = new ImageHandler();

await mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const index = async (req, res) => {
    const imagesUrl = await imageHandler.retrieveFilesInFolder('products', 4);
    res.send({images: imagesUrl});
};

const testUpload = async (req, res) => {
    // console.log(req.files)

    if (!req.files){
        return res.status(400).send('No files were uploaded.');
    }

    const files = req.files.productImages;

    // files.map(async (file) => {
    //     await imageHandler.uploadSingleFile(file.tempFilePath, 'products', req.params.productId)
    // });
    const uploadResult = await imageHandler.uploadFiles(files.map((file) => file.tempFilePath), 'products', req.params.productId);

    if (uploadResult.isComplete === false){
        // handle non-complete upload
        res.statusCode = 200;
        res.send({'detail': `Successfully uploaded ${uploadResult.uploaded} out of ${uploadResult.total}`})
        return;
    }

    res.send({'detail': 'File upload completely.'});
};

const testDeleteFolder = async (req, res) => {
    const id = req.params.productId;
    if (!id) {
        res.statusCode = 400;
        res.send({'detail': 'No product id indicated.'});
        return;
    }

    await imageHandler.deleteDirectory('products', id);
    
    res.send({'detail': 'Successfully deleted directory.'})
}

export {index, testUpload, testDeleteFolder}