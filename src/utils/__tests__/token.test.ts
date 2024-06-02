import jwt from "jsonwebtoken";
import { generateToken, decodeToken } from "../token";
import { jest, it, expect, describe } from "@jest/globals";

jest.mock("jsonwebtoken");

describe("token", () => {
  it("should generate a token", () => {
    const mockPayload = { id: 1 };
    const mockToken = "token";

    (jwt.sign as any).mockReturnValue(mockToken);

    const result = generateToken(mockPayload);

    expect(result).toEqual(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      mockPayload,
      `${process.env.JWT_SECRET}`,
      { expiresIn: "7d" }
    );
  });

  it("should decode a token", () => {
    const mockToken = "token";
    const mockPayload = { id: 1 };

    (jwt.verify as any).mockReturnValue(mockPayload);

    const result = decodeToken(mockToken);

    expect(result).toEqual(mockPayload);
    expect(jwt.verify).toHaveBeenCalledWith(
      mockToken,
      `${process.env.JWT_SECRET}`
    );
  });
});
