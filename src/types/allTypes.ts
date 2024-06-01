export interface User{
    name: string;
    email: string;
    phoneNumber: string;
    password: string
}

export interface Fertilizer{
    name: string;
    price: number;
    quantity_limit: number
}

export interface Seed extends Fertilizer{
    fertilizer_id: string
}

export interface Order{
    user_id: string;
    fertilizer_id: string;
    fertilizer_quantity: number;
    fertilizer_price: number;
    seed_id: string;
    seeds_quantity: number;
    seeds_price: number;
    totalPrice:number;
    land_size: number;
}