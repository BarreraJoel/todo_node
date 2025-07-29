import { Request, Response } from "express";
import { AuthService } from "../services/auth/auth.service";
import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { autoInjectable } from "tsyringe";
import { LoginRequest } from "../requests/auth/login-request";
import { RegisterRequest } from "../requests/auth/register-request";

@autoInjectable()
export class AuthController {

    constructor(private authService: AuthService) { }

    public login = async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const validated = LoginRequest.parse(body);
            const tokens = await this.authService.login(new LoginDto(validated.email, validated.password));

            if (!tokens) {
                throw new Error('No se pudo loguear');
            }

            return response.status(200).json({
                success: true,
                message: 'Login exitoso',
                data: {
                    tokens: tokens
                },
            });
        } catch (error: any) {
            console.log(error);

            return response.status(500).json({
                success: false,
                message: null,
                data: null,
            });
        }

    }

    public register = async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = RegisterRequest.parse(body);

            if (! await this.authService.register(
                new RegisterDto(
                    result.email,
                    result.password,
                    result.first_name,
                    result.last_name
                ))) {
                // return response.json({ message: 'No se pudo registrar' });
                throw new Error('No se pudo registrar');
            }
            return response.json({ message: 'Registro exitoso' });

        } catch (error: any) {
            console.log(error);

            return response.status(500).json({
                success: false,
                message: null,
                data: null,
            });
        }
    }

    public user = async (request: Request, response: Response) => {
        let jwt = null;

        if (request.headers.authorization) {
            jwt = request.headers.authorization?.split(" ")[1];
            console.log('auth');
        }
        const user = await this.authService.user(<string>jwt);

        return response.json({
            success: true,
            message: null,
            data: {
                user: user
            },
        });
    };

    public logout = async (request: Request, response: Response) => {
        return response.json({
            success: true,
            message: null,
            data: null,
        });
    };
}
