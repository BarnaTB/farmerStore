import { describe, expect, it, jest } from "@jest/globals";
import { prisma } from "..";
import { UserService } from "../user.service";

jest.mock("@prisma/client", () => {
  const mockPrismaClient = {
    users: {
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

describe("User Service", () => {
  const data = {
    name: "test user",
    email: "test@gmail.com",
    phoneNumber: "0789431549",
    password: "MyPassword@123",
  };

  it("should create a user", async () => {
    (prisma.users.create as any).mockResolvedValue(data);
    const result = await UserService.createUser(data);
    expect(result).toEqual(data);
  });

  it("should get a user", async () => {
    (prisma.users.findFirst as any).mockResolvedValue([data]);
    const result = await UserService.getUser({
      id: "1",
    });
    expect(result).toEqual([data]);
  });

  it("should update a user", async () => {
    const data = {
      id: "1",
      name: "test user",
      email: "new@gmail.com",
    };

    (prisma.users.update as any).mockResolvedValue(data);
    const result = await UserService.update("1", data);
    expect(result).toEqual(data);
  });
});
