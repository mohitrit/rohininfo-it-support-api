const { authenticateToken } = require("../../authentication/auth");
const { Masters_accessories_browse, Masters_accessories_delete, AccessoriesInsert, Masters_accessories_preview, AccessoriesAttachmentInsert, PreviewAccessoriesAttachment, DeleteAccessories } = require("../../controller/Masters/accessories");
const { imageUpload } = require("../../File/File");

const accessoriesRoute = require("express").Router();

accessoriesRoute.post("/Masters_accessories_browse", authenticateToken, Masters_accessories_browse);
accessoriesRoute.post("/Masters_accessories_preview", authenticateToken, Masters_accessories_preview);
accessoriesRoute.post("/Masters_accessories_delete", authenticateToken, Masters_accessories_delete);
accessoriesRoute.post("/Masters_accessories_insert", authenticateToken, AccessoriesInsert);
accessoriesRoute.post("/Masters_accessories_attachment_insert",
    imageUpload("uploads/AccessoriesImages", 20).array("file_path"),
    AccessoriesAttachmentInsert
);
accessoriesRoute.post("/Masters_accessories_attachment_preview",PreviewAccessoriesAttachment);
accessoriesRoute.post("/Masters_accessories_attachment_delete", DeleteAccessories);
module.exports = { accessoriesRoute };
