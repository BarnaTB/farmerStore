import {prisma} from '.'
import {Seed} from '../types/allTypes';
import { Seeds } from '@prisma/client'
import paginate from '../utils/pagination';

export class SeedsService{
    static async create(data:Seed):Promise<Seeds>{
       return await prisma.seeds.create({data}) 
    }
    static async get(data:Partial<Seeds>):Promise<Seeds | null>{
        return await prisma.seeds.findFirst({
            where:{...data}
        })
    }
   static async getAll(query:{}, page:number, itemsPerPage:number){
    return await paginate(prisma.seeds, query, {page,itemsPerPage})
   }

    static async update(id:string, data:Partial<Seeds>){
        return await prisma.users.update({
            where: {
                id
            },
            data
        })
    }
}
