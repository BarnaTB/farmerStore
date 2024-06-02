import { prisma } from ".";
import { Order } from "../types/allTypes";
import { Orders } from "@prisma/client";
import paginate from "../utils/pagination";

export class OrderService {
  static async create(data: any): Promise<Orders> {
    return await prisma.orders.create({ data });
  }
  static async get(data: Partial<Orders>): Promise<Orders | null> {
    return await prisma.orders.findFirst({
      where: { ...data },
    });
  }
  static async getAll(query: {}, page: number, itemsPerPage: number) {
    return await paginate(prisma.orders, query, { page, itemsPerPage }, [
      "users",
      "fertilizers",
      "seeds",
    ]);
  }
  static async getOrdersCondition(
    query: Partial<Orders>,
    page: number,
    itemsPerPage: number
  ) {
    return await paginate(prisma.orders, query, { page, itemsPerPage }, [
      "users",
      "fertilizers",
      "seeds",
    ]);
  }

  static async update(id: string, data: Partial<Orders>) {
    return await prisma.orders.update({
      where: {
        id,
      },
      data,
    });
  }
}
