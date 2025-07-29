import { OperationType } from "../../types/db-type.type";

export class SelectOneJobDto {

    constructor(
        // public uuid: string,
        // public user_uuid?: string,
        // public name?: string,
        public constraints: {
            key: string,
            operation: OperationType
        }[],
        public constraintsValue: string[]
    ) { }

}