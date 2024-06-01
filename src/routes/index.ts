import { Router, Request, Response, NextFunction } from "express";
import userRouter from "./userRoute";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../docs";
import productRouter from "./productsRouter";
import orderRouter from "./orderRoute";
import httpStatus from "http-status";

const url = `/api/${process.env.API_VERSION || "v1"}`;

const router = Router();

router.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerOptions));
router.use(`${url}/auth`, userRouter);
router.use(`${url}/products`, productRouter);
router.use(`${url}/orders`, orderRouter);
router.all(`${url}/`, (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send({
        status: 200,
        message: "Default API endpoint"
    });
});

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(httpStatus.NOT_FOUND).send({
        status: 404,
        message: "This endpoint does not exist"
    });
});

export default router;
