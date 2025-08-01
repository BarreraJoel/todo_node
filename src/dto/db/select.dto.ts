import { OperationType } from "../../types/db-type.type";

export class SelectDto {

    constructor(
        public cols: string[],
        public constraints?: {
            key: string,
            operation: OperationType
        }[],
        public constraintsValue?: string[]
    ) { }

}