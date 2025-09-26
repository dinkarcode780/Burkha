const express = require("express");
const { createPopup, updatePopup, getPopupById, deletePopup, getPopupByFilter } = require("../controllers/popupController");

const router = express.Router();

// router.post("/admin/createPopup",createPopup);

router.post("/users/createPopup",createPopup);

router.put("/admin/updatePopup",updatePopup);

router.get("/admin/getPopupById",getPopupById);

router.get("/users/getPopupById",getPopupById);

router.get("/admin/getPopupByFilter",getPopupByFilter)


router.delete("/admin/deletePopup",deletePopup);



module.exports = router;