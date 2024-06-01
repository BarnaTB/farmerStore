function validateQuantity(quantity_input: number, upper_limit: number, land_size: number, type: string): string | undefined {
   const quantity_limit = upper_limit * land_size;
   console.log(`Quantity input: ${quantity_input}, Quantity limit: ${quantity_limit}`);

   if (quantity_input > quantity_limit) {
      return `Quantity of ${type} exceeds the proper amount (limit: ${quantity_limit} kgs)`;
   } else {
      return undefined;
   }
}

export { validateQuantity };
