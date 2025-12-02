const { imageUpload } = require("../../File/File");
const { authenticateToken } = require("../../authentication/auth");
const { VendersInsert, previewVenders, DeleteVenders, browseVenders, uploadVender } = require("../../controller/Masters/vender");

  
  const vendersRoutes = require("express").Router();
  
  vendersRoutes.post("/masters_vendor_insert",authenticateToken, VendersInsert);
  vendersRoutes.post("/Masters_vendor_preview",authenticateToken, previewVenders);
  vendersRoutes.post("/Masters_vendor_delete",authenticateToken, DeleteVenders);
  vendersRoutes.post("/Masters_vendor_browse",authenticateToken, browseVenders);
 
   
  vendersRoutes.post(
    "/upload_vender_image",
    imageUpload("uploads/vender", 20).array("file_path"),
    uploadVender
  );

  module.exports = { vendersRoutes };
  




