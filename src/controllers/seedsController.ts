import { Seeds } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Seed } from "../types/allTypes";
import httpStatus from 'http-status';
import { SeedsService } from "../services/seedsService";

export class SeedsController{
    static async createSeeds(req:Request, res:Response,next:NextFunction){
        const {name, price, fertilizer_id,quantity_limit} = req.body as unknown as Seeds
          const details = {
            name, price, quantity_limit, fertilizer_id
          } as unknown as Seed

          const data = await SeedsService.create(details)
          return res.status(httpStatus.CREATED).json({
            message: `Seed ${name} added successfully`,
            data
          })
    }

    static async getAllSeeds(req:Request, res:Response, next:NextFunction){
            const {page, itemsPerPage} = (req as any).pagination
            const fertilizers = await SeedsService.getAll({}, page, itemsPerPage)
            return res.status(httpStatus.OK).json({
                message: "Seeds fetched successfully",
                data: fertilizers
            })
    }
}

