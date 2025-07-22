import { OperationType } from "../../types/db-type.type";

export class UpdateDto {

    // UPDATE table SET col=value WHERE col=value
    constructor(
        public cols: string[],
        public values: string[],
        public constraints: {
            key: string,
            operation: OperationType
        }[],
        public constraintsValue: string[]
    ) { }

}