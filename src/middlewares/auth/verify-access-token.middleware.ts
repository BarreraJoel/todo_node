import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../services/auth/jwt.service";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class VerifyAccessTokenMiddleware {
    constructor(private jwtService: JwtService) { }

    public handle = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method === "OPTIONS") {
            next();
        }

        try {
        } catch (error: any) {
            return response.status(401).json({
                success: false,
                message: 'error',
                data: {
                    errors: [
                        error.name
                    ]
                }
            });
        }
    }

}