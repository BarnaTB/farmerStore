import responses from "../responses"

const user = {
'/auth/signup':{
    post:{
        tags:['auth'],
        summary:'Create a new user, for admin provide a role : Admim in the body',
        parameters:[{
            in:'body',
            name:'body',
            schema:{
                example:{
                    'name':'Test',
                    'email':'test@example.com',
                    'phoneNumber':'+250788788888',
                    'password':'Test@123'
                }
            }
        }],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/auth/login":{
    post:{
        tags:["auth"],
        summary:"user login",
        description:`For a farmer use: 'email':'johndoe@example', 'password':'Test@123'`,
        parameters:[
            {
                in:"body",
                name:"body",
                schema:{
                    example:{
                        "email":"admin@example.com",
                        "password":"Test@123"
                    }
                }
            },
        ],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
},
"/auth/logout":{
    put:{
        tags:["auth"],
        summary:"user logout",
        security:[{
            JWT:[]
        }],
        parameters:[],
        consumes: ["application/json"],
        produces: ["application/json"],
        responses,
    }
}
}

export default user