import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { listOrders, placeOrder, userOrders, verifyOrder, updateStatus } from "../controllers/orderControllers.js";


const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/user-orders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;