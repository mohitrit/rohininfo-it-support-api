const { imageUpload } = require("../../File/File");
const { wovenFabricInsert, browseWovenFabric, DeleteWovenFabric, previewWovenFabric, uploadWovenFabric } = require("../../controller/Masters/wovenFabric");
const { authenticateToken } = require("../../authentication/auth");

  
  const wovenFabricRoutes = require("express").Router();
  
  wovenFabricRoutes.post("/Masters_woven_fabric_insert",authenticateToken, wovenFabricInsert);
  wovenFabricRoutes.post("/Masters_woven_fabric_browse",authenticateToken, browseWovenFabric);
  wovenFabricRoutes.post("/Masters_woven_fabric_delete",authenticateToken, DeleteWovenFabric);
  wovenFabricRoutes.post("/Masters_woven_fabric_preview",authenticateToken, previewWovenFabric);
  
  wovenFabricRoutes.post(
    "/upload_wovenFabric_image",
    imageUpload("uploads/wovenFabric", 20).single("file_path"),
    uploadWovenFabric
  );



  module.exports = { wovenFabricRoutes };
  