import { Fertilizers, Orders, Seeds, Users } from "@prisma/client";
import { Order } from "../types/allTypes";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validateQuantity } from "../utils/validateQuantity";
import { FertilizerService } from "../services/fertilizer.service";
import { SeedsService } from "../services/seeds.service";
import { OrderService } from "../services/order.service";
import httpStatus from "http-status";

export class OrderController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user as Users;
    const {
      fertilizer_id,
      seed_id,
      fertilizer_quantity,
      seeds_quantity,
      fertilizer_price,
      seeds_price,
    } = req.body;
    const user = (await UserService.getUser({ id })) as Users;
    const fertilizer = (await FertilizerService.getFertilizer({
      id: fertilizer_id,
    })) as Fertilizers;
    const seed = (await SeedsService.get({ id: seed_id })) as Seeds;
    const fertilizerValidation = validateQuantity(
      fertilizer_quantity,
      fertilizer.quantity_limit,
      user.land_size,
      "fertilizer"
    );
    const seedsValidation = validateQuantity(
      seeds_quantity,
      seed.quantity_limit,
      user.land_size,
      "seed"
    );
    if (fertilizerValidation || seedsValidation) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: fertilizerValidation || seedsValidation });
    }
    const totalPriceOfOrder =
      fertilizer_price * fertilizer_quantity + seeds_price * seeds_quantity;
    const details = {
      user_id: id,
      fertilizer_id,
      seed_id,
      fertilizer_quantity,
      seeds_quantity,
      land_size: user.land_size,
      totalPrice: totalPriceOfOrder,
    };
    const data = await OrderService.create(details);
    return res.status(httpStatus.CREATED).json({
      message: "Order created successfully",
      data,
    });
  }

  static async getUserOrders(req: Request, res: Response, next: NextFunction) {
    const { page, itemsPerPage } = (req as any).pagination;
    const { id } = req.user as Users;
    const result = await OrderService.getOrdersCondition(
      { user_id: id },
      page,
      itemsPerPage
    );
    const orders = result.data;
    if (orders.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "No orders found",
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Orders found",
      data: orders,
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalCount: result.totalCount,
    });
  }

  static async getAllOrdersAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { page, itemsPerPage } = (req as any).pagination;
    const results = await OrderService.getAll({}, page, itemsPerPage);
    const orders = results.data;
    if (orders.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "No orders found",
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Orders found",
      data: orders,
      currentPage: results.currentPage,
      totalPages: results.totalPages,
      totalCount: results.totalCount,
    });
  }

  static async payment(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const order = await OrderService.get({ id });
    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order not found",
      });
    }
    await OrderService.update(order.id, {
      paid: true,
    });
    return res.status(httpStatus.OK).json({
      message: "Order paid successfully",
    });
  }

  static async changeOrderStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id, status } = req.body;
    const order = (await OrderService.get({ id })) as unknown as Orders;
    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order not found",
      });
    }
    await OrderService.update(id, {
      status,
    });
    return res.status(httpStatus.OK).json({
      message: `Order status changed to ${status} successfully`,
    });
  }
}
