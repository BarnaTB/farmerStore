import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.status) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error",
            error: error.message
        });
    } else if (res.writeHead) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            message: "Internal server error",
            error: error.message
        }));
    } else {
        console.error("Unknown response object type");
        next(error);
    }
};

export default errorHandler;
