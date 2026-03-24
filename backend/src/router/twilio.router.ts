import { Router } from "express";
import { getTurnServer } from "../controllers/twilio.controller";
import AuthMiddleware from "../middleware/auth.middleware";
const TwilioRouter = Router()

TwilioRouter.get("/turn-server", AuthMiddleware, getTurnServer)

export default TwilioRouter