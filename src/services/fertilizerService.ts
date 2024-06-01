import {prisma} from '.'
import {Fertilizer} from '../types/allTypes';
import { Fertilizers } from '@prisma/client'
import paginate from '../utils/pagination';

export class FertilizerService{
    static async create(data:Fertilizer):Promise<Fertilizers>{
       return await prisma.fertilizers.create({data}) 
    }
    static async getUser(data:Partial<Fertilizers>):Promise<Fertilizers | null>{
        return await prisma.fertilizers.findFirst({
            where:{...data}
        })
    }
   static async getAll(query:{}, page:number, itemsPerPage:number){
    return await paginate(prisma.fertilizers, query,{page, itemsPerPage})
   }

    static async update(id:string, data:Partial<Fertilizers>){
        return await prisma.users.update({
            where: {
                id
            },
            data
        })
    }
}
