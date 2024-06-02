import { jest, describe, expect, it } from "@jest/globals";
import { hashPassword, comparePassword } from "../password";
import bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("password", () => {
  it("should hash password", async () => {
    const mockPassword = "password";
    const mockHash = "hashedPassword";

    bcrypt.hash.mockResolvedValue(mockHash);

    const result = await hashPassword(mockPassword);

    expect(result).toEqual(mockHash);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
  });

  it("should compare password and hashed password", async () => {
    const mockPassword = "password";
    const mockHash = "hashedPassword";

    bcrypt.compare.mockResolvedValue(true);

    const result = await comparePassword(mockPassword, mockHash);

    expect(result).toEqual(true);
    expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHash);
  });
});
