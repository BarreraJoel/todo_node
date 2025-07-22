import { OperationType } from "../../types/db-type.type";

export class SelectOneDto {

    constructor(
        public cols: string[],
        public constraints: {
            key: string,
            operation: OperationType
        }[],
        public constraintsValue: string[]
    ) { }

}