const { authenticateToken } = require("../../authentication/auth");
const { generateCustomerId, generateVendorId, generateWovenId, generateKnittedId, generatePackagingId, generateFabricTrimId } = require("../../controller/Masters/generateId");

  
  const generateIDroutes = require("express").Router();
  
  generateIDroutes.post("/generate_customer_unique_id",authenticateToken, generateCustomerId);
  generateIDroutes.post("/generate_vendor_unique_id",authenticateToken, generateVendorId);
  generateIDroutes.post("/generate_woven_fabric_unique_id",authenticateToken, generateWovenId);
  generateIDroutes.post("/generate_knitted_fabric_unique_id",authenticateToken, generateKnittedId);
  generateIDroutes.post("/generate_packaging_unique_id",authenticateToken, generatePackagingId);
  generateIDroutes.post("/generate_fabric_trim_unique_id",authenticateToken, generateFabricTrimId);
 
  
  module.exports = { generateIDroutes };
  