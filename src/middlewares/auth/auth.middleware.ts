import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../services/auth/jwt.service";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class AuthMiddleware {
    constructor(private jwtService: JwtService) { }

    public handle = async (request: Request, response: Response, next: NextFunction) => {
        if (request.method === "OPTIONS") {
            next();
        }

        try {
            let jwt = "";

            // console.log(`auth: ${!request.headers.authorization?.split(" ")[1]}`);

            if (request.headers.authorization?.split(" ")[1]) {
                jwt = request.headers.authorization?.split(" ")[1];
                // console.log('auth');
            }

            if (! await this.jwtService.checkTokenExists(jwt)) {
                throw new Error('El token no existe o expiró');
            }

            if (await this.jwtService.check(jwt)) {
                next();
            }
        } catch (error: any) {
            let message = "";

            if (error.name === 'TokenExpiredError') {
                message = "Token expirado";
            } else if (error.name === 'JsonWebTokenError') {
                message = "Token inválido";
            } else {
                message = error.message;
            }

            return response.status(401).json({
                success: false,
                message: message,
                data: {
                    errors: [
                        error.name
                    ]
                }
            });
        }
    }

}