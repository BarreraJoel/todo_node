import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import { JobService } from "../services/job/job.service";
import { InsertJobDto } from "../dto/jobs/insert-job.dto";
import { SelectOneJobDto } from "../dto/jobs/select-one-job.dto";
import { DeleteJobDto } from "../dto/jobs/delete-job.dto";
import { UpdateJobDto } from "../dto/jobs/update-job.dto";

@autoInjectable()
export class JobController {

    constructor(private jobService: JobService) { }

    public index = async (request: Request, response: Response) => {
        const jobs = await this.jobService.select();

        return response.status(200).json({
            success: true,
            message: null,
            data: {
                jobs: jobs
            },
        });
    }

    public show = async (request: Request, response: Response) => {
        const params = request.params;

        const result = await this.jobService.selectOne(new SelectOneJobDto(
            params.uuid
        ));

        return response.status(200).json({
            success: true,
            message: null,
            data: {
                job: result
            },
        });
    }

    public store = async (request: Request, response: Response) => {
        const body = request.body;
        const result = await this.jobService.insert(new InsertJobDto(
            body.user_uuid, body.name
        ));

        return response.status(201).json({
            success: true,
            message: null,
            data: {
                job: result
            },
        });
    }

    public update = async (request: Request, response: Response) => {
        const body = request.body;
        const params = request.params;
        if (! await this.jobService.update(new UpdateJobDto(params.uuid, body.name))) {
            return response.status(500).json({
                success: false,
                message: null,
                data: null,
            });
        }

        return response.status(200).json({
            success: true,
            message: null,
            data: null,
        });
    }

    public delete = async (request: Request, response: Response) => {
        const params = request.params;
        if (! await this.jobService.delete(new DeleteJobDto(params.uuid))) {
            return response.status(500).json({
                success: false,
                message: null,
                data: null,
            });
        }

        return response.status(204).json({
            success: true,
            message: null,
            data: null,
        });

    }

}
