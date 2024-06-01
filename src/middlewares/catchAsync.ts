import { Response, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";

const catchAsync =
	(fn: any) => async (req: any, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			errorHandler(error, req, res,next);
		}
	};
export default catchAsync;