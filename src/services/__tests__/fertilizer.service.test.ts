import { describe, expect, it, jest } from "@jest/globals";
import { FertilizerService } from "../fertilizer.service";
import { prisma } from "..";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    fertilizers: {
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

describe("Fertilizer Service", () => {
  it("should create a fertilizer", async () => {
    const data = {
      name: "NPK",
      quantity_limit: 100,
      price: 5000,
    };
    (prisma.fertilizers.create as any).mockResolvedValue(data);
    const result = await FertilizerService.create(data);
    expect(result).toEqual(data);
  });

  describe("Get Fertilizer", () => {
    it("should get a fertilizer", async () => {
      const data = {
        id: "1",
      };

      const resData = [
        {
          id: "1",
          name: "NPK",
          quantity_limit: 100,
          price: 5000,
        },
      ];
      (prisma.fertilizers.findFirst as any).mockResolvedValue(resData);
      const result = await FertilizerService.getFertilizer(data);
      expect(result).toEqual(resData);
    });

    it("should return null if fertilizer is not found", async () => {
      (prisma.fertilizers.findFirst as any).mockResolvedValue(null);
      const result = await FertilizerService.getFertilizer({ id: "1" });
      expect(result).toBeNull();
    });

    it("should get all fertilizers", async () => {
      const data = [
        {
          id: "1",
          name: "NPK",
          quantity_limit: 100,
          price: 5000,
        },
      ];
      (prisma.fertilizers.findMany as any).mockResolvedValue(data);
      const result = await FertilizerService.getAll({}, 1, 10);
      expect(result).toHaveProperty("currentPage", 1);
      expect(result).toHaveProperty("data", data);
    });
  });

  it("should update a fertilizer", async () => {
    const data = {
      id: "1",
    };
    (prisma.fertilizers.update as any).mockResolvedValue(data);
    const result = await FertilizerService.update(data.id, data);
    expect(result).toEqual(data);
  });
});
