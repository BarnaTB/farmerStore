import { describe, expect, it, jest } from "@jest/globals";
import { prisma } from "..";
import { OrderService } from "../order.service";
import orders from "../../docs/orders";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    orders: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient),
  };
});

describe("Orders Service", () => {
  const data = {
    user_id: 1,
    fertilizer_id: 1,
    seed_id: 1,
    fertilizer_quantity: 3,
    seeds_quantity: 1,
    land_size: 300,
    totalPrice: 4000,
  };

  it("should create an order", async () => {
    (prisma.orders.create as any).mockResolvedValue(data);
    const result = await OrderService.create(data);
    expect(result).toEqual(data);
  });
  describe("Get  Orders", () => {
    it("should get one order", async () => {
      (prisma.orders.findFirst as any).mockResolvedValue([data]);
      const result = await OrderService.get({
        id: "1",
      });

      expect(result).toEqual([data]);
    });

    it("should get all orderss", async () => {
      (prisma.orders.findMany as any).mockResolvedValue([data]);
      const result = await OrderService.getAll({}, 1, 2);
      expect(result).toHaveProperty("data", [data]);
    });

    it("should orders with a condition", async () => {
      (prisma.orders.update as any).mockResolvedValue(data);
      const result = await OrderService.getOrdersCondition(
        {
          id: "1",
        },
        2,
        4
      );
      expect(result).toHaveProperty("data", [data]);
    });
  });

  it("should update an order", async () => {
    (prisma.orders.update as any).mockResolvedValue(data);
    const result = await OrderService.update("1", { totalPrice: 3000 });
    expect(result).toEqual(data);
  });
});
