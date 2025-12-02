const { imageUpload } = require("../../File/File");
const { authenticateToken } = require("../../authentication/auth");
const {
  KnittedFabricInsert,
  browseKnittedFabric,
  DeleteKnittedFabric,
  previewKnittedFabric,
  uploadKnittedFabric,
} = require("../../controller/Masters/knittedFabric");

const knittedFabricRoutes = require("express").Router();

knittedFabricRoutes.post("/Masters_knitted_fabric_insert",authenticateToken, KnittedFabricInsert);
knittedFabricRoutes.post("/Masters_knitted_fabric_browse",authenticateToken, browseKnittedFabric);
knittedFabricRoutes.post("/Masters_knitted_fabric_delete",authenticateToken, DeleteKnittedFabric);
knittedFabricRoutes.post("/Masters_knitted_fabric_preview",authenticateToken,previewKnittedFabric);

knittedFabricRoutes.post(
  "/upload_knittedFabric_image",
  imageUpload("uploads/knittedFabric", 20).single("file_path"),
  uploadKnittedFabric
);

module.exports = { knittedFabricRoutes };
