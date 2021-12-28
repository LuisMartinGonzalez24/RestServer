import { Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const isSingleFile = (file: UploadedFile | UploadedFile[]): file is UploadedFile => {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
};

const isFileArray = (file: UploadedFile | UploadedFile[]): file is UploadedFile[] => {
    return Array.isArray(file);
};

const uploadFile = (request: Request, response: Response) => {

    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({
            msg: 'No files were uploaded.',
        });
    }

    const fileField = request.files?.archivo;

    if (fileField && fileField !== undefined) {
        if (isSingleFile(fileField)) {
            console.log('fileField: ', fileField);

            const extSplit = fileField.name.split('.');
            const extension = extSplit[extSplit.length - 1];

            const validExtension = ['jpg', 'png', 'gif', 'jpeg'];

            if (!validExtension.includes(extension)) {
                return response.status(400).json({
                    msg: 'Extension not allowed'
                });
            }

            const tempName = uuidv4() + '.' + extension;
            const uploadPath = path.join(__dirname, '../../uploads', tempName)

            fileField.mv(uploadPath, (err) => {
                if (err) {
                    return response.status(500).json({
                        msg: 'Error while copying file to target location',
                        err,
                    });
                }

                response.status(200).json({
                    msg: 'File upload to ' + uploadPath,
                });
            });
        }
    } else {
        response.status(400).json({
            msg: 'Error in formdata'
        });
    }

};

export {
    uploadFile,
};