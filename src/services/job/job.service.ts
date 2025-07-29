import { autoInjectable } from "tsyringe";
import { DatabaseService } from "../database/database.service";
import { InsertJobDto } from "../../dto/jobs/insert-job.dto";
import { InsertDto } from "../../dto/db/insert.dto";
import { SelectDto } from "../../dto/db/select.dto";
import { SelectOneDto } from "../../dto/db/select-one.dto";
import { SelectOneJobDto } from "../../dto/jobs/select-one-job.dto";
import { DeleteJobDto } from "../../dto/jobs/delete-job.dto";
import { DeleteDto } from "../../dto/db/delete.dto";
import { UpdateJobDto } from "../../dto/jobs/update-job.dto";
import { UpdateDto } from "../../dto/db/update.dto";

@autoInjectable()
export class JobService {

    constructor(private dbService: DatabaseService) { }

    public async select() {
        const [rows] = await this.dbService.selectAll('jobs', new SelectDto(['*']));
        return rows;
    }

    public async selectOne(dto: SelectOneJobDto) {
        const [rows] = await this.dbService.selectAll('jobs', new SelectDto(
            ['*'],
            dto.constraints,
            dto.constraintsValue
            // [{ key: 'uuid', operation: "=" }],
            // [dto.]
        ));
        return rows;
    }

    public async insert(dto: InsertJobDto) {
        const [rows] = await this.dbService.insert('jobs', new InsertDto(
            ['uuid', 'user_uuid', 'name'],
            [dto.uuid, dto.user_uuid, dto.name]
        ));

        if (rows.affectedRows > 0) {
            const [rows] = await this.dbService.selectAll('jobs', new SelectOneDto(
                ['*'],
                [{ key: 'uuid', operation: "=" }],
                [dto.uuid]
            ));
            return rows[0];
        }
        return null;
    }

    public async update(dto: UpdateJobDto) {
        const [rows] = await this.dbService.update('jobs', new UpdateDto(
            ['name'],
            [dto.name],
            [{ key: 'uuid', operation: "=" }],
            [dto.uuid]
        ));
        return rows.affectedRows > 0;

    }

    public async delete(dto: DeleteJobDto) {
        const [rows] = await this.dbService.delete('jobs', new DeleteDto(
            [
                {
                    key: 'uuid', operation: "="
                }
            ],
            [dto.uuid]
        ));
        return rows.affectedRows > 0;
    }
}
