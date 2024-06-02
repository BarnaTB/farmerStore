import { describe, expect, it, jest } from "@jest/globals";
import { prisma } from "..";
import { SeedsService } from "../seeds.service";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    seeds: {
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

describe("Seed Service", () => {
  const data = {
    id: "1",
    name: "NPK",
    quantity_limit: 100,
    price: 5000,
    fertilizer_id: "1",
  };

  it("should create a user", async () => {
    (prisma.seeds.create as any).mockResolvedValue(data);
    const result = await SeedsService.create(data);
    expect(result).toEqual(data);
  });

  it("should get a seed", async () => {
    (prisma.seeds.findFirst as any).mockResolvedValue([data]);
    const result = await SeedsService.get({
      id: "1",
    });

    expect(result).toEqual([data]);
  });

  it("should get all seeds", async () => {
    const data = [
      {
        id: "1",
        name: "NPK",
        quantity_limit: 100,
        price: 5000,
        fertilizer_id: "1",
      },
    ];

    (prisma.seeds.findMany as any).mockResolvedValue(data);
    const result = await SeedsService.getAll({}, 1, 2);
    expect(result).toHaveProperty("data", data);
  });

  it("should update seed", async () => {
    (prisma.seeds.update as any).mockResolvedValue(data);
    const result = await SeedsService.update("1", data);
    expect(result).toEqual(data);
  });
});
