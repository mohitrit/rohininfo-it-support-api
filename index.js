const express = require("express");
const app = express();
const cors = require("cors");

const { auth } = require("./authentication/login");
const { FabricRoute } = require("./routes/settings/fabric");
const { UOMRoute } = require("./routes/settings/uom");
const { ColorRoute } = require("./routes/settings/color");
const { MillRoute } = require("./routes/settings/mill");
const { BlendRoute } = require("./routes/settings/blend");
const { FinishNameRoute } = require("./routes/settings/finishName");
const { ItemNameRoute } = require("./routes/settings/itemName");
const { KnittedTypeRoute } = require("./routes/settings/knittedType");
const { TrimTypeRoute } = require("./routes/settings/trimType");
const { ProductUsageRoute } = require("./routes/settings/productUsage");
const { MakeBrandRoute } = require("./routes/settings/makeBrand");
const { listMasterrsRoute } = require("./routes/masters/list");
const { DyeingRoute } = require("./routes/settings/dyeing");
const { IndustryTypeRoute } = require("./routes/settings/industryType");
const { DesignationRoute } = require("./routes/settings/designation");
const { DepartmentRoute } = require("./routes/settings/department");
const { PincodeRoute } = require("./routes/settings/pincode");
const { wovenFabricRoutes } = require("./routes/masters/wovenFabric");
const { knittedFabricRoutes } = require("./routes/masters/KinttedFabric");
const { customerRoutes } = require("./routes/masters/Customer");
const { vendersRoutes } = require("./routes/masters/vender");
const { PackagingRoutes } = require("./routes/masters/Packaging");
const { FabricTrimRoutes } = require("./routes/masters/fabricTrim");
const { UsersRoutes } = require("./routes/masters/users");
const { BranchRoutes } = require("./routes/masters/branch");
const {
  generateID,
  generateIDroutes,
} = require("./routes/masters/generatedId");
const { common } = require("./routes/common");
const { accessoriesRoute } = require("./routes/masters/Accessories");
const {
  AccessoriesSubCategories,
} = require("./routes/settings/AccessoriesSubCategories");
const { SRFRoutes } = require("./routes/transactions/srf");
const { ProductStyleRoute } = require("./routes/settings/productStyle");
const { BOMRoute } = require("./routes/settings/BomCharges");
const { BOMRoutes } = require("./routes/transactions/Bom");
const { QrRoutes } = require("./routes/transactions/QrCode");
const {
  writeSrfDraft,
  getSrfDraftData,
  deleteDraftData,
} = require("./controller/draft/srf");
const { authenticateToken } = require("./authentication/auth");
const { RGPRoutes } = require("./routes/transactions/RGP");
const { RRGPRoutes } = require("./routes/transactions/RRGP");
const { JSRoutes } = require("./routes/transactions/JobSheet");
const { AppQRCode } = require("./routes/AppQrCode/qrCode");
const { ItemCategory } = require("./routes/settings/itemCategory");
const { userRightsRoutes } = require("./routes/userRights/userRights");
const { NotifiationRoutes } = require("./routes/transactions/Notification");

require("dotenv").config();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Brij API is Runing");
});

// api routess

app.use("/auth", auth);
app.use(
  "/masters",
  listMasterrsRoute,
  wovenFabricRoutes,
  knittedFabricRoutes,
  customerRoutes,
  vendersRoutes,
  PackagingRoutes,
  FabricTrimRoutes,
  UsersRoutes,
  BranchRoutes,
  generateIDroutes,
  accessoriesRoute
);
app.use(
  "/settings",
  FabricRoute,
  UOMRoute,
  ColorRoute,
  MillRoute,
  BlendRoute,
  FinishNameRoute,
  ItemNameRoute,
  KnittedTypeRoute,
  TrimTypeRoute,
  ProductUsageRoute,
  MakeBrandRoute,
  DyeingRoute,
  IndustryTypeRoute,
  DesignationRoute,
  DepartmentRoute,
  PincodeRoute,
  AccessoriesSubCategories,
  ProductStyleRoute,
  BOMRoute,
  ItemCategory
);
app.use(
  "/transactions",
  SRFRoutes,
  BOMRoutes,
  QrRoutes,
  RGPRoutes,
  RRGPRoutes,
  JSRoutes,
  NotifiationRoutes
);
app.use("/userRights", userRightsRoutes);
app.post("/api/draft_insert", authenticateToken, writeSrfDraft);
app.post("/api/draft_delete", authenticateToken, deleteDraftData);
app.get("/api/draft_get", authenticateToken, getSrfDraftData);
app.use("/common", common);
app.use("/AppQrCode", AppQRCode);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
