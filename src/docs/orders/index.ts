import responses from "../responses";

const orders = {
    "/orders/create":{
        post:{
            tags:["Orders"],
            summary:"Create a new order",
            description:"This can only be done by the logged in user.",
            security:[{
                JWT:[]
            }],
            parameters:[{
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "fertilizer_id":"dd620ebe-c105-4076-b979-efd6a02fc7d5",
                        "seed_id":"67c87cd6-45b8-4d22-bc6b-dbe7cabaa385",
                        "fertilizer_quantity":90,
                        "seeds_quantity":30,
                        "fertilizer_price":200,
                        "seeds_price":300
                    }
                }
            }],
            consumes:["applicaton/json"],
            produces:["application/json"],
            responses
        }
    },
    "/orders/retreive":{
       get:{
        tags:["Orders"],
        summary:"Retreive all orders",
        description:"This can only be done by the logged in user.",
        security:[{
            JWT:[]
        }],
        parameters:[
            {
            in:"query",
            name:"page",
            description:"Page number",
        },
        {
            in:"query",
            name:"itemsPerPage",
            description:"Number of items per page",
        }
    ],
    consumes:["applicaton/json"],
    produces:["application/json"],
    responses
       }
    },
    "/orders/payment/{id}":{
        put:{
            tags:["Orders"],
            summary:"Update payment status of an order",
            description:"This can only be done by the logged in user.",
            security:[{
                JWT:[]
            }],
            parameters:[],
            consumes:["applicaton/json"],
            produces:["application/json"],
            responses
        }
    },
    "/orders/updateOrder":{
        put:{
            tags:["Admin"],
            summary:"Update order status of an order",
            description:"This can only be done by the logged in user.",
            security:[{
                JWT:[]
            }],
            parameters:[{
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "id":"",
                        "status":"",
                    }
                }
            }],
            consumes:["applicaton/json"],
            produces:["application/json"],
            responses
        }
    },
    "/orders/admin":{
        get:{
            tags:["Admin"],
            summary:"Retreive all orders",
            description:"This can only be done by the logged in user.",
            security:[{
                JWT:[]
            }],
            parameters:[
                {
                in:"query",
                name:"page",
                description:"Page number",
            },
            {
                in:"query",
                name:"itemsPerPage",
                description:"Number of items per page",
            }
        ],
        consumes:["applicaton/json"],
        produces:["application/json"],
        responses
           }
    }
}

export default orders