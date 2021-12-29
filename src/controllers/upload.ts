import { Request, Response } from "express";
import { helperUploadFile } from "../helpers/uploadFile";

const uploadFile = async (request: Request, response: Response) => {

    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).json({
            msg: 'No files were uploaded.',
        });
    }

    const fileField = request.files?.archivo;

    try {
        const pathFile = await helperUploadFile(fileField, undefined, 'react');

        response.status(200).json({
            pathFile,
        });
    } catch (msg) {
        response.status(400).json({
            msg,
        });
    }

};

export {
    uploadFile,
};