import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { isLoggedIn } from "../middlewares/authentication";
import { auth } from "../middlewares/authorization";
import catchAsync from "../middlewares/catchAsync";

const router = Router()

router.post("/create", isLoggedIn, catchAsync(OrderController.create));
router.get("/retreive", isLoggedIn, catchAsync(OrderController.getUserOrders));
router.put("/payment/:id", isLoggedIn, catchAsync(OrderController.payment));
router.put("/updateOrder", isLoggedIn, auth, catchAsync(OrderController.changeOrderStatus))
router.get("/admin", isLoggedIn, auth, catchAsync(OrderController.getAllOrdersAdmin))

export default router;