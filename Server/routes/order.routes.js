const express = require("express");
const Order = require("../models/orderModel");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  CancelledOrder,
  DilveredOrder,
  shipOrder,
  getDeliveredOrders,
  getShippedOrders,
  getCancelledOrders,
  getOrdersWithDueAmount,
  getMemberById,
  sendOrderEmailById,
  getOrdersDueAmount,
  getOrdersWithDueAmounts,
  getTodayOrders,
  today
} = require("../controllers/order.controller");
const { protect } = require("../config/middleware");

const router = express.Router();

router.post("/",createOrder);
router.get("/", getAllOrders);
router.get("/today",getTodayOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.put("/:id/deliver", DilveredOrder);
router.put("/:id/cancel", CancelledOrder);
router.put("/:id/ship", shipOrder);
router.get("/status/delivered", getDeliveredOrders);
router.get("/status/shipped", getShippedOrders);
router.get("/status/cancelled", getCancelledOrders);
router.get("/dueAmount/:hasDueAmount", getOrdersWithDueAmount);
router.get("/dueAmounts/:hasDueAmount", getOrdersWithDueAmounts);


router.get("/member/:id", getMemberById);
router.post("/send-order-email", sendOrderEmailById);
router.get("/dueAmount", getOrdersDueAmount);
// router.post("/place", sendOrderMail)
// router.get("/today", async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const orders = await Order.find({
//       createdAt: {
//         $gte: today,
//         $lt: tomorrow,
//       },
//     }).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch today's orders",
//       error: error.message,
//     });
//   }
// });

// router.get("/today", async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const orders = await Order.find({
//       createdAt: { $gte: today, $lt: tomorrow },
//     })
//       .populate("user", "firmName contactName mobile1 email userType") 
//       .populate("vendor", "firmName email mobile1 limit")                
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch today's orders",
//       error: error.message,
//     });
//   }
// });


module.exports = router;
