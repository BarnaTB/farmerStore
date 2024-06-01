import express, { Application } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import router from './routes';
import { prisma } from './services';
import PaginationMiddleware from './middlewares/pagination'
import errorHandler from './utils/errorHandler'
import logger from './utils/logger';

dotenv.config()

const port = process.env.PORT
const app:Application = express();
const isProduction = process.env.NODE_ENV === "Production"

async function main(){
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({extended:true}));
    app.use(session({
    secret:process.env.SESSION_KEY || "your-secret-key",
    resave: false,
    saveUninitialized:false,
    cookie: {
        secure: isProduction, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
      }
}))
app.use(errorHandler)
app.use(passport.initialize());
app.use(passport.session());
app.use(PaginationMiddleware.middleware)
app.use(morgan("dev"));
app.use(router)
app.listen(port , () => logger.info(`Server is listen on port ${port}`))
}



main()
.then(async() => {
    await prisma.$connect()
    console.log('Database connected')
}).catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})