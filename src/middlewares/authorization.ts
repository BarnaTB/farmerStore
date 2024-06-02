import { Response,NextFunction } from "express";
import { UserService } from "../services/user.service";
import { Users } from "@prisma/client";
import httpStatus from "http-status";

export const auth = async (req:any,res:Response, next:NextFunction) => {
    const {id} = req.user as Partial<Users>
     const user = await UserService.getUser({id})
    if(!user || user.role !== "Admin"){
        return res.status(httpStatus.FORBIDDEN).json({
            status:httpStatus.FORBIDDEN,
            message:"Access denied"
        })
    }
    next()
}