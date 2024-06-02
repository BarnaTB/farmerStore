import { Response, NextFunction } from "express";

import {decodeToken} from "../utils/token";
import { UserService } from "../services/user.service";
import { Users } from "@prisma/client";


const isLoggedIn = async(req:any,res:Response, next:NextFunction) => {
    try {
        const header = req.header("Authorization");
        if(!header || !header.startsWith("Bearer ")){
            return res.status(401).send({
                message:"Unauthorized access, please login first"
            })
        }

        const token = header.split(" ")[1];
        if(!token){
            return res
                    .status(400)
                    .send({message:"Unauthorized access, please login first"})
        }
        const decoded = decodeToken(token) as Partial<Users>;
        const user = await UserService.getUser({
            id: decoded.id,
            isLoggedIn: true
        })
        if(!user){
            return res 
                    .status(404)
                    .send({message:"Unauthorized access, please login first"})
        }
        req.user=user;
        next();
    } catch (error:any) {
        console.log(error)
        return res
        .status(400)
        .send({ message: "Invalid Bearer Token", error: error.message });
}
}

export { isLoggedIn };

