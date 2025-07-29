import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { SelectOneJobDto } from "../dto/jobs/select-one-job.dto";
import { AuthService } from "../services/auth/auth.service";
import { JwtService } from "../services/auth/jwt.service";

@autoInjectable()
export class TokenController {

    constructor(private jwtService: JwtService) { }

    public index = async (request: Request, response: Response) => {
        // const tokens = await this.jwtService.select();

        // console.log(tokens);

        return response.status(200).json({
            success: true,
            message: null,
            data: {
                tokens: []
            },
        });
    }

    public show = async (request: Request, response: Response) => {
        const params = request.params;

        // const result = await this.tokenService.selectOne(new SelectOneJobDto(
        //     [
        //         { key: 'uuid', operation: '=' }
        //     ],
        //     [params.uuid]

        // ));

        return response.status(200).json({
            success: true,
            message: null,
            data: {
                token: []
            },
        });
    }

    public store = async (request: Request, response: Response) => {
        // const body = request.body;
        // const validated = StoreJobRequest.parse(body);

        // const result = await this.tokenService.insert(new InsertJobDto(
        //     validated.user_uuid, validated
        // ));

        return response.status(201).json({
            success: true,
            message: null,
            data: {
                // job: result
            },
        });
    }

    public update = async (request: Request, response: Response) => {
        const body = request.body;
        const params = request.params;
        // if (! await this.jobService.update(new UpdateJobDto(params.uuid, body.name))) {
        //     return response.status(500).json({
        //         success: false,
        //         message: null,
        //         data: null,
        //     });
        // }

        return response.status(200).json({
            success: true,
            message: null,
            data: null,
        });
    }

    public delete = async (request: Request, response: Response) => {
        const params = request.params;
        // if (! await this.jobService.delete(new DeleteJobDto(params.uuid))) {
        //     return response.status(500).json({
        //         success: false,
        //         message: null,
        //         data: null,
        //     });
        // }

        return response.status(204).json({
            success: true,
            message: null,
            data: null,
        });

    }

    public refresh = async (request: Request, response: Response) => {
        console.log('hola');
        
        if (request.headers.authorization?.split(" ")[1]) {

            const jwtr = request.headers.authorization?.split(" ")[1];
            console.log(jwtr);
            
            const jwt = await this.jwtService.refresh(jwtr);
            console.log('new token: ' + jwt);

            return response.status(200).json({
                success: true,
                message: null,
                data: {
                    new_token: jwt
                },
            });
        }
    }
}
