import { Fertilizers } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Fertilizer } from "../types/allTypes";
import httpStatus from 'http-status';
import { FertilizerService } from "../services/fertilizerService";

export class FertilizerController{
    static async createFertilizer(req:Request, res:Response, next:NextFunction){
        const {name, price, quantity_limit} = req.body as unknown as Fertilizers
        const details = {
          name, price, quantity_limit
        } as unknown as Fertilizer

        const data = await FertilizerService.create(details)
        return res.status(httpStatus.CREATED).json({
          message: `Fertilizer ${name} added successfully`,
          data
        })
    }

    static async getAllFertilizers(req:Request, res:Response,next:NextFunction){
    const {page, itemsPerPage} = (req as any).pagination
    const fertilizers = await FertilizerService.getAll({},page,itemsPerPage)
    return res.status(httpStatus.OK).json({
        message: "Fertilizers fetched successfully",
        data: fertilizers
    }) 
    }
}

