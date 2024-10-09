const express = require("express");
const {
  getPersonnelList,
  getPersonnel,
  createPersonnel,
} = require("../controllers/Personnel.js");
const { verifyToken, roleChecked } = require("../middleware/Auth.js");
const router = express.Router();

router.get("/personnelList", verifyToken, getPersonnelList);
router.post("/personnel", verifyToken, getPersonnel);
router.post(
  "/personnel/new",
  verifyToken,
  roleChecked("admin"),
  createPersonnel
);

module.exports = router;
