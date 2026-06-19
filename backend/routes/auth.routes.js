import express from "express";
import { login, logout, signup,googleAuth } from "../controllers/auth.controllers.js";
import IsAuth from "../middleware/IsAuth.js";        
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/google", googleAuth); 
authRouter.get("/check", IsAuth, (req, res) => {    
    res.status(200).json({ user: req.userId })
})

export default authRouter;