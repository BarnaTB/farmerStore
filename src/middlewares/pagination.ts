import { Request, Response, NextFunction } from "express";

class PaginationMiddleware {
	defaultItemsPerPage: number;

	constructor(defaultItemsPerPage: number = 5) {
		this.defaultItemsPerPage = defaultItemsPerPage;
	}

	middleware = (req: Request, res: Response, next: NextFunction) => {
		const page: number = parseInt(req.query.page as string) || 1;
		const itemsPerPage: number =
			parseInt(req.query.itemsPerPage as string) || this.defaultItemsPerPage;

		(req as any).pagination = {
			page,
			itemsPerPage,
		};

		next();
	};
}

export default new PaginationMiddleware();