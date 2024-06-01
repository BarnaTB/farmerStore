import { Users } from "@prisma/client";
import {User} from '../types/allTypes';
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import httpStatus from 'http-status';
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/token";

export class UserController{
    static async createUser(req:Request, res:Response,next:NextFunction){
            const {name, email, phoneNumber, password, land_size, role} = req.body as unknown as Users
            const hashedPassword = await hashPassword(password)
            const details = {
                name, 
                email, 
                phoneNumber, 
                password:hashedPassword,
                land_size,
                role
            } as unknown as User

            const data = await UserService.createUser(details)

            return res.status(httpStatus.CREATED).json({
                message: 'User created successfully',
                data
            })

    }

    static async login(req:Request, res:Response, next:NextFunction){
            const {email, password} = req.body as unknown as Users
            const user = await UserService.getUser({email}) as Users
            const comparedPassword = await comparePassword(password, user.password)
            if(!comparedPassword){
                return res.status(httpStatus.CONFLICT).json({
                    status:httpStatus.CONFLICT,
                    message: 'Invalid OR Wrong Password'
                })
            }
            const isFound = user
            if(isFound.isLoggedIn === false){
                await UserService.update(isFound.id,{isLoggedIn:true})
            }
            isFound.password = ""
            const token = generateToken({...isFound})
            return res.status(httpStatus.OK).json({
                status:httpStatus.OK,
                message: 'Login Successful',
                token: `Bearer ${token}`
            })

    }
    static async logout(req: Request, res: Response, next:NextFunction) {
            const { id } = req.user as Users;
            const user = await UserService.getUser({ id });
      
            if (user) {
              await UserService.update(id, {
                isLoggedIn: false,
              });
            }
      
            if (req.session) {
              req.session.destroy((err: Error) => {
                if (err) {
                  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                    message: "Failed to destroy session",
                    error: err.message,
                  });
                }
                res.clearCookie('connect.sid');
                return res.status(httpStatus.OK).json({
                  message: "User logged out successfully",
                });
              });
            } else {
              return res.status(httpStatus.OK).json({
                message: "User logged out successfully",
              });
            }
      }
}

