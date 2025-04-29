import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface JWTUser {
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JWTUser;
        }
    }
}


export const authenticateToken = (req: Request , res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token =  authHeader && authHeader.split(' ')[1] //Bearer token

    if(token == null) return res.sendStatus(401);

    jwt.verify(token , process.env.ACCESS_SECRET, (err,decoded) => {
        if(err) return res.sendStatus(403);

        req.user = decoded as JWTUser;
        next();
    })
    
}