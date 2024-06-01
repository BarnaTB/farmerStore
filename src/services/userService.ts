import {prisma} from './'
import {User} from '../types/allTypes';
import { Users } from '@prisma/client'

export class UserService{
    static async createUser(data:User):Promise<Users>{
       return await prisma.users.create({data}) 
    }
    static async getUser(data:Partial<Users>):Promise<Users | null>{
        return await prisma.users.findFirst({
            where:{...data}
        })
    }

    static async update(id:string, data:Partial<Users>){
        return await prisma.users.update({
            where: {
                id
            },
            data
        })
    }
}
