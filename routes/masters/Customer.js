const { imageUpload } = require("../../File/File");
const { authenticateToken } = require("../../authentication/auth");
const { CustomersInsert, browseCustomers, DeleteCustomers, previewCustomers, uploadCustomer } = require("../../controller/Masters/customer");


const customerRoutes = require("express").Router();

customerRoutes.post("/masters_customer_insert", authenticateToken, CustomersInsert);
customerRoutes.post("/Masters_customer_delete", authenticateToken, DeleteCustomers);
customerRoutes.post("/Masters_customer_preview", authenticateToken, previewCustomers);
customerRoutes.post("/Masters_customer_browse", authenticateToken, browseCustomers);
customerRoutes.post(
  "/upload_customer_image",
  imageUpload("uploads/customer", 20).array("file_path"),
  uploadCustomer
);
module.exports = { customerRoutes };
