import { OperationType } from "../../types/db-type.type";

export class DeleteDto {

    constructor(
        public constraints: {
            key: string,
            operation: OperationType
        }[],
        public constraintsValue: string[]
    ) { }

}