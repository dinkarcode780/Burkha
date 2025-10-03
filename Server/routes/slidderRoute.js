const expresss = require("express");
const { createSlidder, updateSlidder, getSlidder, deleteSlidder } = require("../controllers/slidderController");

const router = expresss.Router();


router.post("/admin/createSlidder",createSlidder);

router.put("/admin/updateSlidder",updateSlidder);

router.get("/admin/getSliddder",getSlidder)

router.get("/users/getSliddder",getSlidder);

router.delete("/admin/deleteSlidder",deleteSlidder)



module.exports = router;