const express = require("express");
const app = express();
const cors = require("cors");

const { auth } = require("./authentication/login");
const { common } = require("./routes/common");
const { masterUsersRoutes } = require("./routes/masters/users");
const {
  writeSrfDraft,
  getSrfDraftData,
  deleteDraftData,
} = require("./controller/draft/srf");
const { authenticateToken } = require("./authentication/auth");
const { AppQRCode } = require("./routes/AppQrCode/qrCode");
const { userRightsRoutes } = require("./routes/userRights/userRights");
const { masterBrandsRoutes } = require("./routes/masters/brands");
const { masterISPRoutes } = require("./routes/masters/isp");
const { masterVendorsRoutes } = require("./routes/masters/vendors");
const { masterPinRoutes } = require("./routes/masters/pin");
const { masterPaymentModeRoutes } = require("./routes/masters/paymentMode");
const { masterStatusRoutes } = require("./routes/masters/status");
const {
  masterFeasibilityTypeRoutes,
} = require("./routes/masters/feasibilitytype");
//new added store
const { storeStoreRoutes } = required("./routes/stores/store");
require("dotenv").config();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("RIT Tracking Link API is Runing");
});

// api routess

app.use("/auth", auth);
app.use(
  "/masters",
  masterUsersRoutes,
  masterBrandsRoutes,
  masterISPRoutes,
  masterVendorsRoutes,
  masterPinRoutes,
  masterPaymentModeRoutes,
  masterStatusRoutes,
  masterFeasibilityTypeRoutes
);

app.use("/stores", storeStoreRoutes);

app.use("/userRights", userRightsRoutes);
app.post("/api/draft_insert", authenticateToken, writeSrfDraft);
app.post("/api/draft_delete", authenticateToken, deleteDraftData);
app.get("/api/draft_get", authenticateToken, getSrfDraftData);
app.use("/common", common);
app.use("/AppQrCode", AppQRCode);
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
