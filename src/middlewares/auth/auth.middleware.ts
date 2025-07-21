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

        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            return response.status(400).json({
                success: false,
                message: 'Token requerido',
                data: null
            });
        }

        try {
            if (! await this.jwtService.checkTokenExists(token)) {
                throw new Error('El token no existe o expiró');
            }

            if (await this.jwtService.check(token)) {
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

            return response.status(400).json({
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