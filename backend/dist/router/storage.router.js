"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storage_controller_1 = require("../controllers/storage.controller");
const StorageRouter = (0, express_1.Router)();
StorageRouter.post("/download", storage_controller_1.downloadFile);
StorageRouter.post("/upload", storage_controller_1.uploadFile);
exports.default = StorageRouter;
