const express = require("express");
const { createSaleOffer, getAllSaleOffers, getSaleById, updateSaleOffer, deleteSaleOffer, updateSalleOffer } = require("../controllers/salleofferController");


const router = express.Router();

router.post("/admin/createSaleOffer",createSaleOffer);

router.get("/admin/getAllSaleOffers",getAllSaleOffers)

router.get("/users/getAllSaleOffers",getAllSaleOffers)


router.get("/admin/getSaleById",getSaleById);


router.put("/admin/updateSalleOffer",updateSalleOffer);


router.delete("/admin/deleteSaleOffer",deleteSaleOffer);


module.exports = router;