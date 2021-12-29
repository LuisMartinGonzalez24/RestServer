import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const isSingleFile = (file: UploadedFile | UploadedFile[]): file is UploadedFile => {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
};

const isFileArray = (file: UploadedFile | UploadedFile[]): file is UploadedFile[] => {
    return Array.isArray(file);
};

export const helperUploadFile = (
    fileField: any, 
    allowedExtensions: string[] = ['jpg', 'png', 'gif', 'jpeg'], 
    folder: string = ''
) => {
    return new Promise((resolve, reject) => {
        if (isSingleFile(fileField)) {
            console.log('fileField: ', fileField);

            const extSplit = fileField.name.split('.');
            const extension = extSplit[extSplit.length - 1];

            if (!allowedExtensions.includes(extension)) {
                reject('Extension not allowed');
            }

            const tempName = uuidv4() + '.' + extension;
            const uploadPath = path.join(__dirname, '../../uploads', folder, tempName)

            fileField.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err);
                    reject('Error while copying file to target location');
                }

                resolve('File upload to ' + uploadPath);
            });
        }
    });
};
