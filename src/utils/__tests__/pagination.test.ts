import { describe, expect, it, jest } from "@jest/globals";
import pagination from "../pagination";
import { prisma } from "../../services";

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

describe("pagination", () => {
  it("should return paginated data", async () => {
    const mockData = [
      {
        id: "1",
        name: "NPK",
        quantity_limit: 100,
        price: 5000,
        fertilizer_id: "1",
      },
    ];
    const mockCount = 1;

    (prisma.seeds.findMany as any).mockResolvedValue(mockData);
    (prisma.seeds.count as any).mockResolvedValue(mockCount);

    const result = await pagination(
      prisma.seeds,
      { id: 1 },
      {
        page: 1,
        itemsPerPage: 2,
      },
      ["fertilizers"]
    );

    expect(result).toEqual({
      data: mockData,
      currentPage: 1,
      totalPages: 1,
      totalCount: mockCount,
    });

    expect(prisma.seeds.count).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
