const {
	listFabric,
	listColor,
	listUom,
	listBlend,
	listFinishName,
	listProductType,
	listMill,
	listKnittedFabric,
	listTrimType,
	listVendor,
	listIndustryType,
	listCustomer,
	listPincode,
	listDepartment,
	listDesignation,
	listProductUsage,
	filterProductUsage,
	listMakeBrand,
	listitemName,
	listAccessoriesCategory,
	listAccessoriesSubCategory,
	listUser,
	listProductStyle,
	listFabricTrim,
	listPackaging,
	listAccessories,
	UpdateUserFilter,
	listTypeSize,
	USerList,
} = require("../../controller/Masters/list");

const listMasterrsRoute = require("express").Router();

listMasterrsRoute.post("/list_fabric", listFabric);
listMasterrsRoute.post("/list_color", listColor);
listMasterrsRoute.post("/list_uom", listUom);
listMasterrsRoute.post("/list_blend", listBlend);
listMasterrsRoute.post("/list_finish_name", listFinishName);
listMasterrsRoute.post("/list_product_type", listProductType);
listMasterrsRoute.post("/list_mill", listMill);
listMasterrsRoute.post("/list_knitted_type", listKnittedFabric);
listMasterrsRoute.post("/list_trim_type", listTrimType);
listMasterrsRoute.post("/list_vendor", listVendor);
listMasterrsRoute.post("/list_industry_type", listIndustryType);
listMasterrsRoute.post("/list_customer", listCustomer);
listMasterrsRoute.post("/list_pincode", listPincode);
listMasterrsRoute.post("/list_department", listDepartment);
listMasterrsRoute.post("/list_designation", listDesignation);
listMasterrsRoute.post("/list_product_usage", listProductUsage);
listMasterrsRoute.post("/filter_product_usage", filterProductUsage);
listMasterrsRoute.post("/list_make_brand", listMakeBrand);
listMasterrsRoute.post("/list_item_name", listitemName);
listMasterrsRoute.post("/list_accessories_category", listAccessoriesCategory);
listMasterrsRoute.post(
	"/list_accessories_subcategory",
	listAccessoriesSubCategory
);
listMasterrsRoute.post("/list_product_style", listProductStyle);
listMasterrsRoute.post("/list_users", listUser);
listMasterrsRoute.post("/list_fabric_trim", listFabricTrim);
listMasterrsRoute.post("/list_packaging", listPackaging);
listMasterrsRoute.post("/list_accessories", listAccessories);
listMasterrsRoute.post("/list_type_size", listTypeSize);
listMasterrsRoute.post("/user_list", USerList);

module.exports = { listMasterrsRoute };
