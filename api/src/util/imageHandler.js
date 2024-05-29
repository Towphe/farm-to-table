import {v2 as cloudinary} from 'cloudinary';
import crypto from 'crypto';
import { url } from 'inspector';

class ImageHandler{
    constructor(){
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // "dgudm9hb7",// 
            api_key: process.env.CLOUDINARY_API_KEY, // "784371367913344",
            api_secret: process.env.CLOUDINARY_SECRET // "IyEeYQ34QJm9P62iDVyPSETZ3es"
        });
    }

    // add:
    // function that checks file validity

    async uploadSingleFile(filePath, to, id ){
        // upload success marker is set as true by default
        let uploadSuccess = true;
        
        // uploads file to cloudinary
        const uploadResu = await cloudinary.uploader.upload(filePath, {
            public_id:`farm-to-table/${to}/${id}/${crypto.randomBytes(16).toString('hex')}`
        }).catch(err => {
            console.log(err);
            uploadSuccess = false;
        });

        return uploadSuccess;
    }

    async uploadFiles(filePaths, to, id){
        // let successfulUploadCtr = 0;

        // const addSuccessfulUpload = () => {
        //     successfulUploadCtr += 1;
        // }

        // upload each file manually
        // const imageUrls = filePaths.map(async (filePath) => {
        //     let url;
        //     const res = await cloudinary.uploader.upload(filePath, {
        //         public_id: `farm-to-table/${to}/${id}/${crypto.randomBytes(16).toString('hex')}`
        //     })
        //     .catch(err => console.log(err));

        //     return res.url;
        // });
        // temporarily set to upload only one
        const res = await cloudinary.uploader.upload(filePaths[0], {
                    public_id: `farm-to-table/${to}/${id}/${crypto.randomBytes(16).toString('hex')}`
                })
                .catch(err => console.log(err));
        
        let imageUrls = [res.url];

        // console.log(`marked as success ${Date.now()}`);
        
        // if (filePaths.length > successfulUploadCtr){
        //     // mark as incomplete uploaded
        //     return {
        //         isComplete: false,
        //         uploaded: successfulUploadCtr,
        //         total: filePaths.length
        //     }
        // }

        return {
            isComplete: true,
            uploaded: filePaths.length, //successfulUploadCtr,  // reconfigure this checker later
            total: filePaths.length,
            imageUrls: imageUrls
        };
    }

    async retrieveFilesInFolder(from, id){
        let files = await cloudinary.api.resources({
            type: 'upload',
            prefix: `farm-to-table/${from}/${id}`
        });

        const fileUrls = files.resources.map((file) => {
            return {
                assetId : file.asset_id,
                url : file.url
            }
        });
        return fileUrls;
    }

    async retrieveFirstImageFromFolder(from, id) {
        let files = await cloudinary.api.resources({
            type: 'upload',
            prefix: `farm-to-table/${from}/${id}`
        });

        // const fileUrl = files.resources[0].map((file) => {
        //     return {
        //         assetId : file.asset_id,
        //         url : file.url
        //     }
        // });
        const fileUrl = files.resources[0];
        console.log(fileUrl);

        return {
            assetId: fileUrl.asset_id,
            url: fileUrl.url
        };
    }

    // function that deletes file from directory
    // NOTE: assetIds must be stored somewhere in page
    async deleteSingleFile(assetId){
        // check if file exists
        const file = await cloudinary.api.resources_by_asset_ids(assetId);

        if (!file) {
            // short circuit function when file not found
            return false;
        }
        
        try{
            // delete file
            await cloudinary.uploader.destroy(file.resources[0].public_id);
        } catch(err) {
            // return false when there's error in deletion
            return false;
        }
        

        return true;
    }

    // function that deletes directory in cloudinary
    async deleteDirectory(from, id){
        try{
            // try to delete directory
            await cloudinary.api.delete_resources_by_prefix(`f"farm-to-table/${from}/${id}`);
        } catch(err) {
            // return false when deletion not successful
            return false;
        }
        // return true when deletion is successful
        return true;
    }
}

export default ImageHandler;