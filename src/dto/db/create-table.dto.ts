import { ConstraintType } from "../../types/constraints.type";

export class CreateTableDto {

    constructor(
        public tableName: string,
        public structure: {
            column: string,
            type: string,
            constraints?: ConstraintType[],
            constraintFkValues?: { fkTable: string, fkColumn: string },
        }[]
    ) { }

}