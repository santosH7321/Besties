"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.downloadFile = void 0;
const error_1 = require("../utils/error");
const s3_1 = require("../utils/s3");
const downloadFile = async (req, res) => {
    try {
        const path = req.body?.path;
        if (!path)
            throw (0, error_1.TryError)("Failed to generate download url because path is missing", 400);
        const isExist = await (0, s3_1.isFileExist)(path);
        if (!isExist) {
            throw (0, error_1.TryError)("File doesn't exists", 404);
        }
        const url = await (0, s3_1.downloadObject)(path);
        res.json({ url });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to generate download url");
    }
};
exports.downloadFile = downloadFile;
const uploadFile = async (req, res) => {
    try {
        const path = req.body?.path;
        const type = req.body?.type;
        const status = req.body?.status;
        if (!path || !type || !status)
            throw (0, error_1.TryError)("Invalid request path or type is required", 400);
        const url = await (0, s3_1.uploadObject)(path, type, status);
        res.json({ url });
    }
    catch (err) {
        (0, error_1.CatchError)(err, res, "Failed to generate uploadfile url");
    }
};
exports.uploadFile = uploadFile;
