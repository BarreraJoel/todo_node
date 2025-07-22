import { Request, Response } from "express";
import { AuthService } from "../services/auth/auth.service";
import { LoginDto } from "../dto/auth/login.dto";
import { RegisterDto } from "../dto/auth/register.dto";
import { autoInjectable } from "tsyringe";
import { LoginRequest } from "../requests/auth/loginRequest";
import { RegisterRequest } from "../requests/auth/registerRequest";

@autoInjectable()
export class AuthController {

    constructor(private authService: AuthService) { }

    public login = async (request: Request, response: Response) => {
        try {
            const body = request.body;
            const result = LoginRequest.parse(body);
            const token = await this.authService.login(new LoginDto(result.email, result.password));

            if (!token) {
                throw new Error('No se pudo loguear');
            }

            return response.status(200).json({
                success: true,
                message: null,
                data: {
                    token: token
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
        const token = request.headers.authorization?.split(" ")[1];
        const user = await this.authService.user(<string>token);

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
