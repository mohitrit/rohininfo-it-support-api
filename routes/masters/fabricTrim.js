const { imageUpload } = require("../../File/File");
const { authenticateToken } = require("../../authentication/auth");
const { FabricTrimInsert, previewFabricTrims, browseFabricTrims, DeleteFabricTrims, uploadFabricTrim } = require("../../controller/Masters/fabricTrim");
  
  const FabricTrimRoutes = require("express").Router();
  
  FabricTrimRoutes.post("/Masters_fabric_trim_insert",authenticateToken, FabricTrimInsert);
  FabricTrimRoutes.post("/Masters_fabric_trim_preview",authenticateToken, previewFabricTrims);
  FabricTrimRoutes.post("/Masters_fabric_trim_browse",authenticateToken, browseFabricTrims);
  FabricTrimRoutes.post("/Masters_fabric_trim_delete",authenticateToken, DeleteFabricTrims);
 
  FabricTrimRoutes.post(
    "/upload_fabricTrim_image",
    imageUpload("uploads/fabricTrim", 20).single("file_path"),
    uploadFabricTrim
  );
  
  
  module.exports = { FabricTrimRoutes };
  