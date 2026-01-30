import { Router } from "express";
import { forgotPassword, login, signup } from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/forgot-password", forgotPassword);


export default AuthRouter;

