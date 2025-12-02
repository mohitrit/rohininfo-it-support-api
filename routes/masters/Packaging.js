const { imageUpload } = require("../../File/File");
const { authenticateToken } = require("../../authentication/auth");
const { PackagingInsert, previewPackagings, browsePackagings, DeletePackagings, uploadPackaging } = require("../../controller/Masters/packaging");

const PackagingRoutes = require("express").Router();

PackagingRoutes.post("/Masters_packaging_insert",authenticateToken, PackagingInsert);
PackagingRoutes.post("/Masters_packaging_preview",authenticateToken, previewPackagings);
PackagingRoutes.post("/Masters_packaging_browse",authenticateToken, browsePackagings);
PackagingRoutes.post("/Masters_packaging_delete",authenticateToken, DeletePackagings);

PackagingRoutes.post("/upload_packaging_image",
  imageUpload("uploads/packaging", 20).single("file_path"),
  uploadPackaging
);

module.exports = { PackagingRoutes };
