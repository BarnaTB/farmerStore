import responses from "../responses";

const products = {
    "/products/create/fertilizers":{
        post:{
            tags:['Admin'],
            summary: 'Create a new fertilizer',
            description: 'This can only be done by the logged in user.',
            security:[{
                JWT:[]
            }],
            parameters:[{
              in:"body",
              name:"body",
              schema:{
                example:{
                    "name":"ammonium phosphate",
                    "price":200,
                    "quantity_limit":3
                }
              }
            }],
            consumes:["application/json"],
            produces:["application/json"],
            responses
        }
    },
    "/products/create/seeds":{
        post:{
            tags:['Admin'],
            summary: 'Create a new seed',
            description: 'This can only be done by the logged in user. a seed must be assocaited with a compatible fertilizer',
            security:[{
                JWT:[]
            }],
            parameters:[{
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "name":"Corn",
                        "fertilizer_id": "dd620ebe-c105-4076-b979-efd6a02fc7d5",
                        "price":300,
                        "quantity_limit":1
                    }
                }
            }],
            consumes:["application/json"],
            produces:["application/json"],
            responses
        }
    },
    "/products/retreive/fertilizers":{
        get:{
            tags:['Products'],
            summary: 'Retreive all fertilizers',
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
            consumes:["application/json"],
            produces:["application/json"],
            responses
        }
    },
    "/products/retreive/seeds":{
        get:{
            tags:['Products'],
            summary: 'Retreive all seeds',
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
            consumes:["application/json"],
            produces:["application/json"],
            responses
        }
    }
}

export default products