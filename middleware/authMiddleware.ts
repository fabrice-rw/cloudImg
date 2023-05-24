import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RequestHandler } from "express";
dotenv.config();

interface User {
    id: number;
    email: string;
    name: string;
}

export interface CustomRequest extends Request {
    user?: User;
    [key: string]: any;
}

const verifyToken: RequestHandler<CustomRequest> = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token || req.headers["Authorization"] as string;
        if (token) {
            let auth: string;
            if (token) {
                auth = token;
            } else {
                auth = token.split(" ")[1];
            }
            if (!auth) {
                return res.status(403).send("A token is required for authentication");
            }
            try {
                const decoded: any = jwt.verify(
                    auth,
                    process.env.JWT_SECRET as string
                );
                req.user = {
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name
                };
                next();
            } catch (err: any) {
                res.status(406).json({
                    statusCode: 406,
                    message: err.message,
                });
            }
        } else {
            res.status(401).json({
                statusCode: 401,
                message: "You are not logged in",
            });
        }
    } catch (error) {
        return res.status(403).send("Auht failed, Token not provided");
    }
};

export default verifyToken;
