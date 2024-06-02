import { jest, it, describe, expect } from "@jest/globals";
import { validateQuantity } from "../validateQuantity";

describe("Validate Quantity", () => {
  const data = {
    quantity_input: 3,
    upper_limit: 4,
    land_size: 300,
    type: "fertilizer",
  };

  it("should validate quantity", () => {
    const res = validateQuantity(
      data.quantity_input,
      data.upper_limit,
      data.land_size,
      data.type
    );
    expect(res).toBeUndefined();

    const res2 = validateQuantity(1000, 2, 300, "fertilizer");
    expect(res2).toBe(
      "Quantity of fertilizer exceeds the proper amount (limit: 600 kgs)"
    );
  });
});
