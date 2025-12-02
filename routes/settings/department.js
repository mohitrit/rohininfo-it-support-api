const { authenticateToken } = require("../../authentication/auth");
const { insertDepartment, browseDepartment, disableDepartment, DeleteDepartment, previewDepartment } = require("../../controller/settings/department");

const DepartmentRoute = require("express").Router();

DepartmentRoute.post("/settings_department_insert",authenticateToken, insertDepartment)
DepartmentRoute.post("/settings_department_browse",authenticateToken, browseDepartment)
DepartmentRoute.post("/settings_department_disable",authenticateToken, disableDepartment)
DepartmentRoute.post("/settings_department_delete",authenticateToken, DeleteDepartment)
DepartmentRoute.post("/settings_department_preview",authenticateToken, previewDepartment)


module.exports = { DepartmentRoute };