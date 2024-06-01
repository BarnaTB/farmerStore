import { Router } from "express";
import { FertilizerController } from "../controllers/fertilizersController";
import { SeedsController } from "../controllers/seedsController";
import { isLoggedIn } from "../middlewares/authentication";
import { auth } from "../middlewares/authorization";
import catchAsync from "../middlewares/catchAsync";


const router = Router()

router.post("/create/fertilizers", isLoggedIn,auth,catchAsync(FertilizerController.createFertilizer))
router.post("/create/seeds", isLoggedIn,auth,catchAsync(SeedsController.createSeeds))
router.get("/retreive/fertilizers",  catchAsync(FertilizerController.getAllFertilizers))
router.get("/retreive/seeds",  catchAsync(SeedsController.getAllSeeds))

export default router